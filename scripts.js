const API_URL = 'https://apis.is/isnic?domain=';

document.addEventListener('DOMContentLoaded', () => {
  const domains = document.querySelector('.domains');

  program.init(domains);
});

/**
 * Leit að léni. Sækir gögn með Ajax á apis.is.
 */
const program = (() => {
  let domains;
  function displayDomain(domainList) {
    if (domainList.length === 0) {
      displayError('Fann ekki lén');
      return;
    }

    const [{domain, registered, lastChange, expires,
      registrantname, email, address, country }] = domainList;

    const dl7 = document.createElement('dl');
    const countryText = document.createElement('dt');
    countryText.appendChild(document.createTextNode('Land'));
    dl7.appendChild(countryText);
    const countryNameElement = document.createElement('dd');
    countryNameElement.appendChild(document.createTextNode(country));
    dl7.appendChild(countryNameElement);

    const dl6 = document.createElement('dl');
    const addressText = document.createElement('dt');
    addressText.appendChild(document.createTextNode('Heimilisfang'));
    dl6.appendChild(addressText);
    const addressNameElement = document.createElement('dd');
    addressNameElement.appendChild(document.createTextNode(address));
    dl6.appendChild(addressNameElement);

    const dl5 = document.createElement('dl');
    const emailText = document.createElement('dt');
    emailText.appendChild(document.createTextNode('Netfang'));
    dl5.appendChild(emailText);
    const emailNameElement = document.createElement('dd');
    emailNameElement.appendChild(document.createTextNode(email));
    dl5.appendChild(emailNameElement);

    const dl4 = document.createElement('dl');
    const registrantText = document.createElement('dt');
    registrantText.appendChild(document.createTextNode('Skráningaraðili'));
    dl4.appendChild(registrantText);
    const registrantNameElement = document.createElement('dd');
    registrantNameElement.appendChild(document.createTextNode(registrantname));
    dl4.appendChild(registrantNameElement);

    const dl3 = document.createElement('dl');
    const expiresText = document.createElement('dt');
    expiresText.appendChild(document.createTextNode('Rennur út'));
    dl3.appendChild(expiresText);
    const expiresNameElement = document.createElement('dd');
    expiresNameElement.appendChild(document.createTextNode(expires));
    dl3.appendChild(expiresNameElement);

    const dl = document.createElement('dl');
    const domainText = document.createElement('dt');
    domainText.appendChild(document.createTextNode('Lén'));
    dl.appendChild(domainText);
    const domainNameElement = document.createElement('dd');
    domainNameElement.appendChild(document.createTextNode(domain));
    dl.appendChild(domainNameElement);

    const dl1 = document.createElement('dl');
    const registeredText = document.createElement('dt');
    registeredText.appendChild(document.createTextNode('Skráð'));
    dl1.appendChild(registeredText);
    const registeredNameElement = document.createElement('dd');
    registeredNameElement.appendChild(document.createTextNode(registered));
    dl1.appendChild(registeredNameElement);

    const dl2 = document.createElement('dl');
    const lastChangeText = document.createElement('dt');
    lastChangeText.appendChild(document.createTextNode('Seinast breytt'));
    dl2.appendChild(lastChangeText);
    const lastChangeNameElement = document.createElement('dd');
    lastChangeNameElement.appendChild(document.createTextNode(lastChange));
    dl2.appendChild(lastChangeNameElement);

    const container = domains.querySelector('.results');

    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }

    container.appendChild(dl);
    container.appendChild(dl1);
    container.appendChild(dl2);
    container.appendChild(dl3);
    container.appendChild(dl4);
    container.appendChild(dl5);
    container.appendChild(dl6);
    container.appendChild(dl7);
  }


  function displayError(error) {
    const container = domains.querySelector('.results');

    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }

    container.appendChild(document.createTextNode(error));
  }


  function fetchData(domain) {
    fetch(`${API_URL}${domain}`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }

        throw new Error('Villa við að sækja gögn');
      })
      .then((data) => {
        displayDomain(data.results);
      })
      .catch((error) => {
        displayError('Lén verður að vera strengur');
        console.error(error);
      });
  }


  function onSubmit(e) {
    e.preventDefault();
    const input = e.target.querySelector('input');

    fetchData(input.value);
  }


  function init(_domains) {
    domains = _domains;

    const form = domains.querySelector('form');
    form.addEventListener('submit', onSubmit);
  }

  return {
    init,
  };
})();
