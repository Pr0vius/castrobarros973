export const getBlueprintTemplate = (e = {}) => {
  return `
    <div id="${e.id}" class="row p-0 m-0 mb-3">
      <h4 class="text-center">${e.title}</h4>
      <div class="col-12 col-md-8 p-0">
        <div class="d-flex position-relative rounded overflow-hidden bp-img-container">
          <img class="blueprint" src="${e.images.preview}" alt="${e.title}">
          <div class="d-flex align-items-center justify-content-center w-100 h-100 position-absolute top-0">
            <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#${
              e.modalId
            }">
              Ver plano completo
            </button>
          </div>
        </div>
      </div>
      <div class="col-10 col-md-4 mx-auto">
        <ul class="blueprint__details-ul">
        ${e.details
          .map(item => `<li class="blueprint__details-li">${item}</li>`)
          .join("")}
        </ul>
      </div>
    </div>
  `;
};

export const getBlueprintModalTemplate = (e = {}) => {
  return `
    <div class="modal" id="${e.modalId}">
      <div class="modal-dialog modal-lg modal-dialog-scrollable">
        <div class="modal-content">
          <div class="modal-header">
            <h2>${e.title}</h2>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <div class="container-fluid d-flex justify-content-center">
              <img
                src="${e.images.full}"
                class="img-fluid"
                alt="${e.title}"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
};

export const getNavDDMenuOptions = (e = {}, i) => {
  return `
    ${
      i > 0
        ? `<li>
					<hr class="dropdown-divider" />
				</li>`
        : ""
    }
    <li>
      <a class="dropdown-item" href="#${e.id}">${e.title}</a>
    </li>
    
  `;
};

export const getNews = (data = []) => {
  return `
  <h2 class="section-title">Novedades</h2>
  <div class="container-fluid">
    <div class="row p-0">
      ${data
        .slice(0, 2)
        .map(
          e => `
        <div class="col-12 col-md-6 p-0">
          <div class="card bg-primary m-1">
            <img
              src="${e.img}"
              alt="${e.title}"
              class="card-img-top news-img"
            />
            <div class="card-body">
              <span class="card-text text-white"
                >${e.title}</span
              >
            </div>
          </div>
        </div>`
        )
        .join("")}
    </div>
    ${
      data.length > 2
        ? `
      <div class="mt-3 d-flex justify-content-center">
        <button
          type="button"
          class="btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#newsModal"
        >
          Ver mas
        </button>
      </div> ${newsModal(data)}`
        : ""
    }
    </div>
  `;
};

const newsModal = (data = []) => {
  return `
  <div class="modal" id="newsModal">
    <div class="modal-dialog modal-xl modal-dialog-scrollable">
      <div class="modal-content">
        <div class="modal-header">
          <h2>Noticias</h2>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div class="container-fluid p-0">
            <div class="row p-0">
              ${data
                .map(
                  e => `
                <div class="col-12 col-md-4">
                  <div class="card bg-primary m-1">
                    <img
                      src="${e.img}"
                      alt="${e.title}"
                      class="card-img-top news-img"
                    />
                    <div class="card-body">
                      <span class="card-text text-white"
                        >${e.title}</span
                      >
                    </div>
                  </div>
                </div>
              `
                )
                .join("")}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  `;
};

export const sendMail = async form => {
  try {
    let data = new FormData(form);
    const fetchOptions = {
      method: "POST",
      body: data,
    };
    return await fetch("/sendmail.php", fetchOptions);
  } catch (error) {
    throw new Error(error.message);
  }
};

/**
 * Render a modal with the success or failed message
 * @param {string} status only can have two values: success or failed
 */
export const renderNotificationMessage = status => {
  const notiCont = document.getElementById("notification");
  const type = {
    success: {
      className: "alert alert-success alert-dismissible",
      message: "Mensaje enviado",
    },
    failed: {
      className: "alert alert-danger alert-dismissible",
      message: "Algo salió mal",
    },
  };
  const dialog = document.createElement("div");
  dialog.innerHTML = `
    <div class="${type[status].className}" role="alert">
      ${type[status].message}
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>`;
  notiCont.appendChild(dialog);
};
