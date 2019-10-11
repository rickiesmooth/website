(function() {
  const GITHUB_SERVICE = "https://api.ricksm.it/github";

  initExperience();

  fetch(GITHUB_SERVICE)
    .then(res => res.json())
    .then(({ contributions, showcaseItems }) => {
      initHobbyProjects(showcaseItems);
      initContributions(contributions);
    });

  function initHobbyProjects(repos) {
    const links = repos.map(({ name, descriptionHTML, url, topics }) => {
      const subTitle = document.createElement("p");
      const content = document.createElement("p");
      const description = new DOMParser().parseFromString(
        descriptionHTML,
        "text/xml"
      ).firstChild;
      const title = createLink(url, name);

      subTitle.innerHTML = description.innerHTML;
      content.innerText = `${topics.join(", ")}`;
      return { title, subTitle, content };
    });

    createList("projects-list", links);
  }

  function initContributions(contributions) {
    const links = contributions.map(({ repo, url }) => ({
      title: createLink(url, repo)
    }));

    createList("contributions-list", links);
  }

  function initExperience() {
    const experience = [
      {
        companyName: "Ahold Delhaize",
        companyHref: "https://www.aholddelhaize.com",
        jobTitle: "Frontend Developer",
        dateRange: [[2018, 3], [2019, 9]],
        topics: [
          "React",
          "Typescript",
          "GraphQL",
          "Redux",
          "Kubernetes",
          "Docker"
        ]
      },
      {
        companyName: "Vigour",
        companyHref: "https://vigour.io",
        jobTitle: "Fullstack Developer",
        dateRange: [[2014, 3], [2018, 4]],
        topics: ["Vanilla JS", "Socket-io", "Browserify", "ES6", "React"]
      },
      {
        companyName: "Google",
        companyHref: "https://google.com",
        jobTitle: "Business Intern LCS",
        dateRange: [[2013, 3], [2013, 8]],
        topics: ["DFP", "Google Apps", "MySQL", "GTM"]
      }
    ];

    function normalizeDateRange([startDate, endDate]) {
      const toLocale = date =>
        new Date(...date).toLocaleDateString("en-GB", {
          year: "numeric",
          month: "short"
        });

      return `${toLocale(startDate)} - ${toLocale(endDate)}`;
    }

    const links = experience.map(
      ({ companyName, companyHref, jobTitle, dateRange, topics }) => {
        const subTitle = document.createElement("p");
        const normalizedDateRange = normalizeDateRange(dateRange);
        const title = createLink(companyHref, companyName);
        const content = document.createElement("p");
        subTitle.innerText = `${jobTitle} | ${normalizedDateRange}`;
        content.innerText = `${topics.join(", ")}`;

        return { title, subTitle, content };
      }
    );
    createList("experience-list", links);
  }

  function createLink(href, content) {
    const a = document.createElement("a");

    a.setAttribute("href", href);
    a.innerHTML = content;
    a.className = "link";

    return a;
  }

  function createList(elementId, data) {
    const element = document.getElementById(elementId);
    const fragment = document.createDocumentFragment();
    if (!element) {
      throw new Error(`elementId ${elementId} not found while creating list`);
    }

    data.forEach(({ title, subTitle, content }) => {
      const li = document.createElement("li");
      li.append(title);

      subTitle && li.append(subTitle);
      content && li.append(content);
      fragment.append(li);
    });
    element.innerHTML = "";
    element.append(fragment);
  }

  console.log(
    "%c thank you for your interest, you can check the full sourcecode at https://github.com/rickiesmooth/website",
    "color: yellow"
  );
})();
