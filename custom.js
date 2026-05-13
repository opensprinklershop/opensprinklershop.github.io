document.addEventListener("DOMContentLoaded", function () {
  initLanguageSelector();
  initScreenshotLightbox();
});

function initLanguageSelector() {
  var languages = {
    en: "English",
    de: "Deutsch",
    fr: "Français",
    it: "Italiano"
  };

  var pageMap = {
    index: { en: "index", de: "index-de", fr: "index-fr", it: "index-it" },
    faq: { en: "faq", de: "faq-de", fr: "faq-fr", it: "faq-it" },
    manual: {
      en: "2.2.1/221_4_manual",
      de: "2.2.1/221_4_manual_de",
      fr: "2.2.1/221_4_manual_fr",
      it: "2.2.1/221_4_manual_it"
    },
    api: {
      en: "2.2.1/221_4_api",
      de: "2.2.1/221_4_api_de",
      fr: "2.2.1/221_4_api_fr",
      it: "2.2.1/221_4_api_it"
    },
    opensprinklerpro: {
      en: "opensprinklerpro",
      de: "opensprinklerpro_de",
      fr: "opensprinklerpro_fr",
      it: "opensprinklerpro_it"
    },
    "analog-sensor-config": {
      en: "analog-sensor-config",
      de: "analog-sensor-config-de",
      fr: "analog-sensor-config-fr",
      it: "analog-sensor-config-it"
    },
    "mcp-server": {
      en: "mcp-server",
      de: "mcp-server-de",
      fr: "mcp-server-fr",
      it: "mcp-server-it"
    },
    "ai-programming": {
      en: "ai-programming",
      de: "ai-programming-de",
      fr: "ai-programming-fr",
      it: "ai-programming-it"
    },
    "sensor-automation": {
      en: "sensor-automation",
      de: "sensor-automation-de",
      fr: "sensor-automation-fr",
      it: "sensor-automation-it"
    }
  };

  var labels = {
    en: {
      "Home": "Home",
      "Base Manual v2.2.1(4)": "Base Manual v2.2.1(4)",
      "User Manual": "User Manual",
      "API Reference": "API Reference",
      "OpenSprinklerPro Extensions": "OpenSprinklerPro Extensions",
      "Overview": "Overview",
      "Analog Sensor Config": "Analog Sensor Config",
      "API and platform addendum": "API and platform addendum",
      "MCP and AI": "MCP and AI",
      "MCP Server": "MCP Server",
      "AI Program Creation": "AI Program Creation",
      "Sensor Automation": "Sensor Automation",
      "RainMaker Provisioning": "RainMaker Provisioning",
      "FYTA Sensors": "FYTA Sensors",
      "Troubleshooting": "Troubleshooting",
      "Archived": "Archived",
      "Previous Manuals and API docs": "Previous Manuals and API docs",
      "FAQ": "FAQ",
      "Language": "Language"
    },
    de: {
      "Home": "Startseite",
      "Base Manual v2.2.1(4)": "Basishandbuch v2.2.1(4)",
      "User Manual": "Benutzerhandbuch",
      "API Reference": "API-Referenz",
      "OpenSprinklerPro Extensions": "OpenSprinklerPro-Erweiterungen",
      "Overview": "Übersicht",
      "Analog Sensor Config": "Analoge Sensoren",
      "API and platform addendum": "API- und Plattformergänzung",
      "MCP and AI": "MCP und KI",
      "MCP Server": "MCP-Server",
      "AI Program Creation": "KI-Programmerstellung",
      "Sensor Automation": "Sensorautomatisierung",
      "RainMaker Provisioning": "RainMaker-Einrichtung",
      "FYTA Sensors": "FYTA-Sensoren",
      "Troubleshooting": "Fehlerbehebung",
      "Archived": "Archiv",
      "Previous Manuals and API docs": "Frühere Handbücher und API-Dokumente",
      "FAQ": "FAQ",
      "Language": "Sprache"
    },
    fr: {
      "Home": "Accueil",
      "Base Manual v2.2.1(4)": "Manuel de base v2.2.1(4)",
      "User Manual": "Manuel utilisateur",
      "API Reference": "Référence API",
      "OpenSprinklerPro Extensions": "Extensions OpenSprinklerPro",
      "Overview": "Présentation",
      "Analog Sensor Config": "Capteurs analogiques",
      "API and platform addendum": "Complément API et plateformes",
      "MCP and AI": "MCP et IA",
      "MCP Server": "Serveur MCP",
      "AI Program Creation": "Création de programmes par IA",
      "Sensor Automation": "Automatisation des capteurs",
      "RainMaker Provisioning": "Provisionnement RainMaker",
      "FYTA Sensors": "Capteurs FYTA",
      "Troubleshooting": "Dépannage",
      "Archived": "Archives",
      "Previous Manuals and API docs": "Anciens manuels et docs API",
      "FAQ": "FAQ",
      "Language": "Langue"
    },
    it: {
      "Home": "Home",
      "Base Manual v2.2.1(4)": "Manuale base v2.2.1(4)",
      "User Manual": "Manuale utente",
      "API Reference": "Riferimento API",
      "OpenSprinklerPro Extensions": "Estensioni OpenSprinklerPro",
      "Overview": "Panoramica",
      "Analog Sensor Config": "Sensori analogici",
      "API and platform addendum": "Appendice API e piattaforme",
      "MCP and AI": "MCP e IA",
      "MCP Server": "Server MCP",
      "AI Program Creation": "Creazione programmi con IA",
      "Sensor Automation": "Automazione sensori",
      "RainMaker Provisioning": "Provisioning RainMaker",
      "FYTA Sensors": "Sensori FYTA",
      "Troubleshooting": "Risoluzione problemi",
      "Archived": "Archivio",
      "Previous Manuals and API docs": "Manuali e documenti API precedenti",
      "FAQ": "FAQ",
      "Language": "Lingua"
    }
  };

  var current = findCurrentPage(pageMap);
  var storedLanguage = localStorage.getItem("os-docs-language");
  var selectedLanguage = current.key ? current.language : storedLanguage || current.language || "en";
  if (!languages[selectedLanguage]) {
    selectedLanguage = "en";
  }

  insertLanguageSelector(languages, labels, selectedLanguage, function (language) {
    localStorage.setItem("os-docs-language", language);
    var active = findCurrentPage(pageMap);
    if (active.key && pageMap[active.key][language] && pageMap[active.key][language] !== active.path) {
      window.location.href = buildPageUrl(active.prefix, pageMap[active.key][language], window.location.search + window.location.hash);
      return;
    }
    updateNavigation(pageMap, labels, language, active.prefix);
    updateCurrentPageHeadingLinks(pageMap, active, language);
    updateLanguageSelectorLabel(labels, language);
  });

  updateNavigation(pageMap, labels, selectedLanguage, current.prefix);
  updateCurrentPageHeadingLinks(pageMap, current, selectedLanguage);
  updateLanguageSelectorLabel(labels, selectedLanguage);
}

