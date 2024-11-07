$(document).ready(() => {
  renderCatalogo();
  renderPagFornecedor();
  renderBanner();
  renderLogosHome();
  rBannerLateral();
  setupCloseLateralBanner();
});

async function renderBanner() {
  const menuBanners = document.querySelector(".inovaki-new-home .mz-system");

  if (menuBanners) {
    try {
      let response = await fetch(
        `https://centerparts-api.inovaki.com.br/banners/banner-principal`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();

      if (data && data.length > 0) {
        menuBanners.insertAdjacentHTML(
          "afterbegin",
          `<div class="carrouselHome">
          ${data
            .map((banner) => {
              return `
            <div>
              <a id="banimg" href="${banner.redirect_url}"><img src="https://${banner.path}" alt="${banner.key}" /></a>
            </div>
            `;
            })
            .join(" ")}
          </div>`
        );

        $(".inovaki-new-home .carrouselHome").slick({
          prevArrow:
            '<button type="button" class="slick-prev" style="position: absolute;left: 20px;top: 50%;z-index: 1000;background-color: #fff;border: none;color: black;width: 40px;height: 40px;border-radius: 20px;opacity: 0.75;transform: translateY(-50%);"><i class="icon-chevron-left" aria-hidden="true"></i></button>',
          nextArrow:
            '<button type="button" class="slick-next" style="position: absolute;right: 20px;top: 50%;z-index: 1000;background-color: #fff;border: none;color: black;width: 40px;height: 40px;border-radius: 20px;opacity: 0.75;transform: translateY(-50%);"><i class="icon-chevron-right" aria-hidden="true"></i></button>',
          dots: false,
          fade: true,
          infinite: true,
          cssEase: "linear",
          autoplay: true,
          autoplaySpeed: 6000,
        });
      }
    } catch (error) {
      console.error("Fetch error:", error);
      return "";
    }
  }
}

async function renderLogosHome() {
  const logosSlides = document.querySelector(
    ".inovaki-new-home .mz-slider-marcas"
  );
  if (logosSlides) {
    try {
      let response = await fetch(
        `https://centerparts-api.inovaki.com.br/banners/logomarca-home`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();

      if (data && data.length > 0) {
        logosSlides.insertAdjacentHTML(
          "afterbegin",
          `${data
            .map((logo) => {
              return `
            <ul>
              <li><a class="mx-auto" href=""><img src="https://${logo.path}" alt="${logo.key}" /></a></li>
            </ul>
            `;
            })
            .join(" ")}`
        );

        $(".inovaki-new-home .mz-slider-marcas").slick({
          slidesToShow: 7,
          slidesToScroll: 1,
          autoplay: true,
          autoplaySpeed: 6000,
          responsive: [
            {
              breakpoint: 900,
              settings: {
                slidesToShow: 5,
                autoplay: true,
                autoplaySpeed: 6000,
              },
            },
            {
              breakpoint: 480,
              settings: {
                slidesToShow: 2,
                autoplay: true,
                autoplaySpeed: 6000,
              },
            },
          ],
          infinite: true,
        });
      }
    } catch (error) {
      console.error("Fetch error:", error);
      return "";
    }
  }
}

async function rBannerLateral() {
  const bannerLateral = document.querySelector(".mz-sidebar");
  if (bannerLateral) {
    try {
      let response = await fetch(
        `https://centerparts-api.inovaki.com.br/banners/banner-menu-lateral`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();

      if (data && data.length > 0) {
        bannerLateral.insertAdjacentHTML(
          "beforeend",
          `<div class="carrocelLateral">
          ${data
            .map((banner) => {
              return `
              <div> 
                 <a href="${banner.redirect_url}"><img id="main-banner-lateral" src="https://${banner.path}" alt="${banner.key}"></a>
              </div>
            `;
            })
            .join(" ")}
          </div>`
        );

        $(".carrocelLateral").slick({
          prevArrow:
            '<button type="button" class="slick-prev" style="position: absolute;left: 10px;top: 50%;z-index: 1000;background-color: #fff;border: none;color: black;width: 20px;height: 20px;border-radius: 20px;opacity: 0.75;transform: translateY(-50%);"><i class="icon-chevron-left" aria-hidden="true""></i></button>',
          nextArrow:
            '<button type="button" class="slick-next" style="position: absolute;right: 10px;top: 50%;z-index: 1000;background-color: #fff;border: none;color: black;width: 20px;height: 20px;border-radius: 20px;opacity: 0.75;transform: translateY(-50%);"><i class="icon-chevron-right" aria-hidden="true"></i></button>',
          fade: true,
          infinite: true,
          cssEase: "linear",
          dots: false,
          autoplay: true,
          autoplaySpeed: 6000,
        });
      }
    } catch (error) {
      console.error("Fetch error:", error);
      return "";
    }
  }
}

function setupCloseLateralBanner() {
  const sidebar = document.querySelector(".mz-sidebar");

  try {
    sidebar.addEventListener("click", (event) => {
      if (event.target.closest("#openClose")) {
        const arrowDisplay = window.getComputedStyle(
          document.querySelector(".icon-chevron-left")
        ).display;
        document.getElementById("main-banner-lateral").style.display =
          arrowDisplay === "none" ? "none" : "inline-block";
      }
    });
  } catch (e) {}
}

async function renderPagFornecedor() {
  const importPagFornecedor = document.querySelector(
    "main > div.container.mz-result"
  );
  if (importPagFornecedor) {
    try {
      if (getUrlParam("bannerId")) {
        let response2 = await fetch(
          `https://centerparts-api.inovaki.com.br/products/${getUrlParam(
            "bannerId"
          )}`
        );
        if (!response2.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data2 = await response2.json();

        const promises = data2.map(async (product) => {
          try {
            let response = await fetch(
              `/api/catalog_system/pub/products/search?fq=productId:${product.product_id}`
            );
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();

            if (data && data.length > 0) {
              return `
                <a href="${data[0].link}" id="cardProduto">
                  <div id="imgProduto">
                    <img src="${data[0].items[0].images[0].imageUrl}" alt="" />
                  </div>
                  <p id="txttitulo">
                      ${data[0].productName}
                    </p>
                  <div class="titleProdut">
                    <div id="CodValor">
                      <p id="txtCodigo">${data[0].productReferenceCode}</p>
                      <p id="txtValor"><span id="spanReais">R$</span>${formatarPreco(
                        data[0].items[0].sellers[0].commertialOffer.Price
                      )}</p>
                    </div>
                  </div>
                </a>`;
            }
          } catch (error) {
            console.error("Fetch error:", error);
            return "";
          }
        });

        function formatarPreco(txtValor) {
          let valorFormatado = txtValor.toFixed(2).replace(".", ",");
          return valorFormatado;
        }

        const cards = await Promise.all(promises);

        if (cards.some((result) => result !== undefined)) {
          const htmlString = cards.join("");

          importPagFornecedor.insertAdjacentHTML(
            "afterbegin",
            `
            <div class="destaqueDoDia">
              <div id="containerDestaque">
                <div id="txtDestaque">
                  <h1 id="txtDestaqueDia">DESTAQUES</h1>
                </div>
              </div>
              <div class="containerCard">
                ${htmlString}
              </div>
            </div>
            `
          );
        }

        let response = await fetch(
          `https://centerparts-api.inovaki.com.br/banners/banner-principal-do-fornecedor?supplierId=${getUrlParam(
            "bannerId"
          )}`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        importPagFornecedor.insertAdjacentHTML(
          "afterbegin",
          `
          <div id="containerG">
            <div id="contBanner">
              <img id="imgBannerInterna"
                src="https://${data[0].path}"
                alt=""/>
            </div>
          </div>
          `
        );
      }
    } catch (error) {
      console.error(error);
    }
  }
}

async function renderCatalogo() {
  const importCatalogo = document.querySelector(
    ".inovaki-new-catalog main .container"
  );
  if (importCatalogo) {
    try {
      let response = await fetch(
        `https://centerparts-api.inovaki.com.br/banners/ordenacao-de-fornecedores`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      data.sort((a, b) => a.position - b.position);

      if (data && data.length > 0) {
        importCatalogo.insertAdjacentHTML(
          "afterbegin",
          `<div class="catalogo" >
            ${data
              .map((logos) => {
                return `
              <div class="cardslogo" >
                <a href="${appendUrlParam(
                  logos
                )}"><img id="imgLogoM" src="https://${logos.path}" alt="${
                  logos.key
                }" ></img></a>
              </div>
              `;
              })
              .join(" ")}
          </div>`
        );
      }
    } catch (error) {
      console.error("Fetch error:", error);
      return "";
    }
  }
}

function getUrlParam(paramName) {
  const params = new URLSearchParams(window.location.search);
  return params.has(paramName) ? params.get(paramName) : false;
}

function appendUrlParam(logos) {
  const separator = logos.redirect_url.includes("?") ? "&" : "?";
  const updatedUrl = `${logos.redirect_url}${separator}bannerId=${logos.banner_id}`;
  return updatedUrl;
}
// ---------------- exluindo header antiga mobile ----------------

let oldHeaderDiv;

function manageHeader() {
  const headerElement = document.querySelector("header");
  const existingDiv = headerElement.querySelector(".logo-container");

  if (window.innerWidth < 480) {
    if (!oldHeaderDiv) {
      oldHeaderDiv = document.querySelector(".mz-header.mz-system__header");
    }

    if (oldHeaderDiv) {
      oldHeaderDiv.remove();
    }

    if (!existingDiv) {
      const logoHTML = `
            <div class="logo-container">
              <img src="https://centerparts.vteximg.com.br/arquivos/logo-top.jpg" alt="Logo" class="logomarcaMobile">
            </div>
          `;
      headerElement.insertAdjacentHTML("afterbegin", logoHTML);
    }
  } else {
    if (existingDiv) {
      existingDiv.remove();
    }

    if (oldHeaderDiv) {
      headerElement.insertAdjacentElement("afterbegin", oldHeaderDiv);
      oldHeaderDiv = null;
    }
  }

  // Chama a criação do menu hamburguer após a manipulação da logo
  checkScreenSize();
}

document.addEventListener("DOMContentLoaded", manageHeader);

window.addEventListener("resize", manageHeader);

// ---------------- Menu Hamburger mobile ----------------
function createHamburgerMenu() {
  if (!document.querySelector(".menuHamburguer")) {
    const headerElement = document.querySelector(
      ".mz-header.mz-system__header"
    );
    headerElement.insertAdjacentHTML(
      "afterend",
      `
          <div class="menuHamburguer">
            <input type="checkbox" id="menuToggle" />
            <label for="menuToggle" class="menuIcon">
              <span></span>
              <span></span>
              <span></span>
            </label>
            <nav class="menuInfo">
              <ul>
                <li><a id="btnVendedorHome" href="https://devcenterparts.myvtex.com">Área do Vendedor</a></li>
                <li><a id="login" href="/login?ReturnUrl=/"> Área do Cliente </a></li>
                <li><a id="signIn" href="#"> Primeiro Acesso </a></li>
              </ul>
            </nav>
          </div>
        `
    );

    document
      .getElementById("menuToggle")
      .addEventListener("change", function () {
        const menu = document.querySelector(".menuInfo");

        if (this.checked) {
          menu.classList.add("active");
        } else {
          menu.classList.remove("active");
        }
      });
  }
}

function checkScreenSize() {
  if (window.innerWidth <= 480) {
    createHamburgerMenu();
  } else {
    const menu = document.querySelector(".menuHamburguer");
    if (menu) {
      menu.remove();
    }
  }
}

checkScreenSize();
window.addEventListener("resize", checkScreenSize);

// ------------------- btn toolbar ---------------------

function newBtnToolbar() {
  vtexjs.checkout.getOrderForm().then(function (orderForm) {
    const isLoggedIn = orderForm.userProfileId ? true : false;

    const buttonText = isLoggedIn ? "Trocar de cliente" : "Entrar";
    // botão "Trocar de cliente"

    const filho = document.getElementById("impersonateButton");
    const pai = filho.parentElement;
    let formAberto = false;

    pai.insertAdjacentHTML(
      "beforeend",
      `
    <span id="btnTrocaClient" style="cursor: pointer; height: 2.5rem; display: flex; align-items: center; justify-content: center;"
    class="cc-fr-ns cc-mt1 cc-mt0-ns cc-link cc-br2 cc-ba cc-pa0 cc-w-20-ns cc-ph3-ns cc-ba-ns cc-pv2-ns cc-db cc-dib-ns cc-tc cc-ttu cc-fw7 cc-f7 cc-dim cc-btn-change cc-silver">
      <span>${buttonText}</span>
    </span>
  `
    );

    filho.style.display = "none";

    document
      .getElementById("btnTrocaClient")
      .addEventListener("click", function () {
        if (!formAberto) {
          this.insertAdjacentHTML(
            "afterend",
            `
      <div id="impersonateForm" style="position: absolute; top: 19%; left: 49%;">
        <input type="email" id="emailInput" placeholder="Digite o email do cliente" style="padding: 5px; width: 250px; height: 2.5rem;"/>
        <button id="submitImpersonate" style="padding: 5px 10px; margin-left: 5px; background-color: #015ac2; height: 2.5rem; border-color: #c1c4ca; color: #fff;">Enviar</button>
      </div>
      `
          );

          // adiciona evento para o botão de submit
          document
            .getElementById("submitImpersonate")
            .addEventListener("click", function () {
              const email = document.getElementById("emailInput").value;
              if (email) {
                window.cc.impersonate(email);
              }
            });
          formAberto = true;
        } else {
          document.getElementById("impersonateForm").remove();
          formAberto = false;
        }
      });
  });
}

// Cria um observador de mutações
const observer = new MutationObserver((mutationsList) => {
  mutationsList.forEach((mutation) => {
    // Verifica se o tipo de mutação foi a adição de um nó
    if (mutation.type === "childList") {
      mutation.addedNodes.forEach((node) => {
        // Verifica se o nó adicionado tem o ID que você está procurando
        if (node.id === "vtex-callcenter__toolbar") {
          newBtnToolbar();
          console.log(
            "Elemento com ID específico foi criado via JavaScript:",
            node
          );
        }
      });
    }
  });
});

// Inicia a observação do corpo da página para alterações no DOM
observer.observe(document.body, { childList: true, subtree: true });
