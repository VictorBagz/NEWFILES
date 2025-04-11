
document.addEventListener('DOMContentLoaded', () => {
    // Rotating Tagline with a 2-Second Delay and Smoother Animation
    const tagline = document.getElementById('tagline');
    const taglines = [
        "Building Your Future",
        "Strength in Every Structure",
        "Crafting Excellence",
        "Your Vision, Our Craft"
    ];
    let index = 0;

    function rotateTagline() {
        tagline.style.opacity = 0;
        setTimeout(() => {
            tagline.textContent = taglines[index];
            tagline.style.opacity = 1;
            index = (index + 1) % taglines.length;
        }, 300); // Smooth fade out/in with shorter delay
    }

    setInterval(rotateTagline, 2000); // Rotate every 2 seconds
    rotateTagline();

    // Counter Animation Function
    function animateCounter(element, start, end, duration) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const current = Math.floor(progress * (end - start) + start);
            element.textContent = current;
            if (progress < 1) {
                requestAnimationFrame(step);
            } else {
                element.textContent = end + "+";
                element.classList.add('plus');
                element.classList.add('animate');
            }
        };
        requestAnimationFrame(step);
    }

    // Initialize Counters After Full Page Load
    window.addEventListener('load', () => {
        const projectsCounterElement = document.getElementById('projectsCounter');
        const clientsCounterElement = document.getElementById('clientsCounter');

        if (projectsCounterElement && clientsCounterElement) {
            // Reset counters to 0
            projectsCounterElement.textContent = "0";
            clientsCounterElement.textContent = "0";

            // Start counters with a smoother animation over 4 seconds
            setTimeout(() => {
                animateCounter(projectsCounterElement, 0, 99, 4000); // Projects: 0 to 99 over 4s
                animateCounter(clientsCounterElement, 0, 75, 4000); // Clients: 0 to 75 over 4s
            }, 200); // Delay slightly after page load
        }
    });

    // Redesigned Accordion Handling (No Fullscreen) - Dynamic max-height
    const accordionButtons = document.querySelectorAll('.accordion-button');

    accordionButtons.forEach((button) => {
        button.addEventListener('click', () => {
            const accordionItem = button.parentNode;
            const accordionContent = accordionItem.querySelector('.accordion-content');
            const icon = button.querySelector('.icon');
            const isContentOpen = accordionContent.classList.contains('open');

            // Close all other open accordion items
            document.querySelectorAll('.accordion-item').forEach(otherItem => {
                const otherContent = otherItem.querySelector('.accordion-content');
                const otherButton = otherItem.querySelector('.accordion-button');
                const otherButtonIcon = otherButton?.querySelector('.icon');

                if (otherContent !== accordionContent) {
                    otherContent.classList.remove('open');
                    otherContent.style.maxHeight = null; // Reset max-height of closed items
                    if (otherButtonIcon) {
                        otherButtonIcon.textContent = '+';
                        otherButton.classList.remove('active');
                        otherButton.setAttribute('aria-expanded', 'false');
                    }
                }
            });

            // Toggle the current item
            if (isContentOpen) {
                accordionContent.classList.remove('open');
                accordionContent.style.maxHeight = null; // Reset max-height when closing
            } else {
                accordionContent.classList.add('open');
                accordionContent.style.maxHeight = accordionContent.scrollHeight + 'px'; // Set max-height to content height
            }

            button.classList.toggle('active');
            icon.textContent = isContentOpen ? '+' : '-';
            button.setAttribute('aria-expanded', !isContentOpen);
        });
    });

    const navIcon = document.querySelector('.bi-list');
    const dropdownMenu = document.querySelector('.dropdown-menu');

    navIcon.addEventListener('click', () => {
        dropdownMenu.classList.toggle('active');
        //toggle aria expanded attribute.
        const isExpanded = dropdownMenu.classList.contains('active');
        navIcon.setAttribute("aria-expanded", isExpanded);
    });

    // Select the Back to Top button
    const backToTopButton = document.getElementById('backToTop');

    // Show or hide the button based on scroll position
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) { // Show after scrolling down 300px
            backToTopButton.style.display = 'block';
        } else {
            backToTopButton.style.display = 'none';
        }
    });

    // Scroll back to the top when the button is clicked
    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth' // Smooth scrolling effect
        });
    });

    // New content for projects
    const projects = [
        {
            title: "Resident Apartment Block",
            image: "Bd1.jpg",
            description: "Complete construction of residential homes, we used Rammed earth construction technology.",
            location: "Entebbe, Nkumba",
            startDate: "2023-03-15",
            endDate: "2023-06-20",
        },
        {
            title: "Residential house flat",
            image: "Bd8.jpg",
            description: "Construction of a modern residential building in the downtown area.",
            location: "Wakiso district, Kitende",
            startDate: "2022-09-01",
            endDate: "2023-01-30",
        },
        {
            title: "Bangalore for residence",
            image: "Bd3.jpg",
            description: "Construction of a vital Bangalore that covers an acre of land for residence.",
            location: "Entebbe, Buwaya",
            startDate: "2023-01-01",
            endDate: "2023-11-15",
        },
        {
            title: "Apartment expansion",
            image: "Ctr5.jpg",
            description: "Expansion of a local apartment with new blocks and facilities.",
            location: "Kampala, Nakawa",
            startDate: "2023-05-10",
            endDate: "2023-09-30",
        },
        {
            title: "Apartment complex",
            image: "Bd5.jpg",
            description: "Construction of a new apartment complex with modern amenities.",
            location: "Masaka, Nabugabo",
            startDate: "2023-04-01",
            endDate: "2024-01-30",
        },
    ];

    const portfolioContainer = document.getElementById("portfolio-container");
    const modal = document.getElementById("projectModal");
    const modalContent = document.getElementById("modalContent");
    const closeBtn = document.querySelector(".close");

    function displayProjects() {
        projects.forEach(project => {
            const projectDiv = document.createElement("div");
            projectDiv.classList.add("project");
            projectDiv.innerHTML = `
                <img src="${project.image}" alt="${project.title}">
                <div class="project-details">
                    <h3>${project.title}</h3>
                    <p>${project.description.substring(0, 100)}...</p>
                    <button class="view-details" data-project='${JSON.stringify(project)}'>View Details</button>
                </div>
            `;
            portfolioContainer.appendChild(projectDiv);
        });
    }

    displayProjects();

    portfolioContainer.addEventListener("click", function (event) {
        if (event.target.classList.contains("view-details")) {
            const projectData = JSON.parse(event.target.getAttribute("data-project"));
            modalContent.innerHTML = `
                <h3>${projectData.title}</h3>
                <img src="${projectData.image}" style="width:100%; height: auto; margin-bottom: 20px;">
                <p><strong>Description:</strong> ${projectData.description}</p>
                <p><strong>Location:</strong> ${projectData.location}</p>
                <p><strong>Start Date:</strong> ${projectData.startDate}</p>
                <p><strong>End Date:</strong> ${projectData.endDate}</p>
            `;
            modal.style.display = "block";
        }
    });

    closeBtn.addEventListener("click", function () {
        modal.style.display = "none";
    });

    window.addEventListener("click", function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    });

    // News Section JavaScript
    document.querySelectorAll('.news-item').forEach(item => {
        const readMore = document.createElement('button');
        readMore.textContent = 'Read More';
        readMore.classList.add('read-more');
        item.appendChild(readMore);

        readMore.addEventListener('click', () => {
            item.classList.toggle('expanded');
            readMore.textContent = item.classList.contains('expanded') ? 'Read Less' : 'Read More';
        });
    });
});