function normalizePath(pathname) {
  var path = pathname.replace(/\/index\.html$/, "/").replace(/\.html$/, "");
  path = path.replace(/^\/+|\/+$/g, "");
  return path || "index";
}

function findCurrentPage(pageMap) {
  var normalized = normalizePath(window.location.pathname);
  for (var key in pageMap) {
    for (var language in pageMap[key]) {
      var target = pageMap[key][language];
      if (normalized === target || normalized.endsWith("/" + target)) {
        var index = normalized.lastIndexOf(target);
        var prefix = normalized.slice(0, index).replace(/\/+$/, "");
        return {
          key: key,
          language: language,
          path: target,
          prefix: prefix ? "/" + prefix + "/" : "/"
        };
      }
    }
  }
  return { key: null, language: "en", path: normalized, prefix: "/" };
}

function buildPageUrl(prefix, pagePath, suffix) {
  var cleanPrefix = prefix || "/";
  var cleanSuffix = suffix || "";
  if (!cleanPrefix.endsWith("/")) {
    cleanPrefix += "/";
  }
  if (pagePath === "index") {
    return cleanPrefix + cleanSuffix;
  }
  return cleanPrefix + pagePath + "/" + cleanSuffix;
}

function insertLanguageSelector(languages, labels, selectedLanguage, onChange) {
  var container = document.createElement("div");
  container.className = "language-selector";

  var label = document.createElement("label");
  label.setAttribute("for", "language-selector-combobox");
  label.setAttribute("data-original-label", "Language");
  label.textContent = (labels[selectedLanguage] && labels[selectedLanguage].Language) || "Language";

  var select = document.createElement("select");
  select.id = "language-selector-combobox";
  select.setAttribute("aria-label", "Select documentation language");

  Object.keys(languages).forEach(function (language) {
    var option = document.createElement("option");
    option.value = language;
    option.textContent = languages[language];
    option.selected = language === selectedLanguage;
    select.appendChild(option);
  });

  select.addEventListener("change", function () {
    onChange(select.value);
  });

  container.appendChild(label);
  container.appendChild(select);

  var content = document.querySelector(".rst-content") || document.querySelector(".wy-nav-content");
  if (content) {
    content.insertBefore(container, content.firstChild);
  }
}

function updateLanguageSelectorLabel(labels, language) {
  var label = document.querySelector('.language-selector label[for="language-selector-combobox"]');
  if (label) {
    label.textContent = (labels[language] && labels[language].Language) || "Language";
  }
}

function updateNavigation(pageMap, labels, language, prefix) {
  var navLabels = labels[language] || labels.en;
  var links = document.querySelectorAll(".wy-menu-vertical a");
  var sectionLabels = document.querySelectorAll(".wy-menu-vertical .caption-text, .wy-menu-vertical p.caption");

  sectionLabels.forEach(function (label) {
    var originalText = label.getAttribute("data-original-label") || label.textContent.trim();
    if (!label.getAttribute("data-original-label")) {
      label.setAttribute("data-original-label", originalText);
    }

    if (navLabels[originalText]) {
      label.textContent = navLabels[originalText];
    }
  });

  links.forEach(function (link) {
    var originalText = link.getAttribute("data-original-label") || link.textContent.trim();
    if (!link.getAttribute("data-original-label")) {
      link.setAttribute("data-original-label", originalText);
    }

    if (navLabels[originalText]) {
      link.textContent = navLabels[originalText];
    }

    var targetKey = getPageKeyFromHref(link.getAttribute("href"), pageMap);
    if (targetKey && pageMap[targetKey][language]) {
      link.setAttribute("href", buildPageUrl(prefix, pageMap[targetKey][language]));
    }
  });
}

function updateCurrentPageHeadingLinks(pageMap, active, language) {
  document.querySelectorAll("ul[data-generated-heading-links]").forEach(function (list) {
    list.remove();
  });

  if (!active.key || !pageMap[active.key] || !pageMap[active.key][language]) {
    return;
  }

  var navLink = findNavigationLinkForPage(pageMap, active.key);
  if (!navLink || !navLink.parentElement) {
    return;
  }

  var navItem = navLink.parentElement;
  navItem.classList.add("current");
  navLink.classList.add("current");

  if (navItem.querySelector("ul.current:not([data-generated-heading-links])")) {
    return;
  }

  var headings = Array.prototype.slice.call(document.querySelectorAll(".rst-content .document h2[id], .rst-content .document h3[id]"))
    .filter(function (heading) {
      return heading.id && getHeadingText(heading);
    });

  if (!headings.length) {
    return;
  }

  var list = document.createElement("ul");
  list.className = "current";
  list.setAttribute("data-generated-heading-links", "true");

  headings.forEach(function (heading) {
    var item = document.createElement("li");
    item.className = heading.tagName.toLowerCase() === "h3" ? "toctree-l3" : "toctree-l2";

    var link = document.createElement("a");
    link.className = "reference internal";
    link.href = "#" + heading.id;
    link.textContent = getHeadingText(heading);

    item.appendChild(link);
    list.appendChild(item);
  });

  navItem.appendChild(list);
}

function findNavigationLinkForPage(pageMap, pageKey) {
  var links = document.querySelectorAll(".wy-menu-vertical a");
  for (var i = 0; i < links.length; i += 1) {
    if (getPageKeyFromHref(links[i].getAttribute("href"), pageMap) === pageKey) {
      return links[i];
    }
  }
  return null;
}

function getHeadingText(heading) {
  var clone = heading.cloneNode(true);
  clone.querySelectorAll(".headerlink").forEach(function (link) {
    link.remove();
  });
  return clone.textContent.replace(/\s+/g, " ").trim();
}

function getPageKeyFromHref(href, pageMap) {
  if (!href || href.indexOf("#") === 0) {
    return null;
  }

  var anchor = document.createElement("a");
  anchor.href = href;
  var normalized = normalizePath(anchor.pathname);

  for (var key in pageMap) {
    for (var language in pageMap[key]) {
      var target = pageMap[key][language];
      if (normalized === target || normalized.endsWith("/" + target)) {
        return key;
      }
    }
  }
  return null;
}

function initScreenshotLightbox() {
  var screenshots = document.querySelectorAll("img.mobile-screenshot");
  if (!screenshots.length) {
    return;
  }

  var lightbox = document.createElement("div");
  lightbox.className = "screenshot-lightbox";
  lightbox.setAttribute("role", "dialog");
  lightbox.setAttribute("aria-modal", "true");
  lightbox.innerHTML = '<span class="screenshot-lightbox__close" aria-hidden="true">&times;</span><img alt="">';
  document.body.appendChild(lightbox);

  var fullImage = lightbox.querySelector("img");

  function closeLightbox() {
    lightbox.classList.remove("is-open");
    fullImage.removeAttribute("src");
    fullImage.removeAttribute("alt");
  }

  screenshots.forEach(function (image) {
    image.setAttribute("tabindex", "0");
    image.setAttribute("title", "Open full-size screenshot");

    function openLightbox() {
      fullImage.src = image.currentSrc || image.src;
      fullImage.alt = image.alt || "";
      lightbox.classList.add("is-open");
    }

    image.addEventListener("click", openLightbox);
    image.addEventListener("keydown", function (event) {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openLightbox();
      }
    });
  });

  lightbox.addEventListener("click", closeLightbox);
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && lightbox.classList.contains("is-open")) {
      closeLightbox();
    }
  });
}
