/* Peterturkish - 31/08/2023 06:37:24 GMT */
"function" !== typeof String.prototype.trim &&
  (String.prototype.trim = function () {
    return this.replace(/^\s+|\s+$/g, "");
  });
"function" != typeof String.prototype.capitalize &&
  (String.prototype.capitalize = function () {
    return this.charAt(0).toUpperCase() + this.slice(1).toLowerCase();
  });
"function" !== typeof String.prototype.replaceSpecialChars &&
  (String.prototype.replaceSpecialChars = function () {
    var b = {
      "\u00e7": "c",
      "\u00e6": "ae",
      "\u0153": "oe",
      "\u00e1": "a",
      "\u00e9": "e",
      "\u00ed": "i",
      "\u00f3": "o",
      "\u00fa": "u",
      "\u00e0": "a",
      "\u00e8": "e",
      "\u00ec": "i",
      "\u00f2": "o",
      "\u00f9": "u",
      "\u00e4": "a",
      "\u00eb": "e",
      "\u00ef": "i",
      "\u00f6": "o",
      "\u00fc": "u",
      "\u00ff": "y",
      "\u00e2": "a",
      "\u00ea": "e",
      "\u00ee": "i",
      "\u00f4": "o",
      "\u00fb": "u",
      "\u00e5": "a",
      "\u00e3": "a",
      "\u00f8": "o",
      "\u00f5": "o",
      u: "u",
      "\u00c1": "A",
      "\u00c9": "E",
      "\u00cd": "I",
      "\u00d3": "O",
      "\u00da": "U",
      "\u00ca": "E",
      "\u00d4": "O",
      "\u00dc": "U",
      "\u00c3": "A",
      "\u00d5": "O",
      "\u00c0": "A",
      "\u00c7": "C",
    };
    return this.replace(/[\u00e0-\u00fa]/gi, function (a) {
      return "undefined" != typeof b[a] ? b[a] : a;
    });
  });
Array.prototype.indexOf ||
  (Array.prototype.indexOf = function (d, e) {
    var a;
    if (null == this) throw new TypeError('"this" is null or not defined');
    var c = Object(this),
      b = c.length >>> 0;
    if (0 === b) return -1;
    a = +e || 0;
    Infinity === Math.abs(a) && (a = 0);
    if (a >= b) return -1;
    for (a = Math.max(0 <= a ? a : b - Math.abs(a), 0); a < b; ) {
      if (a in c && c[a] === d) return a;
      a++;
    }
    return -1;
  });

/**Funções base */
try {
  /* COMMON */
  var Common = {
    run: function () {},
    init: function () {
      Common.listenToMessage();
      Common.applyBackDrop();
      Common.applySlickSlider();
      Common.applyBoxBanner();
      Common.saveAmount();
      //Função de rolagem
      Common.setDataScrollToggle();
      Common.expressPurchase();
      Common.applyAmazingMenu();
      Common.applyAmazingMenuMobile();
      Common.openAmazingFooter();
      Common.applySmartShootingStar();
      Common.checkLogin();
      Common.checkLoginMobile();
      Common.sidebar();
      Common.userInfo();
      Common.modalCallChange();
      Common.videoModal();
      Common.mzGoogleTranslate();
      Common.searchField();
      Common.applyTipBarCarousel();
      Common.smartQuantityShelf();
      Common.quickViewSimilar();
      Common.quickviewQttBtnShow();
      Common.nameBreaklinePipe();
      Common.smartCart();
      Common.applyImageLoad();
      Common.addLinkToUnavailableProductText();
      //Common.saveCurrentCart();
      //Common.loadCurrentCart();
      Common.userLogout();
    },
    ready: function () {
      $('a[href="#"]').on("click", function (e) {
        e.preventDefault();
      });
    },
    ajaxStop: function () {
      Common.checkLogin();
      Common.saveAmount();

      Common.smartQuantityShelf();
      // Search.quickViewBrand();
      Common.searchAutoComplete();
      Common.nameBreaklinePipe();
      Common.applyImageLoad();
    },
    windowOnload: function () {
      Common.realQuantity();
      Common.ordersHideMenu();
      Common.accountEditButton();
      Common.setShippingProgressBar();
    },
    listenToMessage: function () {
      window.addEventListener("message", function (evt) {
        if (evt.data == "updateCart") {
          $.fn.simpleCart(true, undefined, false);
        }
      });
    },
    redirectMGUsersByCommertialPolicy: function (clientState) {
      var url = window.location.href;
      var scVal = $.cookie("VTEXSC");
      //se o cookie não existe, não deixe seguir
      //se o cookie for vazio, pode seguir
      if (scVal == undefined) return;

      // function redirectUser(filialID) {
      //   if (!url.includes("sc=")) {
      //     if (url.includes("?")) {
      //       window.location.href = url + "&sc=" + filialID;
      //     } else {
      //       window.location.href = url + "?sc=" + filialID;
      //     }
      //   } else {
      //     var newUrl = url.replace(/sc=[0-9]*/, "");
      //     if (url.includes("?")) {
      //       window.location.href = newUrl + "&sc=" + filialID;
      //     } else {
      //       window.location.href = newUrl + "?sc=" + filialID;
      //     }
      //   }
      // }

      function getSc(filial) {
        switch (filial) {
          case "LojaFilial_03":
            return 5;
          case "LojaFilial_02":
            return 4;
          case "LojaFilial_01":
            return 3;
        }
      }

      if (
        !vtexjs.checkout.orderForm.loggedIn &&
        !window.location.href.match("devcenterparts.myvtex.com")
      )
        return;

      fetch(
        `https://centerparts.vtexcommercestable.com.br/api/dataentities/CL/search?_fields=priceTables&userId=${vtexjs.checkout.orderForm.userProfileId}`
      )
        .then((response) => response.json())
        .then((result) => {
          const [resp] = result;
          console.log(">>>>>>> Filial do Cliente: ", resp);

          if (!scVal || scVal.split("=")[1] != getSc(resp.priceTables))
            setUrlParam("sc", getSc(resp.priceTables));
        })
        .catch((error) => console.error(error));

      // if (clientState == "MG") {
      //   if (!scVal || scVal !== "sc=4") {
      //     // Apenas para clientes de Minas Gerais
      //     setUrlParam('sc', 4); // LOJA FILIAL 02
      //   }
      // } else if (clientState == "BA") {
      //   if (!scVal || scVal !== "sc=5") {
      //     setUrlParam('sc', 5); // LOJA FILIAL 03
      //   }
      // } else if (clientState == "AL") {
      //   if (!scVal || scVal !== "sc=5") {
      //     setUrlParam('sc', 5); // LOJA FILIAL 03
      //   }
      // } else if (clientState == "SE") {
      //   if (!scVal || scVal !== "sc=5") {
      //     setUrlParam('sc', 5); // LOJA FILIAL 03
      //   }
      // } else if (clientState == "MA") {
      //   if (!scVal || scVal !== "sc=5") {
      //     setUrlParam('sc', 5); // LOJA FILIAL 03
      //   }
      // } else if (clientState == "PI") {
      //   if (!scVal || scVal !== "sc=5") {
      //     setUrlParam('sc', 5); // LOJA FILIAL 03
      //   }
      // } else {
      //   if (!scVal || scVal !== "sc=3") {
      //     setUrlParam('sc', 3); // LOJA FILIAL 01
      //   }
      // }
    },
    applyBackDrop: function () {
      var qdOverlayClass =
        "qd-am-on qd-cart-show qd-sn-on mz-sn-on mz-fitting-on";

      $(document.body).removeClass(qdOverlayClass);

      $(".mz-backdrop").click(function () {
        $(document.body).removeClass(qdOverlayClass);
      });
    },
    expressPurchase: function () {
      if (!$(document.body).is(".compra-express")) return;

      var table = $(".qd-products-table tbody");
      var textarea = $(".express-purchase-title-qd-v1 textarea");
      var purchaseShelf = $(".express-purchase-shelf-qd-v1");
      var purchaseContent = $(".express-purchase-content");
      var orderId = {};

      purchaseShelf.hide();

      $(".qd-products-table thead").html(
        '<tr> <th class="id-table">ID</th> <th class="product-name-table" colspan="3">Produto</th> <th class="price-table">Preço</th> <th class="buy-table"></th> </tr>'
      );

      function buildImage(image, width, height) {
        if (!image || !width || !height) {
          return false;
        }

        image = image
          .replace(/~/g, "")
          .replace(/#width#/g, width)
          .replace(/#height#/g, height);

        const regex = /<img.*?src="(.*?)"/.exec(image)[1];

        return `https://devcenterparts.vteximg.com.br/${regex}`;
      }

      function formatMoney(number, decPoint, thousandsSep) {
        if (!number || Number.isNaN(number) || !decPoint || !thousandsSep) {
          return "";
        }

        const n = !Number.isFinite(+number) ? 0 : +number;
        const decimals = 2;
        const prec = !Number.isFinite(+decimals) ? 0 : Math.abs(decimals);
        const sep = typeof thousandsSep === "undefined" ? "," : thousandsSep;
        const dec = typeof decPoint === "undefined" ? "." : decPoint;
        const s = "";
        function toFixedFix(n, prec) {
          const k = 10 ** prec;
          return `${Math.round(n * k) / k}`;
        }

        // Fix for IE parseFloat(0.55).toFixed(0) = 0;
        const ss = (prec ? toFixedFix(n, prec) : `${Math.round(n)}`).split(".");

        if (ss[0].length > 3) {
          ss[0] = ss[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
        }

        if ((s[1] || "").length < prec) {
          ss[1] = ss[1] || "";
          ss[1] += new Array(prec - ss[1].length + 1).join("0");
        }

        return `R$ ${ss.join(dec)}`;
      }

      function getCookie(cname) {
        const name = `${cname}=`;
        const decodedCookie = decodeURIComponent(document.cookie);
        const ca = decodedCookie.split(";");

        // eslint-disable-next-line no-plusplus
        for (let i = 0; i < ca.length; i++) {
          let c = ca[i];
          while (c.charAt(0) === " ") {
            c = c.substring(1);
          }
          if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
          }
        }
        return "";
      }

      function renderItemAvailable({ quantity, skuId, available }) {
        if (!available) {
          return `
                        <span class="product-unavailable">
                            Indisponível
                        </span>
                    `;
        }

        return `
                    <input
                        type="text"
                        class="quant qd-sq-quantity qd-sq-on"
                        value="${quantity}"
                        data-sku-id="${skuId}"
                        data-available="${available}"
                    />

                    <a href="#" class="buy-button" id="btn-cart-fast-buy">
                        Adicionar
                    </a>
                `;
      }

      purchaseShelf.find(".buy-all").click(function () {
        table.find(".buy-button").click();
        return false;
      });

      $(".btn-search-product").click(function () {
        var value = (textarea.val() || "").trim();
        var lines = value.split("\n");
        var line;
        table.empty();
        purchaseShelf.hide();

        for (var i = 0; i < lines.length; i++) {
          line = lines[i].match(/([^\,\;\s\t]+)([\,\;\s\t]+)?([0-9]+)?/i) || [];

          if (line[1]) {
            orderId[line[1]] = i + 1;
            getItem(line[1], line[3] || 1);
          }
        }
      });

      $("body").on("click", "#btn-cart-fast-buy", function (event) {
        event.preventDefault();

        const skuId = $(this).prev().attr("data-sku-id");
        const quantity = window.parseInt($(this).prev().val());
        const availableQuantity = window.parseInt(
          $(this).prev().attr("data-available")
        );
        const salesChannel = getCookie("VTEXSC").split("=")[1];

        if (quantity > availableQuantity) {
          $(this).prev().val(availableQuantity);

          Swal.fire({
            title: "Estoque indosponivel!",
            text: `A quantidade em estoque desse produto é de ${availableQuantity} unidades.`,
            icon: "warning",
            confirmButtonText: "Fechar",
          });

          return;
        }

        vtexjs.checkout
          .addToCart(
            [
              {
                id: skuId,
                quantity: quantity,
                seller: "1",
              },
            ],
            null,
            salesChannel
          )
          .done(() => {
            window.AppCart.$store.dispatch("FETCH_ORDER_FORM");

            Swal.fire({
              title: "Produto adicionado ao carrinho",
              icon: "success",
              confirmButtonText: "Fechar",
            });
          });
      });

      $("body").on("change", ".qd-sq-quantity", function (event) {
        event.preventDefault();

        const quantity = window.parseInt($(this).val());
        const availableQuantity = window.parseInt(
          $(this).attr("data-available")
        );

        if (quantity > availableQuantity) {
          $(this).val(availableQuantity);

          Swal.fire({
            title: "Estoque indosponivel!",
            text: `A quantidade em estoque desse produto é de ${availableQuantity} unidades.`,
            icon: "warning",
            confirmButtonText: "Fechar",
          });
        }
      });

      var request = 0;
      var requestComplete = 0;

      function getItem(id, qty) {
        request++;

        purchaseContent.addClass("qd-loading");

        $.ajax({
          url: "/api/catalog_system/pub/products/search/" + id,
          dataType: "json",
          headers: { "REST-Range": "resources=0-99" },
          success: function (data) {
            var html, $html;

            console.log(data);

            if (!data.length) {
              Swal.fire({
                title: "Item não encontrado!",
                text: `O Item ${id} não foi encontrado.`,
                icon: "warning",
                confirmButtonText: "Fechar",
              });

              return;
            }

            const { itemId, nameComplete, sellers, images } = data[0].items[0];

            const {
              commertialOffer: { Price, AvailableQuantity },
            } = sellers[0];

            const { productId, link } = data[0];

            const { imageTag } = images[0];

            html = `
                            <tr id="qd-sku-${itemId}" data-qd-id-table="${id}">
                                <td class="id-table">
                                    ${productId} ${itemId}
                                </td>

                                <td class="id-sku"></td>

                                <td class="image-table shelf-image">
                                    <img src="${buildImage(
                                      imageTag,
                                      "60",
                                      "60"
                                    )}">
                                </td>

                                <td class="product-name-table">
                                    <div class="shelf-product-name">
                                        <a href="${link}" target="_blank">
                                           ${nameComplete}
                                        </a>
                                    </div>
                                </td>

                                <td class="price-table">
                                    <div class="shelf-price-best-price">
                                        <span class="best-price">
                                            ${formatMoney(Price, ",", ".")}
                                        </span>
                                    </div>
                                </td>

                                <td class="buy-table shelf-common-buy-button d-flex" data-qd-qty="${qty}">
                                    ${renderItemAvailable({
                                      quantity: qty,
                                      skuId: itemId,
                                      available: AvailableQuantity,
                                    })}
                                </td>
                            </tr>
                        `;

            $html = $(html);
            table.append($html);

            purchaseShelf.show();
          },
          error: function () {
            var html = $(
              '<tr class="qd-request-error"><td>' +
                id +
                '</td><td colspan="4">Desculpe, houve um erro ao tentar buscar este item. Refaça sua busca ou <a href="#">clique aqui para buscar novamente este item.</a></td></tr>'
            );
            html.appendTo(table);
            html.find("a").click(function () {
              getItem(id, qty);
              html.slideUp();
              return false;
            });
          },
          complete: function () {
            requestComplete++;

            if (!(requestComplete >= request)) return;

            var items = purchaseShelf.find("tbody tr").sort(function (f, s) {
              var a = orderId[$(f).attr("data-qd-id-table")];
              var b = orderId[$(s).attr("data-qd-id-table")];

              if (a < b) return -1;
              else if (a > b) return 1;
              return 0;
            });

            purchaseShelf.find(".shelf-common-buy-button").each(function () {
              var $t = $(this);
              $t.QD_smartQuantity({
                initialValue: $t.attr("data-qd-qty"),
              });
            });

            $(".qd_cart_auto").QD_buyButton();

            purchaseContent.removeClass("qd-loading");
            purchaseShelf.find("tbody").append(items);
          },
        });
      }
    },
    applyImageLoad: function () {
      $(".mz-search-result, .mz-shelf, .mz-amazing-menu").QD_smartImageLoad({
        sizes: {
          width: "223",
          height: "278",
        },
      });
      // Aplica Image Load no menu
      $(window).one("QuatroDigital.am.callback", function () {
        $(".mz-amazing-menu .qd-am-dropdown").one("mouseenter", function () {
          $(window).trigger("QD_SIL_individualChildRender", $(this));
        });
      });
    },
    applyBoxBanner: function () {
      var bannerSlide = $(".mz-box-banner--slide");

      if (!bannerSlide.length) return;

      bannerSlide
        .find(".box-banner")
        .wrapAll('<div class="mz-box-banner-wrapper"></div>');
    },
    saveAmount: function () {
      $(".mz-stamps__highlight-discount-percentage:not(.mz-on)")
        .addClass("mz-on")
        .each(function () {
          var $t = $(this);
          $t.text(
            "-" +
              (
                $t
                  .text()
                  .trim()
                  .match(/[0-9]+/) || [""]
              ).pop() +
              "%"
          );
        });
    },
    showWishesNumber: function (data) {
      var qtt = Object.keys(data).length;
      $(".mz-menu__link[data-wishlist-qtt]").attr("data-wishlist-qtt", qtt);
    },
    applySmartShootingStar: function () {
      $(".prateleira , .mz-quickview__brands")
        .not(".qd-wishlist-started")
        .addClass("qd-wishlist-started")
        .QD_smartShootingStar({
          list: Common.showWishesNumber,
        });
    },
    applySlickSlider: function () {
      var wrapper = $(".mz-slider-marcas:visible > ul:not(.slick-initialized)");

      if (!wrapper.length) return;
      wrapper.slick({
        slidesToShow: 10,
        slidesToScroll: 5,
        dots: false,
        cssEase: "linear",
        infinite: true,
        speed: 500,
        autoplay: true,
        autoplaySpeed: 7000,
        draggable: false,
      });
      wrapper.each(function () {
        $(this).find(".slick-arrow").wrapAll('<div class="slick-nav" />');
      });
      wrapper.find("img").removeAttr("style");
    },
    setActionAddToCart: function (el, activeMsg, paramSku) {
      el.addClass("mz-custom-action-apply");

      el.on("click", function (e) {
        e.preventDefault();

        var productId = $(this).attr("id").replace("idprod", "");

        var _this = $(this);

        $.ajax({ url: _this.attr("href") }).done(function () {
          $(window).trigger("productAddedToCart");
          $(window).trigger("minicartUpdated.vtex.qdDdcVtex");
          if (activeMsg) {
            vtexjs.checkout.getOrderForm().done(function (orderForm) {
              window.top.postMessage("updateCart");
              // window.postMessage([productId, paramSku]);
              // window.parent.postMessage([productId, paramSku]);
              // window.postMessage('productAdded',1);
              // window.parent.postMessage('productAdded',1);
            });
          }
        });
      });
    },
    applyAmazingMenu: function () {
      $(".mz-amazing-menu,.mz-banner__list").QD_amazingMenu();
    },
    applyAmazingMenuMobile: function () {
      var wrapper = $(".mz-amazing-menu-mobile");

      wrapper.find("> ul > li > ul").prepend(function () {
        return $(this).prev().clone().wrap("<li></li>").parent();
      });

      wrapper.QD_amazingMenu({
        callback: function () {
          $(
            '<span class="qd-am-dropdown-trigger"><i class="icon-right"></i></span>'
          )
            .appendTo(wrapper.find(".qd-am-has-ul"))
            .click(function () {
              var $t = $(this);
              $.merge($t.parent(), $t.closest("ul")).toggleClass(
                "qd-am-is-active"
              );

              $t.filter(function () {
                return !$(this).closest("ul").is(".qd-amazing-menu");
              })
                .siblings("ul")
                .stop(true, true)
                .slideToggle();
            });

          wrapper
            .find("nav > ul > li > .qd-am-dropdown-trigger")
            .click(function () {
              $(".mz-backdrop--navigation").addClass("qd-am-is-active");
              $(".mz-backdrop--navigation").animate(
                {
                  scrollTop: 0,
                },
                200
              );
            });

          wrapper.find("> ul > li > ul > li:first-child").click(function (e) {
            e.preventDefault();
            $(this)
              .parents(".qd-am-is-active")
              .removeClass("qd-am-is-active")
              .animate(
                {
                  scrollTop: 0,
                },
                200
              );
          });
        },
      });

      $(".header-qd-v1-amazing-menu-trigger").click(function (evt) {
        evt.preventDefault();
        $(document.body).toggleClass("qd-am-on");
      });

      $(".mz-amazing-menu-mobile-wrapper .header-qd-v1-user-message").on(
        "click",
        "a#login",
        function () {
          $(document.body).removeClass("qd-am-on");
        }
      );

      $(".mz-navigation__close, .mz-menu__link--login").click(function (evt) {
        Common.applyBackDrop();
      });
    },
    openAmazingFooter: function () {
      $(
        ".mz-footer-institucional__menu > ul[itemscope] > li > .qd_am_text"
      ).click(function () {
        $(this)
          .next()
          .stop()
          .slideToggle(250)
          .prev()
          .toggleClass("active")
          .parent()
          .toggleClass("active");
      });
    },
    focusOnInputSearchMobile: function () {
      $(".mz-fixed-bar__search").click(function (evt) {
        evt.preventDefault();
        $(document.body).toggleClass("qd-am-on");

        //MAKE FOCUS HERE
        $("#ftBox4fec277407c244afaea5748650d52317").focus().delay(2000);
      });
    },
    smartCart: function () {
      if ($(document.body).find(".smart-cart-qd-v2-wrapper").length) return;
      $(document.body).append(
        '<div class="smart-cart-qd-v2-wrapper"><div class="qd-sc-wrapper"></div></div>'
      );

      var wrapper = $(".qd-sc-wrapper");

      $.QD_smartCart({
        selector: wrapper,
        dropDown: {
          texts: {
            linkCart: "Finalizar Compra",
            cartTotal:
              '<span class="qd-infoTotalItems">Itens: #items</span><span class="qd-infoTotalValue">Total: #value</span>',
          },
          updateOnlyHover: false,
          smartCheckout: true,
          callback: function () {
            $(".qd-ddc-wrapper3").prepend(
              '<div class="qd-cartTitle"><h3>Meu carrinho</h3></div>'
            );
            wrapper
              .find(".qd_ddc_continueShopping")
              .after(wrapper.find(".qd-ddc-viewCart"));
          },
          skuName: function (data) {
            return data.name + " - " + data.skuName.replace(data.name, "");
          },
          callbackProductsList: function () {
            wrapper.find(".qd-ddc-prodQtt").each(function () {
              var $t = $(this);
              $t.add($t.next(".qd-ddc-prodRemove")).wrapAll(
                '<div class="qd-ddc-prodAction"></div>'
              );
            });
            Common.setShippingProgressBar();
          },
        },
      });

      // Callback do Quick View
      window._QuatroDigital_prodBuyCallback = function (
        jqXHR,
        textStatus,
        prodLink,
        skus
      ) {
        $.fn.simpleCart(true);
        $(".shelf-qd-v1-buy-button-modal").modal("hide");
        $(window).trigger("QuatroDigital.qd_bb_prod_add", [
          new $(),
          skus[0] || 0,
        ]);
      };

      $(".mz-menu__item--cart").click(function (evt) {
        $("body").removeClass(
          "qd-bb-lightBoxBodyProdAdd qd-ddc-product-add-time-v2 qd-ddc-product-add-time"
        );
        evt.preventDefault();
        $(document.body).toggleClass("qd-cart-show");

        wrapper.height($(window).height());
        wrapper
          .find(".qd-ddc-prodWrapper")
          .css("max-height", $(window).height() - 193);

        if (window.Tawk_API) window.Tawk_API.toggleVisibility();
      });

      $(".qd_ddc_lightBoxClose").click(function (evt) {
        $(document.body).removeClass("qd-cart-show");

        if (window.Tawk_API) window.Tawk_API.toggleVisibility();
      });
    },
    defaultCarroseulShelf: function (wrapper) {
      var target =
        wrapper === undefined
          ? $("main .prateleira:not(.slick-initialized)")
          : wrapper;

      if (!target.length) return;

      target.has("h2").each(function () {
        var $t = $(this);
        $t.find("h2").insertBefore($t);
      });

      target.each(function () {
        if ($(this).closest(".mz-product-accessories").length) return;

        $(this).slick({
          prevArrow:
            '<button type="button" class="slick-prev"><i class="fa fa-angle-left" aria-hidden="true"></i></button>',
          nextArrow:
            '<button type="button" class="slick-next"><i class="fa fa-angle-right" aria-hidden="true"></i></button>',
          arrows: true,
          autoplay: false,
          dots: false,
          slidesToShow: 4,
          slidesToScroll: 4,
          infinite: true,
          draggable: false,
          responsive: [
            {
              breakpoint: 1300,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 4,
              },
            },
            {
              breakpoint: 991,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 4,
              },
            },
            {
              breakpoint: 600,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 4,
              },
            },
          ],
        });
      });
    },
    setDataScrollToggle: function () {
      $(document.body).attr("data-qd-scroll-limit", "200, 800");
    },
    checkLogin: function () {
      var wrapper = $(".mz-menu__link--login");
      var urlLogin = "/login";

      $.qdAjax({
        url: "/no-cache/profileSystem/getProfile",
        dataType: "json",
        clearQueueDelay: null,
        success: function (data) {
          try {
            if (data.IsUserDefined) {
              var emailReceived = data.Email;
              var nameUser = emailReceived.match(/([^{0-9}|.|@|-]+)/).pop();
              wrapper.html(
                '<p class="logout"><i class="icon-user-11"></i><span>Olá</span> <span class="name-user">' +
                  nameUser +
                  '</span> <a id="logout" href="#"> | Sair</a></p>'
              );
            } else {
              wrapper.html(
                '<p class="welcome"><a id="login" href="' +
                  urlLogin +
                  '">login</a></p>'
              );
              $(document.body).addClass("not-logged-user");
            }
          } catch (e) {
            if (
              typeof console !== "undefined" &&
              typeof console.info === "function"
            )
              console.info("Ops, algo saiu errado com o login.", e.message);
          }
        },
      });
    },
    checkLoginMobile: function () {
      var wrapper = $(".mz-tipbar__mobile--link");
      var urlLogin = "/login";
      $.qdAjax({
        url: "/no-cache/profileSystem/getProfile",
        dataType: "json",
        clearQueueDelay: null,
        success: function (data) {
          try {
            if (data.IsUserDefined) {
              var emailReceived = data.Email;
              var nameUser = emailReceived.match(/([^{0-9}|.|@|-]+)/).pop();
              wrapper.html(
                '<p class="logout"><i class="icon-user-11"></i><span>Olá</span> <span class="name-user">' +
                  nameUser +
                  '</span> <a id="logout" href="#"> | Sair</a></p>' +
                  "<span>Ganhe pontos e resgate prêmios!</span>"
              );
            } else {
              wrapper.html(
                '<p class="welcome"><a id="login" href="' +
                  urlLogin +
                  '">Cadastre-se</a></p>' +
                  "<span>Ganhe pontos e resgate prêmios!</span>"
              );
              $(document.body).addClass("not-logged-user");
            }
          } catch (e) {
            if (
              typeof console !== "undefined" &&
              typeof console.info === "function"
            )
              console.info("Ops, algo saiu errado com o login.", e.message);
          }
        },
      });
    },
    sidebar: function () {
      var mobile =
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        );
      $("#openClose").click(function () {
        $(document.body).toggleClass("mz-sidebar-off");
        $("#categorias >div").addClass("d-none");
        // if (mobile) {
        // $(document.body).toggleClass("mz-baloon");
        // }
      });
      $("#categorias").click(function () {
        $(document.body).removeClass("mz-sidebar-off");
        $("#categorias >div").toggleClass("d-none");
        // if (mobile) {
        //   $(document.body).toggleClass("mz-baloon");
        // }
      });

      var onOff = false;
      var shipping = function () {
        $(".mz-sidebar__shippingbox").toggleClass("mz-sidebar__shippingbox-on");
      };
      // action on hover
      $("#openCloseShipping").mouseenter(shipping);
      $("#openCloseShipping").mouseleave(shipping);

      $("#usernameInfo").click(function () {
        $(".mz-header__baloon").fadeToggle();
      });
      // if mobile device action on click
      $("#openCloseShipping").click(shipping);
      $("body .mz-backdrop").click(function () {
        // $(document.body).removeClass("mz-baloon");
        $(document.body).removeClass("mz-sidebar-off");
        $(".mz-sidebar__shippingbox").removeClass("mz-sidebar__shippingbox-on");
        // $("#categorias >div").addClass("d-none");
      });
      if (mobile) {
        $(document.body).addClass("mz-sidebar-off");
      }
      var logoutButton = $(".mz-header__baloon button.px-auto a");
      var jsnomeLoja = window.jsnomeLoja;
      var hostname = window.location.hostname;
      var href = "/api/vtexid/pub/logout?scope=" + jsnomeLoja;
      if (hostname && jsnomeLoja && logoutButton.length) {
        logoutButton.on("click", function (e) {
          e.preventDefault();
          document.cookie =
            "checkout.vtex.com=; Path=/; Domain=." +
            location.hostname +
            "; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
          $.ajax(href).always(function () {
            $.removeCookie("qd_current_cart_loaded");

            window.location.href = "/Sistema/401";
          });
        });
      }
    },
    formCadastreMask: function () {
      var form = $(".modal form.form-first-step");

      if (!form.length || typeof $.fn.mask !== "function") return;

      form.find("[name=cnpj]").mask("00.000.000/0000-00");
      form.find("[name=cpf]").mask("000.000.000-00");
      form.find("[name=tel_comercial]").mask("(00) 0000-00009");
      form.find("[name=tel_celular]").mask("(00) 0000-00009");
      form.find("[name=cep]").mask("00000-000");
      form.find("[name=insc_estadual]").mask("###.###.###.###.###");
    },
    checkEmailExist: function (email) {
      window.QD_checkEmailExist_request =
        window.QD_checkEmailExist_request ||
        $.ajax({
          url: "https://centerb2b.websiteseguro.com/vtex-user-sign-up/consult.php",
          dataType: "json",
          data: {
            e: "CL",
            q: "email=" + email,
          },
          success: function (data) {
            if (data.out.length) {
              alert(
                "Este e-mail já existe em nosso cadastro. Para maiores informações por favor entre em contato com o Atendimento ao Cliente."
              );
            }
          },
          complete: function () {
            window.QD_checkEmailExist_request = undefined;
          },
        }).done(function () {});

      return window.QD_checkEmailExist_request;
    },
    checkCnpjExist: function (cnpj) {
      window.QD_checkCnpjExist_request =
        window.QD_checkCnpjExist_request ||
        $.ajax({
          url: "https://centerb2b.websiteseguro.com/vtex-user-sign-up/consult.php",
          dataType: "json",
          data: {
            e: "CL",
            q: "corporateDocument=" + cnpj.replace(/[^0-9]/gi, ""),
          },
          success: function (data) {
            if (data.out.length)
              alert(
                "Este CNPJ já existe em nosso cadastro. Para maiores informações por favor entre em contato com o Atendimento ao Cliente."
              );
          },
          complete: function () {
            window.QD_checkCnpjExist_request = undefined;
          },
        });

      return window.QD_checkCnpjExist_request;
    },
    checkCnpjActivities: function (cnpj) {
      var $form = $(".form-first-step");

      window.QD_checkValidCnpj = false;
      window.QD_checkCnpjActivities_request =
        window.QD_checkCnpjActivities_request ||
        $.ajax({
          url:
            "https://www.receitaws.com.br/v1/cnpj/" +
            cnpj.replace(/[^0-9]/gi, ""),
          method: "GET",
          dataType: "jsonp",
          crossDomain: true,
          cache: true,
          timeout: 3000,
          success: function (data) {
            if (!data) return;

            if (data.status == "ERROR" || data.message) {
              alert("Erro! " + data.message);
              return;
            }

            var activitiesCodes = [
              "45.30-7-03", // COMÉRCIO A VAREJO DE PEÇAS E ACESSÓRIOS NOVOS PARA VEÍCULOS AUTOMOTORES
              "45.30-7-01", // Comércio por atacado de peças e acessórios novos para veículos automotores
              "45.30-7-04", // Comércio a varejo de peças e acessórios usados para veículos automotores
            ];
            var isApprovedActivity = false;

            for (var i = 0; i < data.atividade_principal.length; i++) {
              for (var j = 0; j < activitiesCodes.length; j++) {
                if (data.atividade_principal[i].code == activitiesCodes[j])
                  isApprovedActivity = true;
              }
            }
            for (var i = 0; i < data.atividades_secundarias.length; i++) {
              for (var j = 0; j < activitiesCodes.length; j++) {
                if (data.atividades_secundarias[i].code == activitiesCodes[j])
                  isApprovedActivity = true;

                $form.find('input[name="razao_social"]').val(data.nome || "");
                $form
                  .find('input[name="nome_fantasia"]')
                  .val(data.fantasia || "");
                $form
                  .find('input[name="cep"]')
                  .val((data.cep || "").replace(".", ""));

                $form
                  .find(
                    "textarea[name=rua], input[name=numero], input[name=complemento], input[name=bairro], input[name=cidade], input[name=estado], input[name=pais]"
                  )
                  .removeAttr("disabled");

                $form.find('textarea[name="rua"]').val(data.logradouro || "");
                $form.find('input[name="numero"]').val(data.numero || "");
                $form
                  .find('input[name="complemento"]')
                  .val(data.complemento || "");
                $form.find('input[name="bairro"]').val(data.bairro || "");
                $form.find('input[name="cidade"]').val(data.municipio || "");
                $form.find('input[name="estado"]').val(data.uf || "");
                $form.find('input[name="pais"]').val("Brasil");
              }
            }

            if (!isApprovedActivity)
              alert(
                "A empresa com esse CNPJ não é um Comércio de Autopeças. Por isso, o cadastro não pode ser feito. Em casos de dúvidas ligue para 0800-020-1744"
              );
            else window.QD_checkValidCnpj = true;
          },
          complete: function () {
            window.QD_checkCnpjActivities_request = undefined;
          },
          error: function (x, t, m) {
            if (t === "timeout") {
              alert(
                "Erro! O servidor da Receita não está respondendo no momento. Por favor, tente novamente mais tarde."
              );

              var form = $(".pop-ups-identification form");
              form.find(".qdLoading").slideUp();
              window.QD_checkValidCnpj = false;
            }
          },
        });

      return window.QD_checkCnpjActivities_request;
    },
    modalCallChange: function () {
      $(".call-page-register").each(function () {
        $(this).attr("href", "/login?ReturnUrl=/account&register=true");
      });
      $(window).on("rendered.vtexid", function (e) {
        var headerWrapper = $("#vtexIdContainer .vtexIdUI .modal-header");
        var footerWrapper = $("#vtexIdContainer .vtexIdUI .modal-footer");
        var bodyWrapper = $("#vtexIdContainer .vtexIdUI .modal-body");
        var parentWrapper = $(
          '<div id="content" class="row-fluid"></div>'
        ).insertAfter(footerWrapper);
        var wrapper = $(
          '<div class="modal-call-page-register"></div>'
        ).appendTo(parentWrapper);
        wrapper.append(
          '<a href="/cadastro" class="btn btn-block btn-large call-page-register">Fazer Cadastro</a>'
        );
        wrapper.append(
          '<p class="text-footer">Ainda não é cadastrado? Clique no botão acima e cadastre-se para poder acessar nossa loja.</p>'
        );
        headerWrapper.append(
          '<h2 class="modal-title">Bem vindo à CenterParts</h2>'
        );
        footerWrapper.find("#classicLoginBtn").text("Acessar Loja");
        bodyWrapper.find("#inputEmail").attr("placeholder", "E-mail");
        bodyWrapper.find("#inputPassword").attr("placeholder", "Senha");
        if (
          window.location.search.includes("?ReturnUrl=/account&register=true")
        ) {
          // evt.preventDefault();
          $("body").addClass("form-register-open");
          $("#vtexIdContainer").hide();
          $("vtexIdUI-global-loader").hide();
          // $(".modal-base .modal-body, .modal-base .modal-footer").empty();
          // $(".modal-base .modal-header .close").siblings().empty();

          $(".f-step").show();
          // $("vtexIdUI-global-loader").append($(".first-step"));
          // $(".modal-base .modal-header").html($(".first-step-content .text-header").addClass("header-first-step"));
          // $(".modal-base").removeClass("third-step").removeClass("second-step").addClass("pop-ups-identification first-step").modal({ backdrop: 'static', keyboard: false });

          Common.formCadastreMask();

          var $form = $(".form-first-step");
          var loading = $(
            '<div class="container mz-search-loader"><i class="icon-spinner mx-auto"></i></div>'
          ).hide();
          $form.find(".btn-continue").after(loading);

          var cnpj = $form.find("[name='cnpj']");
          cnpj.keyup(function (e) {
            if ((cnpj.val() || "").length > 17) {
              Common.checkCnpjExist(cnpj.val() || "").done(function (data) {
                if (!data.out.length)
                  Common.checkCnpjActivities(cnpj.val() || "");
              });
            }
          });

          var email = $form.find("[name='e-mail']");
          email.focusout(function (e) {
            if ((email.val() || "").length > 0)
              Common.checkEmailExist(email.val() || "");
          });

          // price table automática no cadastro
          function setCorrectPriceTable(clientState) {
            var priceTableSP;
            var priceTableMG;
            var priceTableBA;

            if (clientState == "MG") {
              return (priceTableMG = "LojaFilial_02");
            } else if (clientState == "BA") {
              return (priceTableBA = "LojaFilial_03");
            } else {
              return (priceTableSP = "LojaFilial_01");
            }
          }

          // Preenchendo o endereço a partir do CEP
          var cepInputs = $form
            .find(
              "textarea[name=rua], input[name=numero], input[name=complemento], input[name=bairro], input[name=cidade], input[name=estado], input[name=pais]"
            )
            .attr("disabled", "disabled");
          var cep = $form.find("input[name=cep]");

          $("input[name=cep]").mask("00000-000");
          cep.keyup(function (e) {
            if ((cep.val() || "").length < 9) return;

            loading.slideDown();

            $.ajax({
              url: "/api/checkout/pub/postal-code/BRA/" + cep.val(),
              dataType: "json",
              success: function (data) {
                $form.find("textarea[name=rua]").val(data.street || "");
                $form.find("input[name=bairro]").val(data.neighborhood || "");
                $form.find("input[name=cidade]").val(data.city || "");
                $form.find("input[name=estado]").val(data.state || "");
                $form
                  .find("input[name=pais]")
                  .val((data.country || "").replace("BRA", "Brasil"));
              },
              complete: function () {
                cepInputs.removeAttr("disabled");
                loading.slideUp();
              },
            });
          });

          $("input[name=was_indicated]").on("click", function () {
            if ($(this).val() == "true")
              $(this).closest(".form-group").next().show();
            else $(this).closest(".form-group").next().hide();
          });

          $(".btn-continue").click(function () {
            if (typeof $.fn.validate !== "function") return;

            $form.validate({
              submitHandler: function (form) {
                var $form = $(form);

                if (!$form.valid()) return;

                loading.slideDown();
                var inputs = $form.find("input, textarea");

                Common.checkEmailExist(
                  inputs.filter("[name='e-mail']").val() || ""
                )
                  .always(function () {})
                  .done(function (data) {
                    if (data.out.length) {
                      return;
                    }

                    Common.checkCnpjExist(
                      inputs.filter("[name='cnpj']").val() || ""
                    )
                      .always(function () {})
                      .done(function () {
                        if (data.out.length) {
                          return;
                        }

                        Common.checkCnpjActivities(
                          inputs.filter("[name='cnpj']").val() || ""
                        )
                          .always(function () {
                            loading.slideUp();
                          })
                          .done(function () {
                            if (!window.QD_checkValidCnpj) {
                              loading.slideUp();
                              return;
                            }

                            var stateRegistration = (
                              inputs.filter("[name='insc_estadual']").val() ||
                              "Isento"
                            ).trim();
                            stateRegistration = stateRegistration.length
                              ? stateRegistration
                              : "Isento";
                            stateRegistration = stateRegistration.replace(
                              /i.+ento/g,
                              "Isento"
                            );

                            var mobileNumber = (
                              inputs.filter("[name='tel_celular']").val() || ""
                            )
                              .replace(/[^0-9]/gi, "")
                              .trim();
                            mobileNumber = mobileNumber.length
                              ? "+55" + mobileNumber
                              : "";

                            $.ajax({
                              url: "https://centerb2b.websiteseguro.com/vtex-user-sign-up/insert.php",
                              type: "POST",
                              dataType: "json",
                              // contentType: "application/json",
                              data: {
                                e: "CL",
                                data: JSON.stringify({
                                  approved: true,
                                  corporateName:
                                    inputs
                                      .filter("[name='razao_social']")
                                      .val() || "",
                                  tradeName:
                                    inputs
                                      .filter("[name='nome_fantasia']")
                                      .val() || "",
                                  corporateDocument: (
                                    inputs.filter("[name='cnpj']").val() || ""
                                  ).replace(/[^0-9]/gi, ""),
                                  document: (
                                    inputs.filter("[name='cpf']").val() || ""
                                  ).replace(/[^0-9]/gi, ""),
                                  documentType: "cpf",
                                  stateRegistration: stateRegistration,
                                  firstName:
                                    inputs.filter("[name='nome']").val() || "",
                                  lastName:
                                    inputs.filter("[name='sobrenome']").val() ||
                                    "",
                                  email:
                                    inputs.filter("[name='e-mail']").val() ||
                                    "",
                                  homePhone:
                                    "+55" +
                                    (
                                      inputs
                                        .filter("[name='tel_comercial']")
                                        .val() || ""
                                    ).replace(/[^0-9]/gi, ""),
                                  indicatedBy:
                                    inputs
                                      .filter("[name='indicated_by']")
                                      .val() || "",
                                  phone: mobileNumber,
                                  isCorporate: true,
                                  isNewsletterOptIn: false,
                                  localeDefault: "pt-BR",
                                  priceTables: setCorrectPriceTable(
                                    inputs.filter("[name='estado']").val()
                                  ),
                                }),
                              },
                              success: function (data) {
                                $.ajax({
                                  url: "https://centerb2b.websiteseguro.com/vtex-user-sign-up/insert.php",
                                  type: "POST",
                                  dataType: "json",
                                  // contentType: "application/json",
                                  data: {
                                    e: "AD",
                                    data: JSON.stringify({
                                      addressName: "Principal",
                                      // userId:			(data.response.DocumentId || ""),
                                      userId: (data.response.Id || "").replace(
                                        /^[a-z]{2}\-/i,
                                        ""
                                      ),
                                      street:
                                        inputs.filter("[name='rua']").val() ||
                                        "",
                                      number:
                                        inputs
                                          .filter("[name='numero']")
                                          .val() || "",
                                      complement:
                                        inputs
                                          .filter("[name='complemento']")
                                          .val() || "",
                                      neighborhood:
                                        inputs
                                          .filter("[name='bairro']")
                                          .val() || "",
                                      city:
                                        inputs
                                          .filter("[name='cidade']")
                                          .val() || "",
                                      state:
                                        inputs
                                          .filter("[name='estado']")
                                          .val() || "",
                                      postalCode:
                                        inputs.filter("[name='cep']").val() ||
                                        "",
                                      country:
                                        inputs.filter("[name='pais']").val() ||
                                        "",
                                      addressType: "residential",
                                      receiverName:
                                        inputs.filter("[name='nome']").val() ||
                                        "",
                                      geoCoordinate: [],
                                    }),
                                  },
                                  success: function () {
                                    $(".f-step").hide();
                                    $(".s-step").show();
                                    setTimeout(function () {
                                      window.location.href = "/login";
                                    }, 5000);
                                  },
                                  error: function (data) {
                                    alert(
                                      "Não foi possível enviar seu formulário, por favor tente novamente ou entre em contato por telefone."
                                    );
                                  },
                                  complete: function () {
                                    loading.slideUp(function () {
                                      $(this).remove();
                                    });
                                  },
                                });
                              },
                              error: function () {
                                alert(
                                  "Não foi possível enviar seu formulário, por favor tente novamente ou entre em contato por telefone."
                                );
                                loading.slideUp(function () {
                                  $(this).remove();
                                });
                              },
                            });
                          });
                      });
                  });
              },
              errorPlacement: function (error, element) {},
            });

            $form.submit();
          });
        }

        var register = (
          (location.search || "").match(/register=([^&]+)/i) || [""]
        ).pop();

        if (register) $(".call-page-register").click();
      });
    },
    mzGoogleTranslate: function () {
      // Esta função é necessaria por que o
      // google translate plugin tras os labels
      // escritos na lingua nativa do seu navegador
      $("#en").click(function (evt) {
        evt.preventDefault();
        var english = ["Inglés", "Inglês", "English"];
        for (i = 0; i < english.length; i++) {
          $(".goog-te-menu-frame:eq(0)")
            .contents()
            .find("span:contains('" + english[i] + "')")
            .click();
        }
      });
      $("#es").click(function (evt) {
        evt.preventDefault();
        var english = ["Espanhol", "Spanish", "Español", "Castellano"];
        for (i = 0; i < english.length; i++) {
          $(".goog-te-menu-frame:eq(0)")
            .contents()
            .find("span:contains('" + english[i] + "')")
            .click();
        }
      });
    },
    videoModal: function () {
      $("#videoCadastro , #videoLogin").click(function () {
        $("body").addClass(this.id);
      });
      $(".mz-backdrop").click(function (e) {
        e.preventDefault();
        $("body").removeClass("videoCadastro , videoLogin");
        $("iframe").each(function () {
          $(this).attr("src", $(this).attr("src"));
        });
      });
    },
    userInfo: function () {
      var phoneFormat = function (phone) {
        if (phone.length <= 13)
          return phone.replace(
            /(\+[0-9]{2})([0-9]{2})([0-9]{4})([0-9]{4})/,
            "$1 ($2) $3-$4"
          );
        else
          return phone.replace(
            /(\+[0-9]{2})([0-9]{2})([0-9]{1})([0-9]{4})([0-9]{4})/,
            "$1 ($2) $3-$4-$5"
          );

        return;
      };

      var addHtml = function (data) {
        var dataFill = {
          address: {
            city: data.address.city || " ",
            complement: data.address.complement || " ",
            neighborhood: data.address.neighborhood || " ",
            postalCode: data.address.postalCode || " ",
            state: data.address.state || " ",
            street: data.address.street || " ",
          },
          user: {
            CodApoio1: data.user.CodApoio1 || " ",
            CodApoio2: data.user.CodApoio2 || " ",
            CodRep1: data.user.CodRep1 || " ",
            CodRep2: data.user.CodRep2 || " ",
            NomeApoio1: data.user.NomeApoio1 || " ",
            NomeApoio2: data.user.NomeApoio2 || " ",
            NomeRep1: data.user.NomeRep1 || " ",
            NomeRep2: data.user.NomeRep2 || " ",
            TelApoio1: data.user.TelApoio1 || " ",
            TelApoio2: data.user.TelApoio2 || " ",
            TelRep1: data.user.TelRep1 || " ",
            TelRep2: data.user.TelRep2 || " ",
            corporateDocument: data.user.corporateDocument || " ",
            corporateName: data.user.corporateNamecorporateName || " ",
            email: data.user.email || " ",
            firstName: data.user.firstName || " ",
            homePhone: data.user.homePhone || " ",
            lastName: data.user.lastName || " ",
          },
        };

        try {
          $("#usernameInfo > div > p").html(dataFill.user.firstName);
          $("#userName").append(dataFill.user.firstName);

          if (dataFill.user.NomeRep1 != " " || dataFill.user.NomeRep2 != " ") {
            var repaSpan = document.createElement("span");
            var repname = document.createTextNode(
              " Seu representante é " +
                (dataFill.user.NomeRep1 || dataFill.user.NomeRep2)
            );
            repaSpan.appendChild(repname);
            $("#userName").append(repaSpan);
          } else {
            $(".mz-fill-username span").remove();
          }

          //Top box <p>
          var p = document.createElement("p");
          var nodeCreation = function (wrapper, list) {
            for (var i = 0; i < list.length; i++) {
              clone = p.cloneNode();
              clone.appendChild(document.createTextNode(list[i]));

              if (wrapper.length && list[i] != undefined) {
                wrapper.append(clone);
              }
            }
          };

          // Address
          var add = [
            dataFill.address.street,
            dataFill.address.complementstreet,
            dataFill.address.neighborhoodstreet,
            dataFill.address.postalCodestreet,
            dataFill.address.citystreet,
            dataFill.address.state,
          ];

          var address = $("#add");

          // CHAMADA PRA REDIRECIONAMENTO POR POLITICA COMERCIAL - FOCO EM CLIENTE DE MG
          if (dataFill.address.state) {
            Common.redirectMGUsersByCommertialPolicy(dataFill.address.state);
          }

          var address = $("#add");
          nodeCreation(address, add);

          //Rep 1
          var rep1 = [
            dataFill.user.CodRep1,
            dataFill.user.NomeRep1,
            phoneFormat(dataFill.user.TelRep1),
            "Linha Leve",
          ];
          var representante = $("#rep");
          nodeCreation(representante, rep1);

          //Rep 2
          var rep2 = [
            dataFill.user.CodRep2,
            dataFill.user.NomeRep2,
            phoneFormat(dataFill.user.TelRep2),
            "Linha Pesada",
          ];
          var representante = $("#rep");
          nodeCreation(representante, rep2);

          //resp
          var res = [
            dataFill.user.firstName + " " + dataFill.user.lastName,
            dataFill.user.email,
            phoneFormat(dataFill.user.homePhone),
          ];
          var responsavel = $("#res");
          nodeCreation(responsavel, res);

          //apoio1
          var apo1 = [
            dataFill.user.CodApoio1,
            dataFill.user.NomeApoio1,
            phoneFormat(dataFill.user.TelApoio1),
            "Linha Leve",
          ];
          var apoio = $("#apo");
          nodeCreation(apoio, apo1);

          //apoio2
          var apo2 = [
            dataFill.user.CodApoio2,
            dataFill.user.NomeApoio2,
            phoneFormat(dataFill.user.TelApoio2),
            "Linha Leve",
          ];
          var apoio = $("#apo");
          nodeCreation(apoio, apo2);
        } catch (e) {
          if (
            typeof console !== "undefined" &&
            typeof console.error === "function"
          )
            console.error(e);
        }
      };

      vtexjs.checkout.getOrderForm().done((orderForm) => {
        console.log(orderForm);

        const { loggedIn, userProfileId, userType } = orderForm;

        if (loggedIn || userType === "callCenterOperator") {
          try {
            if (!userProfileId) {
              var html =
                '<div class="qd-user-info"><p>Olá visitante!</p></div>';
              $(".user-messenger .ajax-content-loader").before(html);

              return;
            }

            $.qdAjax({
              url:
                "https://centerb2b.websiteseguro.com/vtex-user-info/vtex-crm.php?u=" +
                userProfileId,
              dataType: "json",
              clearQueueDelay: null,
              success: addHtml,
            });
          } catch (e) {
            if (
              typeof console !== "undefined" &&
              typeof console.error === "function"
            )
              console.error(e.message);
          }
        }
      });
    },
    searchField: function () {
      $("#button-search").click(function () {
        window.location =
          "https://centerparts.vtexcommercestable.com.br/" +
          $("#search-term")[0].value;
      });
      $("#search-term").keypress(function (event) {
        var keycode = event.keyCode ? event.keyCode : event.which;
        if (keycode == "13") {
          window.location =
            "https://centerparts.vtexcommercestable.com.br/" +
            $("#search-term")[0].value;
        }
      });
    },
    applyTipBarCarousel: function () {
      var wrapper = $(".mz-system__badges ul");
      if (!wrapper.length) return;

      var options = {
        arrows: false,
        autoplay: true,
        slidesToShow: 4,
        slidesToScroll: 4,
        infinite: false,
        draggable: false,
        speed: 1000,
        responsive: [
          {
            breakpoint: 1200,
            settings: {
              slidesToShow: 4,
              slidesToScroll: 4,
            },
          },
          {
            breakpoint: 980,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
            },
          },

          {
            breakpoint: 767,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
            },
          },

          {
            breakpoint: 400,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
            },
          },
        ],
      };

      wrapper.slick(
        $.extend(
          true,
          options,
          (function () {
            // Se estiver dentro do product-qd-v1-sku-selection-box, ele mostrará só 2 slides por vez, mantendo as outras propriedades da variável options
            if (wrapper.closest(".product-qd-v1-sku-selection-box").length)
              return { slidesToShow: 3 };
            return {};
          })()
        )
      );
    },
    setShippingProgressBar: function () {
      function mz_number_format(n, t, e, i) {
        (n = (n + "").replace(/[^0-9+\-Ee.]/g, "")),
          (n = isFinite(+n) ? +n : 0),
          (i = void 0 === i ? "," : i),
          (e = void 0 === e ? "." : e);
        var r = "";
        r = function (n, t) {
          var e = Math.pow(10, t);
          return "" + (Math.round(n * e) / e).toFixed(t);
        };
        return (
          3 <
            (r = (
              (t = isFinite(+t) ? Math.abs(t) : 0)
                ? r(n, t)
                : "" + Math.round(n)
            ).split("."))[0].length &&
            (r[0] = r[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, i)),
          (r[1] || "").length < t &&
            ((r[1] = r[1] || ""),
            (r[1] += Array(t - r[1].length + 1).join("0"))),
          r.join(e)
        );
      }
      try {
        if (
          !window.mz_ShippingTargetPrice ||
          !window._QuatroDigital_DropDown.getOrderForm
        )
          return;

        var targetPrice = window.mz_ShippingTargetPrice;
        var wrapper = $(".mz-shipping-progress-bar-cart");
        var currentPrice = 0;

        if (window._QuatroDigital_DropDown.getOrderForm.totalizers[0]) {
          currentPrice =
            window._QuatroDigital_DropDown.getOrderForm.totalizers[0].value /
            100;
        }

        var percentage = (currentPrice / targetPrice) * 100;
        var difference = targetPrice - currentPrice;

        if (!difference || difference < 0) {
          // $('.mz-sidebar__freeshipping').hide();
          // $('.mz-sidebar>ul').css('margin-top', '50px');
          difference = 0;
        }
        if (!wrapper.length) {
          wrapper = $(
            '<div class="mz-shipping-progress-bar-cart"> <div class="progress"> <div class="progress-bar" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100">  </div> </div><div class="progress-bar-text">Faltam só R$ ' +
              mz_number_format(difference, 2, ",", ".") +
              ' para seu <span>frete grátis!</span> </div><i class="fa fa-truck fa-flip-horizontal" aria-hidden="true"></i> </div>'
          ).prependTo(
            ".qd-ddc-wrapper3 .qd-ddc-info, .mz-productpopup--progressbar"
          );
          $(".mz-sidebar__freeshipping").show();
        }
        console.log("difference: " + difference);
        if ($(".mz-shipping-counter strong").length) {
          $(".progress-bar").attr("style", "width:" + percentage + "%;");
          $(".mz-shipping-counter strong")[0].innerHTML = (
            "R$: " + difference.toFixed(2)
          ).replace(".", ",");
        }

        wrapper
          .find(".progress-bar-text")
          .html(
            "Faltam só R$ " +
              mz_number_format(difference, 2, ",", ".") +
              " para seu <span>frete grátis!</span>"
          );
        wrapper
          .find(".progress-bar")
          .css("width", percentage + "%")
          .attr("aria-valuenow", percentage);

        if (difference <= 0) {
          wrapper.remove();

          return;
        }
      } catch (e) {
        console.log("Não entrei no progress bar do CARRINHO") /
          (typeof console !== "undefined" &&
            typeof console.error === "function" &&
            console.error("Problemas :( . Detalhes: ", e));
      }

      $(".mz-sidebar__shippingbox").hide();
      $(".mz-sidebar > ul").css("margin-top", "50px;");

      var clientCEP = null;

      if (vtexjs.checkout.orderForm.shippingData) {
        clientCEP =
          vtexjs.checkout.orderForm.shippingData.address?.postalCode.replace(
            "-",
            ""
          );
      }

      console.log("cep!", clientCEP);

      if (clientCEP > "13670000" && clientCEP < "14860999") {
        $(".mz-sidebar__shippingbox").show();
        $(".mz-sidebar>ul").css("margin-top", "0px;");
      } else if (clientCEP > "01000001" && clientCEP < "18190999") {
        $(".mz-sidebar__shippingbox").show();
        $(".mz-sidebar>ul").css("margin-top", "0px;");
      } else if (
        (clientCEP > "18195000" && clientCEP < "18560999") ||
        (clientCEP > "6500000" && clientCEP < "6549999") ||
        (clientCEP > "6700000" && clientCEP < "6729999") ||
        (clientCEP > "7400000" && clientCEP < "7500999") ||
        (clientCEP > "7600000" && clientCEP < "7600999") ||
        (clientCEP > "7700000" && clientCEP < "7749999") ||
        (clientCEP > "7800000" && clientCEP < "7899999") ||
        (clientCEP > "8900000" && clientCEP < "8900999") ||
        (clientCEP > "11000000" && clientCEP < "13985999") ||
        (clientCEP > "18000000" && clientCEP < "18560999")
      ) {
        $(".mz-sidebar__shippingbox").show();
        $(".mz-sidebar>ul").css("margin-top", "0px;");
      } else {
        $(".mz-sidebar__shippingbox").hide();
        $(".mz-sidebar>ul").css("margin-top", "50px;");
      }
    },
    smartQuantityShelf: function () {
      $(
        ".mz-shelf:not(.qd-on) , .mz-quickview:not(.qd-on),.mz-quickview__brands--item:not(.qd-on)"
      )
        .addClass("qd-on")
        .QD_smartQuantity({
          buyButton: ".btn-add-buy-button-asynchronous",
          setQuantityByUrl: false,
        });
    },
    quickViewSimilar: function () {
      if ($("#___rc-p-id").length) {
        var productId = $("#___rc-p-id").val();
        var url =
          "/api/catalog_system/pub/products/crossselling/similars/" + productId;
        $.ajax({
          type: "GET",
          method: "GET",
          url: url,
          dataType: "json",
          clearQueueDelay: null,
          headers: {
            Accept: "application/vnd.vtex.ds.v10+json",
            "Content-Type": "application/json; charset=utf-8",
          },
        }).done(function (data) {
          if (data.length) {
            // console.log(data);
            for (i = 0; data.length > i; i++) {
              var item = document.createElement("div");
              //brand
              var brandDiv = document.createElement("div");
              var brandP = document.createElement("p");
              var brandText = document.createTextNode(data[i].brand || " ");
              brandP.appendChild(brandText);
              brandDiv.appendChild(brandP);
              brandP.className = data[i].brand.toLowerCase().replace(" ", "-");
              brandDiv.className = "mz-brand";
              //name
              var nameDiv = document.createElement("div");
              var nameA = document.createElement("a");
              var nameP = document.createElement("p");
              var nameStrong = document.createElement("strong");
              // var nameText = document.createTextNode(data[i].brand || " "); versão 1 do QV carregava isso
              var strongText = document.createTextNode(
                data[i].items[0].name || " "
              );
              $(nameA).attr("href", data[i].link);
              // nameP.appendChild(nameText);versão 1 do QV carregava isso
              nameStrong.appendChild(strongText);
              nameA.appendChild(nameStrong);
              nameDiv.appendChild(nameP);
              nameDiv.appendChild(nameA);
              nameDiv.className = "mz-name";
              //price
              var priceDiv = document.createElement("div");
              var priceh3 = document.createElement("h3");
              var qttP = document.createElement("p");
              var priceText = document.createTextNode(
                "R$ " +
                  data[i].items[0].sellers[0].commertialOffer.Price.toFixed(
                    2
                  ).replace(".", ",") || " "
              );
              var qttPtext = document.createTextNode(
                "Estoque: " +
                  data[i].items[0].sellers[0].commertialOffer
                    .AvailableQuantity || "0"
              );
              priceh3.appendChild(priceText);
              priceDiv.appendChild(priceh3);
              qttP.appendChild(qttPtext);
              priceDiv.className = "mz-price";
              nameDiv.appendChild(priceDiv);
              nameDiv.appendChild(qttP);

              //smartquantity
              var smartQuantity =
                '<div class="mz-smart-quantity"><div class="col-12 mz-smart-quantity__action"><a class="qd-sq-minus"><i class="icon-minus"></i></a><div class="shelf-qd-v1-qty"><input type="tel" class="qd-sq-quantity form-control" /></div><a class="qd-sq-more"><i class="icon-plus"></i></a></div></div>';
              //buy-button
              var buyDiv = document.createElement("div");
              var buyA = document.createElement("a");
              // var qttP = document.createElement('p');
              buyA.setAttribute(
                "href",
                data[i].items[0].sellers[0].addToCartLink || " "
              );
              buyA.setAttribute(
                "class",
                "buy-button qd-buy-button btn-add-buy-button-asynchronous remove-href "
              );
              var buyText = document.createTextNode("Comprar");
              buyA.appendChild(buyText);
              buyDiv.appendChild(buyA);
              buyDiv.className =
                "mz-buy mz-buy-button wrapper-buy-button-asynchronous";
              //RENDER
              item.appendChild(brandDiv);
              item.appendChild(nameDiv);
              // item.appendChild(priceDiv);

              //creating a holder to SQ and buy-button
              var SqBuyDiv = document.createElement("div");
              $(SqBuyDiv).append(smartQuantity);
              SqBuyDiv.appendChild(buyDiv);
              SqBuyDiv.className = "mz-SqBuy";
              // item.appendChild(starDiv);

              item.appendChild(SqBuyDiv);
              item.className = "mz-quickview__brands--item row";

              if ($(".mz-quickview__brands").length) {
                $(".mz-quickview__brands").append(item);
              }
            }
            $(".mz-name ").addClass("col-12 col-md-6");
            $(".mz-SqBuy, .mz-quickview__brands--item  .mz-brand").addClass(
              "col-12 col-md-3"
            );
            // ' .mz-buy , .mz-star'
          } else {
            $(".mz-quickview__brands").hide();
          }
        });
      }
    },
    quickviewQttBtnShow: function () {
      var buyBtn = $(".quickview-right .buy-in-page-button");
      if (buyBtn.length && $(buyBtn).attr("style") != "display: none;") {
        $(".mz-smart-quantity__action").removeClass("d-none");
      }
    },
    searchAutoComplete: function () {
      //o cliente pediu para remover os produtos do auto complete e deixar sómente as categorias
      //para voltar os produtos desabilitar esta função
      if ($(".ui-autocomplete li a img").length) {
        $(".ui-autocomplete li a img").each(function () {
          $(this).parent().parent().css("display", "none");
        });
      }
    },
    nameBreaklinePipe: function () {
      var wrapper = $(".mz-product-summary__name a");
      if (!$(wrapper).length) return;
      wrapper.each(function () {
        var str = $(this).text();
        try {
          while (str.indexOf("|") >= 0) {
            var newStr = str.replace("|", "</p><p>");
            str = newStr;
            $(this).html("<p>" + str + "</p>");
          }
        } catch (e) {
          console.log("função nameBreaklinePipe ERRO:", e);
        }
      });
    },
    realQuantity: function (productData) {
      if ($("body").is(".resultado-busca-codigo")) return;
      var prodArraySkus = [];
      var shelves = $(".mz-shelf");

      shelves.each(function () {
        if ($(this).is(".mz-qtt-added")) return;
        $(this).addClass("mz-qtt-added");
        //fazendo só uma req, ou pelo menos fazendo de 50 em 50
        var buyWrapper = $(this).find(
          ".wrapper-buy-button-asynchronous .add a"
        );

        if (!buyWrapper.length) return;

        var prodId = $(this).find(".mz-shelf__id").attr("value");
        prodArraySkus.push("fq=productId:" + prodId);
      });

      var queryUrl = prodArraySkus.join("&");
      if (productData) {
        Common.smartQuantityAddMaxValue(productData, shelves);
      } else {
        if (!queryUrl) return;
        $.ajax({
          type: "GET",
          method: "GET",
          url: "/api/catalog_system/pub/products/search?" + queryUrl, // pode se com qualquer um dos seguintesskuJson.skus[0].sku ||  skuJson.productId
          dataType: "json",
          headers: {
            Accept: "application/vnd.vtex.ds.v10+json",
            "Content-Type": "application/json; charset=utf-8",
          },
        }).done(function (response) {
          response.map(function (data) {
            Common.smartQuantityAddMaxValue(data, shelves);
          });
        });
      }
    },
    smartQuantityAddMaxValue: function (data, shelves) {
      //aqui q duplica na shelf
      var respProdId = data.productId;
      var shelf = shelves
        .find(".mz-shelf__id[value=" + respProdId + "]")
        .parent();
      if (!shelf.length) return;
      var maxValue = data.items[0].sellers[0].commertialOffer.AvailableQuantity;

      if (!$(shelf).find(".mz-qtd").length) {
        $(shelf)
          .find(".mz-search-table__price,.quickview-price .productPrice")
          .append(
            '<p class="mz-qtd">Estoque: <span class="mz-qtd-value">' +
              maxValue +
              "</span></p>"
          );
      }

      $(shelf)
        .find(".qd-sq-quantity")
        .on("change", function () {
          var inputVal = Number($(this).val());
          // var params = new URLSearchParams(hrefButtonBuy);
          // var qtd = params.get("qty");
          var parent = $(this).closest(".mz-shelf,.quickview-right");
          var btn = parent.find(
            ".mz-buy-button a,.wrapper-buy-button-asynchronous .add a"
          );
          var href = btn.attr("href");
          href = href.replace(/qty=[0-9]*/g, "qty=" + inputVal);
          btn.attr("href", href);
          if (inputVal >= maxValue) {
            $(this).val(maxValue);
            $(this)
              .closest(".mz-smart-quantity__action")
              .find(".qd-sq-more")
              .addClass("lock");
            href = href.replace(/qty=[0-9]*/g, "qty=" + inputVal);
            btn.attr("href", href);
          } else {
            $(this)
              .closest(".mz-smart-quantity__action")
              .find(".qd-sq-more")
              .removeClass("lock");
          }
        });
    },
    ordersHideMenu: function () {
      if (window.location.hash == "#/orders") {
        $(".vtex-account__menu-links").addClass("d-none");
      }
    },
    accountEditButton: function () {
      if (!window.location.pathname == "/_secure/account") return;
      $("label").each(function () {
        var classnName = $(this).text();
        this.parentElement.parentElement.className = classnName.toLowerCase();
      });
    },
    addLinkToUnavailableProductText: function () {
      try {
        if (!$("body").is(".resultado-busca")) return;
        var unavailableShelf = $(".mz-shelf.qd-product-is-in-stock-false");
        if (!unavailableShelf.length) return;
        unavailableShelf.each(function (index, shelf) {
          var $shelf = $(shelf);
          var href = $shelf.find(".qd_sil_img_wrapper").first().attr("href");
          var unavailableLink = $shelf.find(".mz-product-summary__best-price");
          if (unavailableLink.length) {
            unavailableLink.off("click").on("click", function () {
              window.location.href = href;
            });
          }
        });
      } catch (e) {
        console.warn("Houve um erro na funçãoaddLinkToUnavailableProductText ");
      }
    },
    saveCurrentCart: function () {
      $(window).on("orderFormUpdated.vtex", function (e, orderForm) {
        //esperar o carrinho ser carregado
        if (!$.cookie("qd_current_cart_loaded")) return;
        try {
          if (!orderForm.userProfileId) {
            return;
          }

          var items = orderForm.items;

          var itemsJson = { items: [] };
          var userProfileId = orderForm.userProfileId
            .replace(/-/gi, "")
            .toLowerCase();

          for (var i = 0; i < items.length; i++) {
            itemsJson.items.push({
              id: items[i].id,
              name: items[i].name,
              seller: items[i].seller,
              imageUrl: items[i].imageUrl,
              quantity: items[i].quantity,
              detailUrl: items[i].detailUrl,
            });
          }

          console.log({
            id: userProfileId,
            profileId: userProfileId,
            data: JSON.stringify(itemsJson),
          });

          // $.ajax({
          //     url: '/api/dataentities/SC/documents?an=centerparts',
          //     type: 'PATCH',
          //     headers: {
          //         Accept: 'application/vnd.vtex.ds.v10+json',
          //         'Content-Type': 'application/json; charset=utf-8',
          //     },
          //     data: JSON.stringify({
          //         id: userProfileId,
          //         profileId: userProfileId,
          //         data: JSON.stringify(itemsJson),
          //     }),
          //     success: function (data) {
          //         $.cookie('QD-SC-OFI', userProfileId, { path: '/' });
          //     },
          // });
        } catch (e) {
          console.warn(e.message);
        }
      });
    },
    loadCurrentCart: function () {
      if ($.cookie("qd_current_cart_loaded")) {
        return;
      }

      vtexjs.checkout.getOrderForm().done(function (orderForm) {
        if (!orderForm.userProfileId) {
          return;
        }

        if (orderForm.items.length > 0) {
          $.cookie("qd_current_cart_loaded", 1, {
            expires: 1,
            path: "/",
          });
          return;
        }
        var userProfileId = orderForm.userProfileId
          .replace(/-/gi, "")
          .toLowerCase();
        $.ajax({
          url:
            "/api/dataentities/SC/documents/" +
            userProfileId +
            "?_fields=data,status,createdIn&_sort=createdIn%20DESC&an=centerparts",
          type: "GET",
          headers: {
            Accept: "application/vnd.vtex.ds.v10+json",
            "Content-Type": "application/json; charset=utf-8",
          },
          success: function (cartData) {
            var latestCart = cartData;
            if (!latestCart) {
              $.cookie("qd_current_cart_loaded", 1, {
                expires: 1,
                path: "/",
              });
              return;
            }
            var latestCartItems = JSON.parse(latestCart.data);

            if (
              !latestCartItems ||
              !latestCartItems.items ||
              !latestCartItems.items.length
            ) {
              $.cookie("qd_current_cart_loaded", 1, {
                expires: 1,
                path: "/",
              });
              return;
            }
            var items = [];
            for (var i = 0; i < latestCartItems.items.length; i++) {
              var item = {
                id: latestCartItems.items[i].id,
                quantity: latestCartItems.items[i].quantity,
                seller: latestCartItems.items[i].seller,
              };
              items.push(item);
            }
            vtexjs.checkout
              .addToCart(items, null, jssalesChannel)
              .done(function (orderForm) {
                // $(window).trigger("productAddedToCart");
                $(window).trigger("cartProductAdded.vtex");
                $(window).trigger("minicartUpdated.vtex.qdDdcVtex");
                $.cookie("qd_current_cart_loaded", 1, {
                  expires: 1,
                  path: "/",
                });
              });
          },
        });
      });
    },
    userLogout: function () {
      $(".btn-clear-session").on("click", function (event) {
        vtexjs.checkout.removeAllItems().done(function (orderForm) {
          const logoutURL = vtexjs.checkout.getLogoutURL();

          fetch(logoutURL).then((response) => {
            window.location.href = "/Sistema/401";
          });
        });
      });
    },
  };

  /* HOME */
  var Home = {
    init: function () {
      Common.defaultCarroseulShelf();
      Home.newsletter();
    },
    ajaxStop: function () {
      Common.defaultCarroseulShelf();
    },
    windowOnload: function () {},
    newsletter: function () {
      // Opções do Plugin
      var options = {
        cookie: "QdSn1", // Nome do Cookie
        cookieExpires: 30, // Expiração do Cookie tempo em dias
        cookiePath: "/", // Path do Cookie
        button: false, // Diz se vai ter um botão para chamar o modal na tela
        isOverflowHidden: true, // Diz se a tela vai ter overflow:hidden
        code: "",
        email: "",
        iframeCss: "{}",
        displayTimes: 2, // quantas vezes o popup será exibido até que o cookie diga para não exibir mais
        manual: false, // Controla se o disparo será manual ou não
      };

      // Verifica se o valor do cookie é maior do que o número de vezes (displayTimes)
      var cookie = parseInt($.cookie(options.cookie)) || 0; // Cookie
      if (cookie >= options.displayTimes) return;

      // if($('.qd-v1-modal-newsletter').length){
      // 	console.log('--------------------------------CARREGOU AQuI');
      // }

      /*
            PARA FUNCIONAR, DEVE-SE ADICIONAR O SUBTEMPLATE DE HTML DA NEWSLETTER
            NA PAGINA QUE DESEJA SE UTILIZAR A NEWSLETTER
            */

      // Modal
      var modal = $(".qd-v1-modal-newsletter");

      if (!$(".qd-v1-modal-newsletter").length) return;

      modal.addClass("in show").show();

      // Adiciona Body Class (Modal Aberto)
      $(document.body).addClass("modal-open");

      // Função de fechar o modal
      $(".qd-v1-modal-newsletter, .qd_news_success .qd_news_button").on(
        "click",
        function (e) {
          if ($(e.target).is($(this))) {
            var currentCookie = parseInt($.cookie(options.cookie)) || 0;
            $.cookie(options.cookie, currentCookie + 1 || "0", {
              expires: parseInt(options.cookieExpires),
              path: options.cookiePath,
            });

            modal.removeClass("in show").hide();
            $(document.body).removeClass("modal-open");
          }
        }
      );

      ///Envio do form
      $(function () {
        // Formulário
        var form = $("form");
        var entity = "NL";
        var emailInput = form.find("[name=qd_email]");

        // Não alterar aqui
        form.validate({
          rules: {
            email: {
              email: true,
            },
          },
          submitHandler: function (form) {
            var $form = $(form);
            if (!$form.valid()) return;
            var inputs = $form.find("[name]");
            emailInput = emailInput.filter(inputs);
            $form.addClass("qd-loading");
            var saveContact = function (userId) {
              $.ajax({
                url: "//api.ipify.org?format=jsonp",
                dataType: "jsonp",
                success: function (data) {
                  sendData(data.ip);
                },
                error: function () {
                  $.ajax({
                    url: "//www.telize.com/jsonip",
                    dataType: "jsonp",
                    success: function (data) {
                      sendData(data.ip);
                    },
                    error: function (data) {
                      sendData(null);
                    },
                  });
                },
              });
              var formData = $form.serializeObject();
              var sendData = function (ip) {
                formData["userId"] = userId;
                formData["ip"] = ip;
                formData["id"] = (emailInput.val() || "")
                  .toLowerCase()
                  .replace(/[^a-z0-9]/gi, function (v) {
                    return "-" + v.charCodeAt(0) + "-";
                  });
                $.ajax({
                  url: "/api/dataentities/" + entity + "/documents",
                  type: "PATCH",
                  dataType: "json",
                  headers: {
                    Accept: "application/vnd.vtex.ds.v10+json",
                    "Content-Type": "application/json; charset=utf-8",
                  },
                  data: JSON.stringify(formData),
                  success: function (data) {
                    $form.addClass("qd-form-success");
                    $form.trigger("QD.crmSuccess", [data]);
                  },
                  error: function (jqXHR) {
                    if (jqXHR.status == "0" || jqXHR.status == "304") {
                      alert("Este e-mail já está cadastrado na newsletter!");
                    } else {
                      alert(
                        "Desculpe, não foi possível enviar seu formulário!"
                      );
                    }
                  },
                  complete: function () {
                    $form.removeClass("qd-loading");
                  },
                });
              };
            };
            $.ajax({
              url:
                "/api/dataentities/NL/search?_fields=id&email=" +
                (emailInput.val() || "---"),
              type: "GET",
              dataType: "json",
              headers: {
                Accept: "application/vnd.vtex.ds.v10+json",
              },
              success: function (data) {
                if (data.length) saveContact(data[0].id);
                else saveContact(null);
              },
              error: function () {
                saveContact(null);
              },
            });
            return false;
          },
          errorPlacement: function (error, element) {},
        });
      });

      // Adicionando o da entidade NL
      $(window).on("QD.crmSuccess", function (e, data) {
        $.cookie(options.cookie, options.displayTimes, {
          expires: parseInt(options.cookieExpires),
          path: options.cookiePath,
        });
      });
    },
  };
  /* SEARCH */
  var Search = {
    init: function () {
      Search.infinityScroll();
      Search.addFilterByButton();
      Search.openSearchNavigation();
      Search.selectEdit();
      CustomSearch.quickViewOpenModal();
      //Search.applyActionBotaoComprarShelf();
    },
    ajaxStop: function () {
      CustomSearch.quickViewOpenModal();
      // Search.quickViewBrand();
      Search.hidePageFilter();
      //Search.applyActionBotaoComprarShelf();
    },
    windowOnload: function () {},
    shelfLineFix: function () {
      try {
        var exec = function () {
          var curTop;
          var wrapper = $(
            "div[id*='ResultItems_'] >.prateleira:not('.qd-fi-on')"
          ).addClass("qd-fi-on");
          var shelf = wrapper.children("ul").removeClass("qd-first-line");
          shelf.first().addClass("qd-first-line");

          var setFirst = function () {
            shelf.each(function () {
              var $t = $(this);

              if ($t.is(".qd-first-line")) {
                curTop = $t.offset().top;
                shelf = shelf.not($t);
                return;
              }

              var offsetTop = $t.offset().top;
              if (offsetTop >= curTop - 10 && offsetTop <= curTop + 10)
                shelf = shelf.not($t);
              else {
                $t.addClass("qd-first-line");
                return false;
              }
            });

            if (shelf.length) setFirst();
          };
          setFirst();
        };
        exec();

        // Olhando para o Smart Research
        if (!window.qd_shelf_line_fix_) {
          $(window).on("QuatroDigital.sr_shelfCallback", exec);
          window.qd_shelf_line_fix_ = true;
        }
        // Olhando tbm para o Infinity Scroll
        if (!window.qd_shelf_line_fix_is) {
          $(window).on("QuatroDigital.is_Callback", exec);
          window.qd_shelf_line_fix_is = true;
        }

        // Olhando para o evento window resize
        var resize = $._data(window).events.resize;
        var allowResize = true;
        if (resize)
          for (var i = 0; i < resize.length; i++) {
            if (resize[i].namespace == "qd") {
              allowResize = false;
              break;
            }
          }
        if (allowResize) {
          var timeOut = 0;
          $(window).on("resize.qd", function () {
            clearTimeout(timeOut);
            timeOut = setTimeout(function () {
              $(".qd-first-line").removeClass(".qd-first-line");
              exec();
            }, 20);
          });
        }
      } catch (e) {
        typeof console !== "undefined" &&
          typeof console.error === "function" &&
          console.error("Problemas :( . Detalhes: " + e.message);
      }
    },
    hideExtendedMenu: function () {
      var ref = $(".bt-refinar");
      ref.prev().hide();
      ref.html("<span>Aplicar Filtros</span>");

      function applyButton(elem) {
        elem.removeClass("even");
        elem.addClass("showHide");
        var className = elem.attr("class");
        elem.after("<button class='" + className + "'>Mostrar Mais</button>");
      }

      $(".mz-search-navigation ul").each(function () {
        var height = $(this).height();
        var maxSize = 180;
        if (height == maxSize && $(this).hasClass("showHide") == false) {
          applyButton($(this));
        }
      });

      $(".search-multiple-navigator fieldset div").each(function () {
        var maxSize = 6;
        var children = $(this)[0].childNodes.length;
        if (children > maxSize && $(this).hasClass("showHide") == false) {
          applyButton($(this));
        }
      });

      $("button.showHide").click(function () {
        $(this).prev().toggleClass("openclose");
        $(this).toggleClass("openclose");
        if (this.innerHTML === "Mostrar Menos") {
          this.innerHTML = "Mostrar Mais";
          var top = this.offsetTop - 300;
          document.querySelector(".mz-search-navigation").scroll({
            top: top,
            left: 0,
            behavior: "smooth",
          });
        } else {
          this.innerHTML = "Mostrar Menos";
        }
      });
      $(".search-multiple-navigator").fadeIn();
    },
    removeSizeQtt: function () {
      $("ul.TAMANHO li a:not(.mz-viewMoreMenu2)").each(function () {
        var cleanText = $(this).text().split(" ")[0];
        $(this).text(cleanText);
      });

      $("h5.TAMANHO + ul, h5.HideTAMANHO + ul").show();
    },
    checkURLtoFindOrder: function () {
      if (window.location.search.indexOf("OrderByReleaseDateDESC") != -1) {
        $(".dropdown-menu a.lancamentos:not(.active)").addClass("active");
      } else if (window.location.search.indexOf("OrderByTopSaleDESC") != -1) {
        $("a.maisvendidos:not(.active)").addClass("active");
      } else if (window.location.search.indexOf("OrderByPriceASC") != -1) {
        $("a.menorpreco:not(.active)").addClass("active");
      } else if (window.location.search.indexOf("OrderByPriceDESC") != -1) {
        $("a.maiorpreco:not(.active)").addClass("active");
      }
    },
    /*  applyActionBotaoComprarShelf: function () {
             var el = $(
                 '.mz-search-table__item .add > a.fake-button:not(.mz-custom-action-apply)',
             );

             // console.log(el)
             if (!el.length) {
                 setTimeout(function () {
                     Search.applyActionBotaoComprarShelf();
                 }, 1000);
                 return;
             }

             Common.setActionAddToCart(el, true, true);
         }, */

    ajustSearchTerms: function () {
      if ($("body").is(".categoria")) {
        $(".mz-result__label span.label").text(" resultados para a categoria");
      } else if ($("body").is(".departamento")) {
        $(".mz-result__label span.label").text(
          " resultados para o departamento"
        );
      }
      if ($(".resultado-busca-numero").length) {
        // number
        var num = document.createTextNode(
          $(".resultado-busca-numero")[0].innerText.substring(21) || "0"
        );

        $(num).appendTo(".mz-result__label span:first");
        //term
        if ($(".resultado-busca-termo .value")[0].innerText) {
          var ter = document.createTextNode(
            ' "' + $(".resultado-busca-termo .value")[0].innerText + '".' || " "
          );
          $(ter).appendTo(".mz-result__label span:last");
        } else {
          $(".mz-result__label span.label").append(".");
        }
      }
    },
    infinityScroll: function () {
      $(".prateleira[id*=ResultItems]").QD_infinityScroll({
        callback: function () {
          // CustomSearch.shelfVariations();
          Common.realQuantity();
          // Common.applyInventoryShelf();
          Common.nameBreaklinePipe();
          //Search.applyActionBotaoComprarShelf();
          CustomSearch.customSmartQuantity(
            $(".mz-search-result .mz-search-table__item:not(.customSmartQtd)")
          );
        },
      });
    },
    scrollToTop: function () {
      window.addEventListener("scroll", function () {
        if (window.scrollY != 0) {
          $("#returnToTop").fadeIn();
        } else {
          $("#returnToTop").fadeOut();
        }
      });
    },
    addListheader: function () {
      var target = $(".resultItemsWrapper div:first");
      if (!target.length) return;
      var button = $(".mz-search-table__top");
      button.insertBefore(target);
    },
    addFilterByButton: function () {
      var target = $(".dropdown");

      if (!target.length) return;

      var button = $(
        '<button class="btnFilterBy" id="filter">Filtrar<i class="icon-chevron-down"></i></button>'
      );
      button.insertBefore(target);
    },
    openSearchNavigation: function () {
      $(".btnFilterBy").click(function () {
        $(document.body).toggleClass("mz-sn-on");
        Search.hideExtendedMenu();
      });
    },
    topMenu: function () {
      if (!$(".mz-search__top-menu div").is(":empty")) {
        $(".mz-search__top-menu").addClass("has-item");
      }

      var currentPath = window.location;

      $('.mz-search__top-menu a[href="' + currentPath + '"]').addClass(
        "active"
      );
    },
    selectEdit: function () {
      $("body").click(function (e) {
        if (e.target.id == "dropdownMenuButton") {
          $(".dropdown-menu").fadeToggle();
        } else {
          $(".dropdown-menu").fadeOut();
        }
      });
      $(".resultado-busca-filtro").remove();
    },
    quickViewOpenModal: function () {
      var modal = $(".mz-modal-quickview");
      $(".mz-quickview-open").on("click", function () {
        $("body").toggleClass("modalquickview");
        var productId = this.id;
        var iframe = $(
          '<iframe src="/id-produto?idproduto=' +
            productId +
            '" frameborder="0"></iframe>'
        );
        modal.find(".modal-body").empty().append(iframe);
      });
      $(".mz-modal-quickview").click(function () {
        $("body").removeClass("modalquickview");
      });
    },

    alternativePrices: function (el) {
      (el || $("li[layout]"))
        .not(".qd-alt-on")
        .each(function () {
          $(this)
            .find(".shelf-qd-v1-alternative-prices")
            .filter(function (i, el) {
              el = $(el);

              var match = el
                .find("li")
                .text()
                .match(/\d+,\d+/g);
              for (var i = 0, item; (item = (match || [])[i]); i++) {
                if (parseFloat(item.replace(",", ".")) == 0) return false;
              }

              return el.text().trim().length;
            })
            .show()
            .html(function (i, html) {
              return html.replace(/(R\$ \d+,\d+)/g, "<strong>$1</strong>");
            })
            .siblings()
            .hide();
        })
        .addClass("qd-alt-on");
    },
    forceImageZoom: function () {
      try {
        var orig = window.ImageControl;

        window.ImageControl = function (par1, par2) {
          $("ul.thumbs a").each(function () {
            var $t = $(this);

            if ($t.attr("zoom")) return;

            $t.attr(
              "zoom",
              $t.attr("rel").replace(/(ids\/[0-9]+)[0-9-]+/i, "$1-1000-1000")
            );
          });

          orig.call(this, par1, par2);
        };
      } catch (e) {
        typeof console !== "undefined" &&
          typeof console.error === "function" &&
          console.error(
            "Ops, algo saiu errado como zoom :( . Detalhes: " + e.message
          );
      }
    },
    hidePageFilter: function () {
      var shelf = $(".prateleira .mz-shelf").length;
      var buttons = $(".btnFilterBy , .dropdown");
      var emptyButtons = $(".mz-result__label ,.btnFilterBy , .dropdown");
      if (shelf == 1 && buttons.length) {
        buttons.hide();
      }
      if (shelf == 0 && emptyButtons.length) {
        emptyButtons.hide();
      }
    },
  };

  /* CUSTOM SEARCH */
  var CustomSearch = {
    loadingBuscaPorCodigo: false,
    buscaPorCodigo: false,

    init: function () {
      CustomSearch.loadQuickViewModal();
      CustomSearch.eventWishlistButton();
      CustomSearch.applySlideToggle();
      CustomSearch.searchItem();
      CustomSearch.updateCart();
      CustomSearch.initSearchCode();

      vtexjs.checkout.getOrderForm().done(function () {
        CustomSearch.initAfterOrderForm();
      });
    },

    windowOnload: function () {},

    ajaxStop: function () {
      CustomSearch.ajustQVSuggestion();
      CustomSearch.customSmartQuantity();
    },

    initAfterOrderForm: function () {},

    initSearchCode: function () {
      CustomSearch.verifyTypeSearch(function (res) {
        if (res) {
          if (window.innerWidth <= 1600) {
            $("body").addClass("mz-sidebar-off");
          }

          /** Caso seja uma busca por código */
          var item = $($(".prateleira .mz-search-table__item")[0]);
          var itemID = item.find(".mz-shelf__id").val();

          item.append($('<div class="mz-product-data-code"></div>'));

          CustomSearch.getProduct(itemID, "productId", function (res_product) {
            var brandName = res_product[0].brand;
            var brandImageUrl =
              res_product[0].brandImageUrl ||
              "https://centerparts.vteximg.com.br/arquivos/brand_placeholder.png";

            var tagImg =
              '<div class="mz-product-data-code-img ' +
              brandName +
              '"><img class="variacao-img-name"  src="' +
              brandImageUrl +
              '" alt="' +
              brandName +
              '"/></div>';

            console.log("TESTEBRAND", brandName);
            //aqui parece ok
            var inventory = "";
            var maxValue =
              res_product[0].items[0].sellers[0].commertialOffer
                .AvailableQuantity;
            if (maxValue) {
              inventory =
                '<p class="mz-qtd">Estoque: <span class="mz-qtd-value">' +
                (maxValue || "0") +
                "</span></p>";
              item.find(".qd-sq-quantity").on("change", function () {
                var inputVal = Number($(this).val());
                // var params = new URLSearchParams(hrefButtonBuy);
                // var qtd = params.get("qty");
                var parent = $(this).closest(".mz-shelf,.quickview-right");
                var btn = parent.find(
                  ".mz-buy-button a,.wrapper-buy-button-asynchronous .add a"
                );
                var href = btn.attr("href");
                href = href.replace(/qty=[0-9]*/g, "qty=" + inputVal);
                btn.attr("href", href);
                if (inputVal >= maxValue) {
                  $(this).val(maxValue);
                  $(this)
                    .closest(".mz-smart-quantity__action")
                    .find(".qd-sq-more")
                    .addClass("lock");
                  href = href.replace(/qty=[0-9]*/g, "qty=" + inputVal);
                  btn.attr("href", href);
                } else {
                  $(this)
                    .closest(".mz-smart-quantity__action")
                    .find(".qd-sq-more")
                    .removeClass("lock");
                }
              });
            } else {
              item.find(".mz-smart-quantity").remove();
              inventory = '<p class="mz-qtd">Indisponível</p>';
            }

            item.find(".mz-shelf__price").append(inventory);

            $(".mz-product-data-code").append($(tagImg));
            $(".mz-product-data-code").append(
              item.find(".mz-search-table__price")
            );
            $(".mz-product-data-code").append(item.find(".mz-shelf__price"));
            $(".mz-product-data-code").append(
              item.find(".mz-search-table__buy")
            );
            $(".mz-product-data-code").append(
              item.find(".mz-search-table__view-fav")
            );

            CustomSearch.getForSimilarProducts(
              itemID,
              function (res_similares) {
                $(".mz-smart-quantity__action .shelf-qd-v1-qty input").val(1);

                Common.setActionAddToCart(
                  $(".mz-product-data-code .add > a.fake-button"),
                  true,
                  true
                );

                var html = "";

                if (res_similares.length) {
                  var similares = res_similares;

                  // html += "<div class='variacoes-container'>";

                  // CustomSearch.generateHtmlSimilares(similares, 0, html, function (html) {
                  //     $(html).insertAfter(item);
                  // })
                  CustomSearch.generateHtmlSimilares2(res_similares).then(
                    function (html) {
                      $(html).insertAfter(item);
                    }
                  );
                }
                CustomSearch.generateHtmlSugestao(itemID, function () {
                  CustomSearch.loadInventoryShelfSuggestions();
                  CustomSearch.eventWishlistButton();
                  CustomSearch.smartQuantity();
                  CustomSearch.customSmartQuantity();
                  CustomSearch.quickViewOpenModal();
                });
                // }
              }
            );
          });
        }
      });
    },

    verifyTypeSearch: function (callback_verifyTypeSearch) {
      /** Verifica é uma página de busca */
      if ($("body").hasClass("resultado-busca")) {
        /** Verifica se a busca é por código */
        var busca = location.pathname.split("/")[1].replace(/\./g, "");
        if (busca.length >= 6) {
          if (Number.isInteger(busca * 1)) {
            $("body").addClass("resultado-busca-codigo");
            callback_verifyTypeSearch(true);
          } else {
            callback_verifyTypeSearch(false);
          }
        } else {
          callback_verifyTypeSearch(false);
        }
      }
    },

    generateHtmlSugestao: function (product_id, callback_generateHtmlSugestao) {
      $.ajax({ url: "/id-produto?idproduto=" + product_id }).done(function (
        res
      ) {
        var prateleiraSugestao =
          '<div class="mz-quickview__sugestions">' +
          $(res).find(".mz-quickview__sugestions").html() +
          "</div>";

        if (!$(".mz-product-quick-view").length)
          $(prateleiraSugestao).insertAfter(
            $(".mz-search-result .prateleira .prateleira")
          );
        else $(prateleiraSugestao).insertAfter($(".mz-product-quick-view"));

        setTimeout(function () {
          Common.nameBreaklinePipe();
          Common.smartQuantityShelf();
          callback_generateHtmlSugestao();
          CustomSearch.quickViewOpenModal();
        }, 1000);
      });
    },

    getForSimilarProducts: function (
      product_id,
      callback_getForSimilarProducts
    ) {
      var url =
        "/api/catalog_system/pub/products/crossselling/similars/" +
        product_id.split("&")[0] +
        "?" +
        $.cookie("VTEXSC");

      $.ajax({
        url: url,
        type: "GET",
        method: "GET",
        dataType: "json",
        headers: {
          Accept: "application/vnd.vtex.ds.v10+json",
          "Content-Type": "application/json; charset=utf-8",
        },
      }).done(function (res_similares) {
        callback_getForSimilarProducts(res_similares);
      });
    },

    getProduct: function (product_id, key, callback_getProduct) {
      $.ajax({
        url:
          "/api/catalog_system/pub/products/search?fq=" +
          key +
          ":" +
          product_id,
        type: "GET",
        method: "GET",
        dataType: "json",
        headers: {
          Accept: "application/vnd.vtex.ds.v10+json",
          "Content-Type": "application/json; charset=utf-8",
        },
      }).done(function (res_similares) {
        callback_getProduct(res_similares);
      });
    },

    loadInventoryShelfSuggestions: function () {
      // console.log(1)
      if (!$(".mz-quickview__sugestions").length) return;
      // console.log(2)
      if (!$(".mz-quickview__sugestions ul").length) return;
      // console.log(3)
      $(".mz-quickview__sugestions .prateleira > ul").each(function (i, e) {
        var ID = $(e).find("> li .mz-shelf__id").val();

        CustomSearch.getProduct(ID, "productId", function (res) {
          //esse está correto
          var inventory = "";
          var avQuantity =
            res[0].items[0].sellers[0].commertialOffer.AvailableQuantity;
          if (avQuantity) {
            inventory =
              '<p class="mz-qtd">Estoque: <span class="mz-qtd-value">' +
              (res[0].items[0].sellers[0].commertialOffer.AvailableQuantity ||
                "0") +
              "</span></p>";

            $(e)
              .find(">li .qd-sq-quantity")
              .off("change")
              .on("change", function () {
                var inputVal = Number($(this).val());
                var maxValue = avQuantity;
                // var params = new URLSearchParams(hrefButtonBuy);
                // var qtd = params.get("qty");
                var parent = $(this).closest(".mz-shelf,.quickview-right");
                var btn = parent.find(
                  ".mz-buy-button a,.wrapper-buy-button-asynchronous .add a"
                );
                var href = btn.attr("href");
                href = href.replace(/qty=[0-9]*/g, "qty=" + inputVal);
                btn.attr("href", href);
                if (inputVal >= maxValue) {
                  $(this).val(maxValue);
                  $(this)
                    .closest(".mz-smart-quantity__action")
                    .find(".qd-sq-more")
                    .addClass("lock");
                  href = href.replace(/qty=[0-9]*/g, "qty=" + inputVal);
                  btn.attr("href", href);
                } else {
                  $(this)
                    .closest(".mz-smart-quantity__action")
                    .find(".qd-sq-more")
                    .removeClass("lock");
                }
              });
          } else {
            inventory = '<p class="mz-qtd">Indisponível</p>';
          }

          $(e).find("> li .shelf-price").append(inventory);
        });
      });
    },

    ajustQVSuggestion: function () {
      $(".mz-search-table__view-Qv").insertBefore(
        $(".mz-search-table__view-Qv")
          .parents(".mz-shelf-quickview")
          .find(">.row .mz-quickview__sugestions")
      );
    },

    quickViewOpenModal: function () {
      var modal = $(".mz-modal-quickview");
      $(".mz-quickview-open:not(.modal-binded)")
        .addClass("modal-binded")
        .off("click")
        .on("click", function () {
          $("body").addClass("modalquickview");

          var productId = $(this).attr("id");
          var iframe = $(
            '<iframe src="/product-details?idproduto=' +
              productId +
              '" frameborder="0"></iframe>'
          );

          modal.find(".modal-body").empty().append(iframe);

          setTimeout(function () {
            var html = $(".productName").html();
            if (html) {
              html = html.replace("||", "|").replace(/\|/g, "<br />");
              $(".productName").html(html);
            }
          }, 1000);
        });
      $(".mz-modal-quickview")
        .off("click")
        .on("click", function () {
          $("body").removeClass("modalquickview");
        });
    },

    updateCart: function () {
      $(window).on("cartProductAdded.vtex", function () {
        $.fn.simpleCart(true, undefined, false);
      });
    },

    loadQuickViewModal: function () {
      if (!$("body").hasClass("mz-quick-view")) return;

      var itemID = location.search.replace("?", "").split("=")[1];
      CustomSearch.getProduct(itemID, "productId", function (res_product) {
        var brandName = res_product[0].brand.toLowerCase().replace(/ /g, "-");

        // Substitui a lógica de criação da URL manual pela URL direta da imagem da marca
        var brandImageUrl =
          res_product[0].brandImageUrl ||
          "https://centerparts.vteximg.com.br/arquivos/brand_placeholder.png";

        // Cria o HTML da tag de imagem com a URL correta
        var tagImg =
          '<img class="variacao-img-name" src="' +
          brandImageUrl +
          '" alt="' +
          res_product[0].brand +
          '" onerror="this.onerror=null;this.src=\'https://centerparts.vteximg.com.br/arquivos/brand_placeholder.png\'"/>';

        // Adiciona a classe com o nome da marca
        $(".mz-product-data-code .mz-product-data-code-img").addClass(
          brandName
        );

        // Insere a tag da imagem no elemento HTML
        $(".mz-product-data-code .mz-product-data-code-img").html(tagImg);

        var nameSku = res_product[0].items[0].name;
        var tagNameSku = '<div class="product-insertsku">' + nameSku + "</div>";
        $(tagNameSku).insertBefore($(".mz-product-data-code .plugin-preco"));

        var inventory =
          res_product[0].items[0].sellers[0].commertialOffer
            .AvailableQuantity || "0";
        var tagInventory =
          '<p class="mz-qtd">Estoque: <span class="mz-qtd-value">' +
          inventory +
          "</span></p>";
        $(tagInventory).insertAfter($(".mz-product-data-code .plugin-preco"));

        $(".productName").html(
          $(".productName").html().replace("||", "|").replace(/\|/g, "<br />")
        );
        $(".buy-in-page-button").attr(
          "id",
          "idprod" + res_product[0].productId
        );
        $(".qd-sq-quantity").val(1);

        CustomSearch.getForSimilarProducts(itemID, function (res_similares) {
          Common.setActionAddToCart(
            $(
              ".mz-product-quick-view .mz-product-data-code .mz-search-table__buy .buy-in-page-button"
            ),
            true
          );
          var html = "";

          if (res_similares.length) {
            var similares = res_similares;

            // html += "<div class='variacoes-container'>";

            CustomSearch.generateHtmlSimilares2(similares).then(function (
              html
            ) {
              $(html).insertAfter(
                $(".mz-product-quick-view .mz-search-table__item")
              );
            });

            // CustomSearch.generateHtmlSimilares(similares, 0, html, function (html) {
            //     $(html).insertAfter($('.mz-product-quick-view .mz-search-table__item'));
            // })
          }

          CustomSearch.generateHtmlSugestao(itemID, function () {
            CustomSearch.loadInventoryShelfSuggestions();
            CustomSearch.eventWishlistButton();
            CustomSearch.smartQuantity();
            CustomSearch.customSmartQuantity();
            Common.smartCart();

            setTimeout(function () {
              $("body").removeClass("loadingData");
            }, 1000);
          });
        });
      });
    },

    generateHtmlSimilares2: function (similares) {
      //n tem promise :(
      var def = $.Deferred();

      var html = "<div class='variacoes-container'>";

      var queryString = similares.map(function (item) {
        return "fq=productId:" + item.productId;
      });

      CustomSearch.getMultipleProducts(queryString.join("&")).then(function (
        resp
      ) {
        resp.map(function (item) {
          var productId = item.productId;
          var inventory =
            item.items[0].sellers[0].commertialOffer.AvailableQuantity || 0;
          var sku = item.items[0];

          if (inventory) {
            var brandName = item.brand.toLowerCase().replace(/ /g, "-");

            var brandImageUrl =
              item.brandImageUrl ||
              "https://centerparts.vteximg.com.br/arquivos/brand_placeholder.png";

            var tagImg =
              '<div class="variacao-img ' +
              brandName +
              '"><img class="variacao-img-name"  src="' +
              brandImageUrl +
              '" alt="' +
              item.brand +
              '" onerror="this.onerror=null;this.src=\'https://centerparts.vteximg.com.br/arquivos/brand_placeholder.png\'"/></div>';

            var price = sku.sellers[0].commertialOffer.ListPrice || "0";
            var name = sku.name;
            var addToCartLink = sku.sellers[0].addToCartLink || "";

            var tagData =
              '<div class="variacao-data"><div class="variacao-data-name">' +
              name +
              '</div><div class="variacao-data-price">R$ ' +
              qd_number_format(price, 2, ",", ".") +
              '</div><div class="variacao-data-inventory">Estoque: <span class="mz-qtd-value">' +
              inventory +
              "</span></div></div>";

            var smartQuantity =
              '<div class="mz-smart-quantity"><div class="col-12 mz-smart-quantity__action"><a class="qd-sq-minus"><i class="icon-minus"></i></a><div class="shelf-qd-v1-qty"><input type="tel" class="qd-sq-quantity form-control" value="1" /></div><a class="qd-sq-more"><i class="icon-plus"></i></a></div></div>';
            var buyButton =
              '<a href="' +
              addToCartLink +
              '" class="btn-add-buy-button-asynchronous" id="idprod' +
              productId +
              '">Comprar</a>';

            var tagBuy =
              '<div class="variacao-buy">' +
              smartQuantity +
              buyButton +
              "</div>";

            var tagFav =
              '<div class="mz-search-table__view-fav d-flex">\
                                    <div class="mz-quickview-open" id="' +
              productId +
              '">\
                                        <i class="icon-eye" title="Saiba mais"></i>\
                                    </div>\
                                    <div class="mz-giftlist-button">\
                                        <div class="qd-sss-wishlist-button qd-sss-on">\
                                        <a href="#" title="Adicionar a lista de compras" class=""><i class="icon-Ativo-122"></i></a>\
                                        </div>\
                                    </div>\
                                </div>';

            html +=
              '<div class="variacao">' +
              tagImg +
              tagData +
              tagBuy +
              tagFav +
              "</div>";
          }
        });

        html += "</div>";
        def.resolve(html);
      });

      return def;
    },
    getMultipleProducts: function (queryString) {
      return $.ajax({
        url: "/api/catalog_system/pub/products/search?" + queryString,
        type: "GET",
        method: "GET",
        dataType: "json",
        headers: {
          Accept: "application/vnd.vtex.ds.v10+json",
          "Content-Type": "application/json; charset=utf-8",
        },
      });
    },
    eventWishlistButton: function () {
      //evitando evento duplicado com off
      $(".mz-search-table__item  .mz-giftlist-button")
        .off("click")
        .on("click", function () {
          var _this = $(this);
          _this.trigger(".qd-sss-wishlist-button  selectSku.qd_click");
          $(".glis-popup-link.glis-thickbox.tb-added.qvBinded").click();
          //resetando
          $(".mz-shelf__price input.insert-sku-checkbox:checked").each(
            function (index, checkbox) {
              var $checkbox = $(checkbox);
              $checkbox.trigger("click");
              if (window.onInsertSkuCheckBoxClick) {
                window.onInsertSkuCheckBoxClick(this);
              }
            }
          );

          var parent = _this.closest(".mz-shelf-regular");

          var checkbox = parent.find(
            ".mz-shelf__price input.insert-sku-checkbox"
          );
          var prop = checkbox.prop("checked");
          if (prop == false) {
            checkbox.attr("checked", "checked");
            checkbox.trigger("click");
          }
        });
    },
    genHexString: function (len) {
      var hex = "0123456789abcdef";
      var output = "";
      for (var i = 0; i < len; ++i) {
        output += hex.charAt(Math.floor(Math.random() * hex.length));
      }
      return output;
    },

    smartQuantity: function () {
      // $(".mz-search-table__item:not(qd-on)").addClass('qd-on').QD_smartQuantity({
      //   buyButton: ".btn-add-buy-button-asynchronous",
      //   setQuantityByUrl: true
      // });
      // $(".variacao:not(qd-on)").addClass('qd-on').QD_smartQuantity({
      //   buyButton: ".btn-add-buy-button-asynchronous",
      //   setQuantityByUrl: true
      // });
    },

    customSmartQuantity: function () {
      var containerQTD = $.merge(
        $(".variacao:not(.customSmartQtd)"),
        $(".mz-product-quick-view .mz-search-table__item:not(.customSmartQtd)")
      );

      containerQTD.addClass("customSmartQtd");

      containerQTD.each(function (i, e) {
        var input = $(e).find(".mz-smart-quantity__action").find("input");

        var comprar = $(e).find("div.variacao-buy > a");

        if ($(e).find("a.buy-in-page-button").length) {
          comprar = $(e).find("a.buy-in-page-button");
          comprar.off();
        }

        $(e)
          .find("a.qd-sq-minus")
          .on("click", function () {
            var val = input.val() * 1;

            if (val > 1) {
              input.val(val - 1);
              comprar.attr(
                "href",
                comprar
                  .attr("href")
                  .replace(
                    "qty=" +
                      comprar.attr("href").split("qty=")[1].split("&")[0] +
                      "&",
                    "qty=" + (val - 1) + "&"
                  )
              );
            }
          });

        $(e)
          .find("a.qd-sq-more")
          .on("click", function () {
            var val = input.val() * 1;
            var limit = $(e).find(".mz-qtd-value").html() * 1;

            if (val + 1 <= limit) {
              input.val(val + 1);
            }

            comprar.attr(
              "href",
              comprar
                .attr("href")
                .replace(
                  "qty=" +
                    comprar.attr("href").split("qty=")[1].split("&")[0] +
                    "&",
                  "qty=" + (val + 1) + "&"
                )
            );
          });

        input.on("change", function () {
          var limit = $(e).find(".mz-qtd-value").html() * 1;
          var val = $(this).val() * 1;

          if (val > limit) {
            $(this).val(limit);
          }
        });

        Common.setActionAddToCart(comprar, true);
      });
    },
    applySlideToggle: function () {
      $(".mz-search__customsearch h4").on("click", function () {
        $(".mz-search__customsearch h4").toggleClass("open");
        $(".mz-search__customsearch h4 span").fadeToggle();
        $(this)
          .parent()
          .parent()
          .find(".busca,.mz-search__customsearch--input")
          .fadeToggle();
      });
    },
    searchItem: function () {
      var inputSearch = $(".mz-search__customsearch--input input.form-control");
      // inputSearch.mask('00000.00');
      var regex = /(?=[0-9_.])/gm;
      inputSearch.on("keyup", function (e) {
        var ind = inputSearch.val().length - 1;
        if (!regex.test(inputSearch.val()[ind])) {
          var string = inputSearch.val().substring(0, ind);
          inputSearch.attr("value", string);
        }
        if (e.key === "Enter") {
          window.location.href = "/" + inputSearch.val();
        }
      });
      $("#mz-custom-search--button").on("click", function () {
        if (inputSearch.val() == "") {
          alert("Você não pesquisou nenhum dado especifico.");
          return;
        }

        var url = window.location.origin;
        window.location.href = window.location.origin + "/" + inputSearch.val();
      });
    },
  };

  /* PRODUCT */
  var Product = {
    run: function () {},
    init: function () {
      // Product.setAvailableBodyClass();
      Product.infoTabs();
      Product.fixSkuInfo();
      Product.applyWishlist();
      Product.productThumbCarousel();
      Product.checkDescription();
      Product.checkSpecification();
      Product.openShipping();
      Product.smartQuantityTip();
      Product.scrollToDescription();
      Product.scrollToBuyButton();
      Product.expandsDescription();
      Product.accessoriesFix();
      Product.accessoriesApplyCarousel();
      Product.specialBanner();
      Product.virtualFitting();
      Product.smartSkuColor();
      Product.shipping();
      Product.contactForm();
      Product.uniqueBuyButton();
      Product.productListCallBuyButton();
      // Product.skuSum();
      Product.autoFillNotifyme();
      // Product.descriptionVideo();

      // Product.qdClickTableMeasures();
      Common.defaultCarroseulShelf();
      Product.productListSkuQuantity();
    },
    ajaxStop: function () {
      Product.dynamicDiscountFlag();
      Common.defaultCarroseulShelf();
    },
    windowOnload: function () {
      Product.favProduct();
      Product.selectSku();
      Product.fixProductName();
    },
    fixProductName: function () {
      var str = skuJson.name;
      // var str = $('.productName').text();
      while (str.indexOf("|") >= 0) {
        var newStr = str.replace("|", "</p><p>");
        str = newStr;
        $(".productName").html("<p>" + str + "</p>");
      }
      var str = $(".productName").html();

      $(".mz-product__name h1").prepend(
        '<div class="product-name">' + str + "</div>"
      );
    },
    // setAvailableBodyClass: function () {
    //   function checkVisibleNotify(available) {
    //     if (available)
    //       $(document.body).addClass('qd-product-available').removeClass('qd-product-unavailable');
    //     else
    //       $(document.body).addClass('qd-product-unavailable').removeClass('qd-product-available');
    //   }

    //   $(document).on("skuSelected.vtex", function (e, id, sku) {
    //     checkVisibleNotify(sku.available);
    //   });

    //   checkVisibleNotify(skuJson.available);
    // },
    dynamicDiscountFlag: function () {
      $(".dynamic-discount-flag").remove();

      var $de = $(".skuListPrice").first().text();
      var $por = $(".skuBestPrice").first().text();
      var $porcentagemFinal;
      var $boxDynamicDiscountFlag = $(
        '<div class="dynamic-discount-flag"></div>'
      );
      var $highlightDiscount = $(
        '<span class="product-highlight-discount"></span>'
      );
      var $novoDe = $('<span class="produto-novo-de"></span>');
      var $productPrice = $(".productPrice").first();

      $boxDynamicDiscountFlag.appendTo($productPrice);
      $novoDe.appendTo($boxDynamicDiscountFlag);
      $highlightDiscount.appendTo($boxDynamicDiscountFlag);

      //---------REGEX PARA RETIRAR OS R$ DOS VALORES DE POR
      $de = $de.replace(/[R$ ]+/g, "");
      $de = $de.replace(/[,]+/g, ".");
      $de = parseFloat($de);

      $por = $por.replace(/[R$ ]+/g, "");
      $por = $por.replace(/[,]+/g, ".");
      $por = parseFloat($por);

      // console.log('POR: '+ $por);

      //---------REGEX PARA RETIRAR OS R$ DOS VALORES DE POR

      $porcentagemFinal = 100 - ($por * 100) / $de;
      // console.log('porcentagem: '+ parseInt($porcentagemFinal));

      $(".produto-novo-de").text($(".skuListPrice").first().text());
      $(".product-highlight-discount").text(
        "" + Math.floor($porcentagemFinal) + "% OFF"
      );
    },

    applyWishlist: function () {
      $(
        ".mz-product__content , .product-sku-rich-selection  .skuList"
      ).QD_smartShootingStar({
        isProductPage: true,
        list: Common.showWishesNumber,
      });
    },
    productThumbCarousel: function () {
      var initialSku = (location.search.match(/idsku=([0-9]+)/i) || [""]).pop();

      // Verifica qual é o primeiro sku e coloca na variável initialSku para ser utilizada no plugin QD_smartPhotoCarousel
      if (!initialSku) {
        var color = $("li.item-dimension-Cor input[data-value]")
          .first()
          .attr("data-value");
        for (var k = 0; k < skuJson.skus.length; k++) {
          if (
            color == skuJson.skus[k].dimensions.COR &&
            skuJson.skus[k].available
          ) {
            initialSku = skuJson.skus[k].sku;
            break;
          }
        }
      }
      $(".mz-product__content").QD_smartPhotoCarousel(
        {
          imageWrapper: ".mz-product-image",
          thumbsWrapper: ".mz-product__thumbs",
          sizes: {
            thumb: "107-139",
            image: "672-841",
            imagezoom: "1000-1260",
          },
          slickOptions: {
            images: {
              lazyLoad: "ondemand",
              infinite: true,
              arrows: true,
            },
            thumbs: {
              vertical: true,
              slidesToShow: 6,
              slidesToScroll: 1,
              infinite: true,
              arrows: true,
              focusOnSelect: true,
              responsive: [
                {
                  breakpoint: 991,
                  settings: {
                    vertical: false,
                    slidesToShow: 5,
                    slidesToScroll: 1,
                    arrows: false,
                  },
                },
              ],
            },
          },
        },
        initialSku
      ); // Pega sku da url se houver [Cores Prateleira]

      var initialColor = "";
      for (var j = 0; j < skuJson.skus.length; j++) {
        if (skuJson.skus[j].sku == initialSku) {
          initialColor = skuJson.skus[j].dimensions.COR;
          break;
        }
      }

      if (initialColor)
        $(
          'li.item-dimension-Cor input[data-value="' + initialColor + '"]'
        ).click();
      else $("li.item-dimension-Cor input[data-value]").first().click();
    },
    checkDescription: function () {
      var wrapper = $(".mz-product-description");

      if (wrapper.find(".productDescription").text().trim().length <= 0) {
        $(".mz-product__description-link").addClass("d-none");
      }
    },
    checkSpecification: function () {
      var wrapper = $(".mz-product__specification");

      if (wrapper.find("#caracteristicas > *").text().trim().length <= 0) {
        wrapper.addClass("hidden");
      }
    },
    shipping: function () {
      setTimeout(function () {
        // Calcular o valor do frete e verificar disponibilidade:
        $("#btnFreteSimulacao").before($("#txtCep"));
      }, 500);
      // console.log("test", $(".mz-product__sku--ship"));
    },
    openShipping: function () {
      if (typeof window.ShippingValue === "function") window.ShippingValue();
    },
    smartQuantityTip: function () {
      $(window).on("QuatroDigital.sq_change", function (e, qtyWrapper) {
        var value = ("0" + $(qtyWrapper).val()).slice(-2);
        var wrapper = $(qtyWrapper)
          .closest(".MZstorefront")
          .find(".qd-cart-quantity-items");
        wrapper.text(value);
      });
    },
    scrollToDescription: function () {
      $(".product-mz-v1-link-description").click(function (e) {
        e.preventDefault();

        $("html, body")
          .stop()
          .animate(
            {
              scrollTop: $(".product-mz-v1-description").offset().top - 100,
            },
            900,
            "swing"
          );
      });
    },
    scrollToBuyButton: function () {
      $(".mz-product-fixed-bar__buy, .mz-product-fixed-bar__price").click(
        function (e) {
          e.preventDefault();

          $("html, body")
            .stop()
            .animate(
              {
                scrollTop: $("#mz-product__information").offset().top - 75,
              },
              900,
              "swing"
            );
        }
      );
    },
    fixSkuInfo: function () {
      var sku_rich_selection = $(".mz-sku-rich-selection");

      if (!sku_rich_selection.length) return;

      var measure_guide = sku_rich_selection
        .find(".mz-sku-rich-selection__measure-guide")
        .detach();
      // var fitting_room = sku_rich_selection.find('.mz-sku-rich-selection__fitting-room').detach();

      measure_guide.insertAfter($('li.specification:contains("TAMANHO")'));
      // $('mz-sku-rich-selection').append(fitting_room);
      // $('li.specification').append(measure_guide);
    },
    expandsDescription: function () {
      $(".mz-product__description-link a").on("click", function (e) {
        e.preventDefault();
        $(this).parent().toggleClass("active");
        $(".mz-product-description").stop().slideToggle();
      });
    },
    accessoriesFix: function () {
      $("fieldset >.buy-product-checkbox")
        .parent()
        .each(function () {
          var $t = $(this);
          $t.add($t.prev("ul")).wrapAll(
            '<div class="accessories-qd-v1-item"/>'
          );
        });
    },
    accessoriesApplyCarousel: function () {
      var item = $(".accessories-qd-v1-item");

      if (!item.length) return;

      item.wrapAll('<div class="accessories-qd-v1-carousel"></div>');

      var wrapper = $(".accessories-qd-v1-carousel");

      wrapper.slick({
        prevArrow:
          '<button type="button" class="slick-prev"><i class="fa fa-angle-left" aria-hidden="true"></i></button>',
        nextArrow:
          '<button type="button" class="slick-next"><i class="fa fa-angle-right" aria-hidden="true"></i></button>',
        arrows: true,
        autoplay: false,
        dots: false,
        slidesToShow: 4,
        slidesToScroll: 4,
        infinite: true,
        draggable: false,
        // centerMode: true,
        responsive: [
          {
            breakpoint: 991,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
            },
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
            },
          },
        ],
      });
    },
    specialBanner: function () {
      var container = $(".mz-special-banner__container");
      var viewMore = $(".mz-special-banner__view-more a");

      var maxHeight = 95;

      if (container.find(".mz-special-banner__content").height() < maxHeight) {
        container.removeClass("collapsed").addClass("non-collapsed");
        return;
      }

      var viewMoreText = viewMore.text();

      viewMore.on("click", function () {
        container.toggleClass("collapsed");

        var toogleText = container.hasClass("collapsed")
          ? viewMoreText
          : "Ver Menos";

        $(this).text(toogleText);
      });
    },
    infoTabs: function () {
      var currentPage = window.location.href;
      var tabsLink = $(".mz-tabs__link");

      var productField = $("#caracteristicas .value-field.Tipo-de-Grade");

      if (!productField.length) return;

      var currentTab = $(
        '<ul><li><div class="mz-tabs__item"><a href="' +
          currentPage +
          '" class="mz-tabs__link"><ul><li>' +
          productField.text() +
          "</li></ul></a></div></li></ul>"
      );

      currentTab.addClass("active");

      $(".shelf-tabs h2").after(currentTab);

      if (!tabsLink.length) return;

      if (tabsLink.closest("ul").length <= 1) return;

      tabsLink.each(function (index, tabLink) {
        if (tabLink.href === currentPage) {
          $(tabLink).closest("ul").addClass("active");
        }
      });
    },
    virtualFitting: function () {
      $(".mz-sku-rich-selection__measure-guide a").on("click", function () {
        $(document.body).addClass("mz-fitting-on");
      });
    },
    smartSkuColor: function () {
      if ($(".mz-colors").is(":empty")) return;

      var thumbCopy = $(".mz-product-image img").first().clone();
      var skuName = $(".productName");
      var skuLink = window.location.href;

      var currentSkuColor = $(
        '<ul><li><div class="mz-colors__item"><a href="' +
          skuLink +
          '" class="mz-colors__link"><img src="' +
          thumbCopy.attr("src") +
          '" width="48" height="60" alt="' +
          skuName.text() +
          '"></a></div></li></ul>'
      );
      currentSkuColor.addClass("active");

      $(".shelf-colors h2").after(currentSkuColor);
    },
    productListSkuQuantity: function () {
      var htmlSkuQuantity =
        '<div class="amount product-sku-single-wrapper "> <div class="qd-smart-quantity"> <a href="#" class="qd-add-btn qd-sq-minus qd-sq-inactive"> <i class="icon-minus"></i> </a> <input type="tel" class="form-control input-type-text qd-sq-quantity" /> <a href="#" class="qd-add-btn qd-sq-more"> <i class="icon-plus"></i> </a> </div> </div>';

      var options = {
        buyButton: ".buy-button",
        qttInput: ".qd-sq-quantity",
        btnMore: ".qd-sq-more",
        btnMinus: ".qd-sq-minus",
        initialValue: 0,
      };

      $(".form-control.input-type-text.qd-sq-quantity.qd-sq-on").mask(
        "000000000000000000000"
      );

      var skuWrapper = $(".product-sku-rich-selection .skuList");

      skuWrapper.find(".nomeSku").after(htmlSkuQuantity);
      // skuWrapper.append(htmlSkuQuantityMbl);
      skuWrapper.addClass("qd-smart-quantity-on").QD_smartQuantity(options);

      $(".product-sku-rich-selection").QD_smartSkuTotalizer(options);

      $(".qd-smart-quantity-on").each(function () {
        $t = $(this);

        $t.find(".preco").after('<div class="qd-buy"></div>');
        $(".qd-buy:not('.qd-on')")
          .addClass("qd-on")
          .append($t.find(".buy-button"));
      });

      skuWrapper.each(function () {
        var self = $(this);
        // var selfName = $(this).find('.nomeSku')[0].innerText;
        var selfName = skuJson.name;
        skuJson.skus.forEach(function (item) {
          var skuName = item.skuname;
          var skuId = item.sku;
          if (selfName == skuName) {
            $.ajax({
              type: "GET",
              method: "GET",
              url: "/api/catalog_system/pub/products/search?fq=skuId:" + skuId, // pode se com qualquer um dos seguintesskuJson.skus[0].sku ||  skuJson.productId
              dataType: "json",
              headers: {
                Accept: "application/vnd.vtex.ds.v10+json",
                "Content-Type": "application/json; charset=utf-8",
              },
            }).done(function (data) {
              var availableQuantity =
                data[0].items[0].sellers[0].commertialOffer.AvailableQuantity;
              self
                .find(".product-sku-single-wrapper")
                .append(
                  "<div clas='qtt-es'>Estoque: " + availableQuantity + "</div>"
                );
              self.find("input").attr("max", availableQuantity);
            });
          }
        });
        if ($(this).text().indexOf("Avise-Me") != -1) {
          this.querySelector(".qd-smart-quantity").remove();
        }
      });

      var input = $(".product-sku-single-wrapper input");
      input.each(function () {
        $(this).on("change", function () {
          var max = Number($(this).attr("max"));

          if (Number($(this).val()) >= max) {
            $(this).val(max);
            $(this).parent().find(".qd-sq-more").attr("disabled", "disabled");
            $(this).parent().addClass("lock");
            $(this).trigger("QuatroDigital.sq_change");
          } else {
            $(this).parent().removeClass("lock");
          }
        });
      });
    },

    contactForm: function () {
      if (!$(document.body).is(".produto")) return;

      var form = $(".mz-product__email form");
      form.find("#qd_form_phone").mask("(00) 0000-00009");

      form.validate({
        rules: { email: { email: true } },
        submitHandler: function (form) {
          var $form = $(form);

          if (!$form.valid()) return;

          // Enviando os dados para o CRM
          (function () {
            // Adicionando classe de carregando
            var submitWrapper = $form
              .find("[type=submit]")
              .parent()
              .addClass("qd-loading");

            // Obtendo o e-mail
            var email = $form.find("#qd_form_email").val() || "";
            if (!email.length) return alert("Preencha seu e-mail");

            var saveContact = function (userId) {
              var phone = ($form.find("#qd_form_phone").val() || "").replace(
                /[^0-9]+/gi,
                ""
              );
              phone = phone.length ? "+55" + phone : null;

              $.ajax({
                url: "//api.ipify.org?format=jsonp",
                dataType: "jsonp",
                success: function (data) {
                  sendData(data.ip);
                },
                error: function () {
                  $.ajax({
                    url: "//www.telize.com/jsonip",
                    dataType: "jsonp",
                    success: function (data) {
                      sendData(data.ip);
                    },
                    error: function (data) {
                      sendData(null);
                    },
                  });
                },
              });

              var sendData = function (ip) {
                $.ajax({
                  url: "/api/dataentities/FP/documents",
                  type: "POST",
                  dataType: "json",
                  headers: {
                    Accept: "application/vnd.vtex.ds.v10+json",
                    "Content-Type": "application/json; charset=utf-8",
                  },
                  data: JSON.stringify({
                    ip: ip,
                    userId: userId,
                    phone: phone,
                    email: email,
                    productId:
                      !!skuJson && skuJson.name ? skuJson.productId : "",
                    productName: !!skuJson && skuJson.name ? skuJson.name : "",
                    productUrl: window.location.href,
                    fullName: $form.find("#qd_form_name").val() || null,
                    message: ($form.find("#qd_form_msg").val() || "").replace(
                      /(?:\r\n|\r|\n)/g,
                      "<br />"
                    ),
                    subject: "Contato na Página de Produto",
                  }),
                  success: function (data) {
                    $form.find(".form-succes").removeClass("d-none");
                  },
                  error: function () {
                    alert("Desculpe, não foi possível enviar seu formulário!");
                  },
                  complete: function () {
                    submitWrapper.removeClass("qd-loading");
                  },
                });
              };
            };
            $.ajax({
              url: "/api/dataentities/CL/search?_fields=id&email=" + email,
              dataType: "json",
              headers: {
                Accept: "application/vnd.vtex.ds.v10+json",
              },
              success: function (data) {
                if (data.length) saveContact(data[0].id);
                else saveContact(null);
              },
              error: function () {
                saveContact(null);
                if (
                  typeof console == "object" &&
                  typeof console.warn == "function"
                )
                  console.warn(
                    "Houve um erro ao tentar buscar os dados do usuário na entidade CL"
                  );
              },
            });
          })();

          return false;
        },
        errorPlacement: function (error, element) {},
      });
    },
    uniqueBuyButton: function () {
      var wrapper = $(".product-sku-info-wrapper");
      wrapper.find(".qd-ssg-buy-button").click(function () {
        var input = wrapper.find(".qd-sq-quantity");
        var hasQty = false;
        input.each(function () {
          if (($(this).val() || 0) > 0) {
            hasQty = true;
            return false;
          }
        });
        if (!hasQty) alert("Por favor, insira as quantidades desejadas");
        else
          wrapper.find(".skuList .buy-button").each(function () {
            $(this).click();
          });
      });
    },
    productListCallBuyButton: function () {
      $(".qd_cart_auto").QD_buyButton({
        buyButton: ".product-sku-rich-selection .skuList .buy-button",
      });
    },
    // skuSum: function () {
    //   $(".product-sku-info-wrapper").click(function () {
    //     var inputs = $(".qd-sq-quantity");
    //     var prices = $(".valor-por strong");
    //     var total = 0;
    //     for (i = 0; i < inputs.length; i++) {
    //       var inp = parseInt(inputs[i].value);
    //       var pri = parseFloat(prices[i].innerHTML.substring(2).replace(",", "."));
    //       total = total + (inp * pri);
    //     }
    //     document.querySelector(".qd-selected-sku-total").innerHTML = ("R$ " + total.toFixed(2)).replace(".", ",");
    //   }
    //   );
    // },
    productListSetUnavailable: function () {
      $(".skuList .notifyme-skuid").each(function () {
        var $t = $(this);
        var skuId = ($t.val() || "") + "";

        if (skuId.length && skuJson) {
          for (var i = 0; i < skuJson.skus.length; i++) {
            if (skuJson.skus[i].sku == skuId && !skuJson.skus[i].available) {
              $t.getParent(".skuList").addClass("qd-sku-unavailable");
            }
          }
        }
      });
    },
    autoFillNotifyme: function () {
      $(".notifyme-title-div").click(function () {
        var name = $(".mz-fill-username")[0].innerText;
        var email = $("#res")[0].innerText.match(
          /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi
        );
        document.querySelector(".notifyme-client-email").value = email;
        $(this).next("form").find(".sku-notifyme-client-name").val(name);
        $(this).next("form").find(".notifyme-client-email").val(email);
        $(this).next("form").find("#notifymeButtonOK").click();
        $(this).find("h3").addClass("done");
      });
    },
    selectSku: function () {
      var wrapper = $(".skuList");

      wrapper.on("selectSku.qd_click", function () {
        try {
          var $t = $(this);

          var buyButton = $t.find(".buy-button");
          if (buyButton.length)
            var skuId = buyButton.attr("href").match(/sku\=([0-9]+)/i)[1];
          else var skuId = $t.find(".sku-notifyme-skuid").val();

          var selectedSku;
          for (var i = 0; i < skuJson.skus.length; i++) {
            if (skuJson.skus[i].sku == skuId) {
              selectedSku = skuJson.skus[i];
              break;
            }
          }
          if (selectedSku)
            $(document).trigger("skuSelected.vtex", [skuId, selectedSku]);

          wrapper.removeClass(
            "qd-sku-list-selected qd-sku-list-selected-by-click"
          );
          $t.addClass("qd-sku-list-selected");

          // Adicionando as flags de promoções por SKU
        } catch (e) {
          if (
            typeof console !== "undefined" &&
            typeof console.info === "function"
          )
            console.info("Problemas ao selecionar o SKU", e.message);
        }
      });

      wrapper.click(function () {
        var $t = $(this);
        $t.trigger("selectSku.qd_click");
        $t.addClass("qd-sku-list-selected-by-click");
      });
      $(".mz-wishlist-button").click(function () {
        $(".glis-popup-link.glis-thickbox.tb-added.qvBinded").click();
      });
    },
    favProduct: function () {
      var wrapper = $(".product-sku-rich-selection .skuList");
      wrapper.each(function () {
        var star =
          '        <div class="mz-wishlist-button"><div class=""><div class="qd-sss-wishlist-filled "> <i class="icon-Ativo-122"></i></div></div></div>      ';
        // para mostrar o sku descomente a linha abaixo
        // $(this).find('.preco').after(sku.match(regex));
        $(this).find(".preco").after(star);
      });
    },
  };

  /* LIST */
  var List = {
    run: function () {},
    init: function () {
      List.checkTermAgreement();
    },
    ajaxStop: function () {},
    windowOnload: function () {
      List.checkTermAgreement();
    },
    checkTermAgreement: function () {
      if ($("body").is(".giftlist-create")) {
        //CHECA O CHECKBOX ASSIM Q A PAGINA DE CRIAR LISTA É CARREGADA
        setTimeout($("#giftlistaccept").attr("checked", "checked"), 1500);
      }
    },
  };
  /* INSTITUCIONAL */
  var Institutional = {
    init: function () {
      Institutional.sidemenuToggle();
      Institutional.collapseFAQ();
      Institutional.contactForm();
      Institutional.openVideoModal();
    },
    ajaxStop: function () {},
    windowOnload: function () {},

    sidemenuToggle: function () {
      $(".mz-institucional__navigation--menu-mobile").click(function (ev) {
        ev.preventDefault();
        $(document.body).addClass("mz-sn-on");
      });
      $(".mz-institucional__navigation--close").click(function () {
        $(document.body).removeClass("mz-sn-on");
      });
    },
    collapseFAQ: function () {
      if (window.location.pathname.indexOf("duvidas-frequentes") != -1) {
        var title = $(".institucionalContent h3");
        title.each(function () {
          $(this).append(
            "<i class='icon-chevron-right'></i><i class='icon-chevron-down d-none'></i>"
          );
          $(this).click(function () {
            $(this).find("i").toggleClass("d-none");
            $(this).nextUntil(title).toggle("fast");
          });
        });
      }
    },
    contactForm: function () {
      // if(!$(document.body).is(".atendimento"))
      // return;

      var form = $(".form-contact-wrapper form");
      form.find("#qd_form_phone").mask("(00) 0000-00009");
      form.find("#qd_form_cnpj").mask("99.999.999/9999-99");

      //fix select
      var select = form.find(".form-control");
      if (select.length) {
        select.find("option").each(function () {
          if (this.innerHTML == "Selecione") {
            $(this).attr("value", "");
          } else {
            $(this).attr("value", this.innerHTML);
          }
        });
      }

      form.validate({
        messages: {
          "E-mail": "Preencha o campo email",
          cnpj: "Preencha o campo CNPJ",
          Nome: "Preencha com seu nome completo",
          Telefone: "Preencha com seu telefone",
          Assunto: "Escolha um assunto",
          Mensagem: "Escreva uma mensagem",
        },
        rules: { email: { email: true } },
        submitHandler: function (form) {
          var $form = $(form);

          if (!$form.valid()) return;

          // Enviando os dados para o CRM
          (function () {
            // Adicionando classe de carregando
            var submitWrapper = $form
              .find("[type=submit]")
              .parent()
              .addClass("qd-loading");

            // Obtendo o e-mail
            var email = $form.find("#qd_form_email").val() || "";
            if (!email.length) return alert("Preencha seu e-mail");

            var saveContact = function () {
              var phone = ($form.find("#qd_form_phone").val() || "").replace(
                /[^0-9]+/gi,
                ""
              );
              phone = phone.length ? "+55" + phone : null;

              $.ajax({
                url: "//api.ipify.org?format=jsonp",
                dataType: "jsonp",
                success: function (data) {
                  sendData(data.ip);
                },
                error: function () {
                  $.ajax({
                    url: "//www.telize.com/jsonip",
                    dataType: "jsonp",
                    success: function (data) {
                      sendData(data.ip);
                    },
                    error: function (data) {
                      sendData(null);
                    },
                  });
                },
              });

              var sendData = function (ip) {
                $.ajax({
                  url: "/api/dataentities/AT/documents?an=centerparts",
                  type: "POST",
                  dataType: "json",
                  headers: {
                    Accept: "application/vnd.vtex.ds.v10+json",
                    "Content-Type": "application/json; charset=utf-8",
                  },
                  data: JSON.stringify({
                    ip: ip,
                    phone: phone,
                    email: email,
                    fullName: $form.find("#qd_form_name").val() || null,
                    message: ($form.find("#qd_form_msg").val() || "").replace(
                      /(?:\r\n|\r|\n)/g,
                      "<br />"
                    ),
                    cnpj: $form.find("#qd_form_cnpj").val() || null,
                    subject: $form.find("#qd_form_subject").val() || null,
                  }),
                  success: function (data) {
                    $form.find(".form-succes").removeClass("d-none");
                  },
                  error: function () {
                    alert("Desculpe, não foi possível enviar seu formulário!");
                  },
                  complete: function () {
                    submitWrapper.removeClass("qd-loading");
                    alert("Mensagem enviada com sucesso!");
                    $(
                      ".form-contact-wrapper input,.form-contact-wrapper textarea,.form-contact-wrapper select"
                    ).val("");
                  },
                });
              };
            };
            saveContact();
          })();

          return false;
        },
        // errorPlacement: function (error, element) { }
      });
    },
    openVideoModal: function () {
      $(".qdSideMenu .box-banner a").click(function (e) {
        e.preventDefault();
        var productField = $(this).attr("href");
        var url = productField.replace(/\;\s*/, ";").split(";");
        var modal =
          '<div class="mz-institucional__video"><div class="mz-institucional__video-cadastro">' +
          '<iframe src="http://www.youtube.com/embed/' +
          url[0].split("v=").pop().split(/[&#]/).shift() +
          '?wmode=transparent&rel=0&enablejsapi=1" frameborder="0" allowfullscreen></iframe>' +
          "</div>";
        $("body").append(modal);
        $("body").addClass("modalScroll");
        close();
      });
      var close = function () {
        if ($(".mz-institucional__video").length) {
          $(".mz-institucional__video").click(function () {
            $(this).remove();
            $("body").removeClass("modalScroll");
          });
        }
      };
    },
  };

  /* ORDERS */
  var Orders = {
    init: function () {
      Orders.bootstrapCssFix();
    },
    ajaxStop: function () {},
    windowOnload: function () {},
    bootstrapCssFix: function () {
      var styleSheets = document.styleSheets;
      for (var i = 0; i < styleSheets.length; i++) {
        if (
          (styleSheets[i].href || "").indexOf(
            "io.vtex.com.br/front-libs/bootstrap/2.3.2/css/bootstrap.min.css"
          ) > -1 ||
          (styleSheets[i].href || "").indexOf(
            "io.vtex.com.br/front-libs/bootstrap/2.3.2/css/bootstrap-responsive.min.css"
          ) > -1
        ) {
          styleSheets[i].disabled = true;
        }
      }
    },
  };
  /* ACCOUNT */
  var Account = {
    init: function () {
      Account.bootstrapCssFix();
      Account.applyWishlist();
    },
    ajaxStop: function () {},
    windowOnload: function () {},
    bootstrapCssFix: function () {
      var styleSheets = document.styleSheets;
      for (var i = 0; i < styleSheets.length; i++) {
        if (
          (styleSheets[i].href || "").indexOf(
            "io.vtex.com.br/front-libs/bootstrap/2.3.2/css/bootstrap.min.css"
          ) > -1 ||
          (styleSheets[i].href || "").indexOf(
            "io.vtex.com.br/front-libs/bootstrap/2.3.2/css/bootstrap-responsive.min.css"
          ) > -1
        ) {
          styleSheets[i].disabled = true;
        }
      }
    },
    applyWishlist: function () {
      $(window).on("hashchange", displayWishlist);
      displayWishlist();

      function displayWishlist() {
        if (window.location.href.indexOf("wishlist") > -1) {
          $(".mz-account-IO").hide();
          $(".mz-wishlist").closest(".container").show();
          $(".orders-qd-page-tabs a").removeClass("active");
          $('.orders-qd-page-tabs a[href="#/wishlist"]').addClass("active");
          Wishlist.getWishlist();
        } else {
          $(".mz-wishlist").closest(".container").hide();
          $(".mz-account-IO").show();
          $(".orders-qd-page-tabs a").removeClass("active");
          $('.orders-qd-page-tabs a[href="#/orders"]').addClass("active");
        }
      }
    },
  };

  /* Infinity scroll */
  /**
   * Infinity Scroll
   * @author Carlos Vinicius [Quatro Digital]
   * @version 3.14
   * @license MIT
   */

  var loadingHtml =
    '<div class="container mz-search-loader "><i class="icon-spinner mx-auto"></i><p class="mx-auto">Carregando mais itens. Por favor, aguarde.</p></div>';

  "function" !== typeof String.prototype.trim &&
    (String.prototype.trim = function () {
      return this.replace(/^\s+|\s+$/g, "");
    });
  (function (c) {
    "function" !== typeof c.fn.QD_infinityScroll &&
      ((window._QuatroDigital_InfinityScroll =
        window._QuatroDigital_InfinityScroll || {}),
      (c.fn.QD_infinityScroll = function (f) {
        var a = window._QuatroDigital_InfinityScroll,
          e = function (a, c) {
            if (
              "object" === typeof console &&
              "undefined" !== typeof console.error &&
              "undefined" !== typeof console.info &&
              "undefined" !== typeof console.warn
            ) {
              var b;
              "object" === typeof a
                ? (a.unshift("[Infinity Scroll]\n"), (b = a))
                : (b = ["[Infinity Scroll]\n" + a]);
              if (
                "undefined" === typeof c ||
                ("alerta" !== c.toLowerCase() && "aviso" !== c.toLowerCase())
              )
                if ("undefined" !== typeof c && "info" === c.toLowerCase())
                  try {
                    console.info.apply(console, b);
                  } catch (d) {
                    try {
                      console.info(b.join("\n"));
                    } catch (e) {}
                  }
                else
                  try {
                    console.error.apply(console, b);
                  } catch (d) {
                    try {
                      console.error(b.join("\n"));
                    } catch (e) {}
                  }
              else
                try {
                  console.warn.apply(console, b);
                } catch (d) {
                  try {
                    console.warn(b.join("\n"));
                  } catch (e) {}
                }
            }
          },
          p = {
            lastShelf: ">div:last",
            elemLoading:
              '\x3c!-- Infinity Scroll - Loading message --\x3e<div id="scrollLoading" class="qd-is-loading">' +
              loadingHtml +
              " </div>",
            searchUrl: null,
            returnToTop: c(
              '<div id="returnToTop" class="qd-is-return-top"><a href="#"><span class="text">Voltar ao</span><span class="text2">TOPO</span><span class="arrowToTop"></span></a></div>'
            ),
            scrollBy: document,
            callback: function () {},
            getShelfHeight: function (a) {
              return a.scrollTop() + a.height();
            },
            paginate: null,
            insertContent: function (a, b) {
              a.after(b);
            },
            authorizeScroll: function () {
              return !0;
            },
          },
          d = jQuery.extend({}, p, f),
          b = jQuery(this);
        jQuery("");
        if (1 > b.length) return b;
        1 < b.length &&
          (e(
            "Identifiquei que a seletor informado (" +
              b.selector +
              ") retornou " +
              b.length +
              " elementos.\n Para solucionar o problema estou selecionando autom\u00e1ticamente o primeiro com o id: #" +
              (b.filter("[id^=ResultItems]:first").attr("id") || "!Not Found"),
            "Aviso"
          ),
          (b = b.filter("[id^=ResultItems]:first")));
        b.filter("[id^=ResultItems]").length ||
          e(
            [
              "Certifique-se que esta selecionando o elemento correto.\n O plugin espera que o elemento seja o que cont\u00e9m o id: #" +
                (c("div[id^=ResultItems]").attr("id") || "!Not Found"),
              c("div[id^=ResultItems]"),
            ],
            "Info"
          );
        b.parent().filter("[id^=ResultItems]").length &&
          ((b = b.parent()),
          e(
            [
              "Identifiquei que o seletor pai do elemento que voc\u00ea informou \u00e9 o #" +
                (jQuery("div[id^=ResultItems]").attr("id") || "!Not Found") +
                ".\n Como forma de corrigir esse problema de sele\u00e7\u00e3o de elemento, assumirei a prateleira correta.",
              b,
            ],
            "Aviso"
          ));
        c("body").append(d.returnToTop);
        var g = c(window),
          q = c(document),
          m = c(d.scrollBy),
          n = c(d.elemLoading);
        a.toTopE = c(d.returnToTop);
        a.moreResults = !0;
        a.currentPage = 2;
        var r = function () {
          var a,
            b = /\/buscapagina\?.+&PageNumber=/i,
            d = /\/paginaprateleira\?.+PageNumber=/i;
          c("script:not([src])").each(function () {
            var c = this.innerHTML;
            if (-1 < c.indexOf("buscapagina")) return (a = b.exec(c)), !1;
            if (-1 < c.indexOf("paginaprateleira")) return (a = d.exec(c)), !1;
          });
          if ("object" === typeof a && "undefined" !== typeof a[0])
            return a[0].replace("paginaprateleira", "buscapagina");
          e(
            "N\u00e3o foi poss\u00edvel localizar a url de busca da p\u00e1gina.\n Tente adicionar o .js ao final da p\u00e1gina. \n[M\u00e9todo: getSearchUrl]"
          );
          return "";
        };
        (function () {
          var c = g.height();
          g.bind("resize.QD_infinityScroll", function () {
            c = g.height();
          });
          var b = 0;
          m.bind("scroll.QD_infinityScroll", function () {
            clearTimeout(b);
            b = setTimeout(function () {
              q.scrollTop() > c
                ? document.body.getAttribute("data-qd-infinity-scroll") ||
                  document.body.setAttribute("data-qd-infinity-scroll", 1)
                : document.body.getAttribute("data-qd-infinity-scroll") &&
                  document.body.removeAttribute("data-qd-infinity-scroll");
            }, 20);
          });
          a.buttonToTop = a.toTopE
            .find("a")
            .bind("click.QD_infinityScroll", function () {
              jQuery("html,body").animate({ scrollTop: 0 }, "slow");
              return !1;
            });
        })();
        (function () {
          a.searchUrl = null !== d.searchUrl ? d.searchUrl : r();
          a.currentStatus = !0;
          var f = c(".pager[id*=PagerTop]:first").attr("id") || "";
          if (
            "" !== f &&
            ((a.pages = window["pagecount_" + f.split("_").pop()]),
            "undefined" === typeof a.pages)
          )
            for (var h in window)
              if (/pagecount_[0-9]+/.test(h)) {
                a.pages = window[h];
                break;
              }
          "undefined" === typeof a.pages && (a.pages = 9999999999999);
          var k = function () {
            if (a.currentStatus) {
              var f = b.find(d.lastShelf);
              if (1 > f.length)
                return (
                  e(
                    "\u00daltima Prateleira/Vitrine n\u00e3o encontrada \n (" +
                      f.selector +
                      ")"
                  ),
                  !1
                );
              f.after(n);
              a.currentStatus = !1;
              var g = a.currentPage;
              c.ajax({
                url: a.searchUrl.replace(
                  /pagenumber\=[0-9]*/i,
                  "PageNumber=" + a.currentPage
                ),
                dataType: "html",
                success: function (b) {
                  1 > b.trim().length
                    ? ((a.moreResults = !1),
                      e(
                        "N\u00e3o existem mais resultados a partir da p\u00e1gina: " +
                          g,
                        "Aviso"
                      ),
                      c(window).trigger("QuatroDigital.is_noMoreResults"))
                    : d.insertContent(f, b);
                  a.currentStatus = !0;
                  n.remove();
                },
                error: function () {
                  e(
                    "Houve um erro na requisi\u00e7\u00e3o Ajax de uma nova p\u00e1gina."
                  );
                },
                complete: function (a, b) {
                  d.callback();
                  c(window).trigger("QuatroDigital.is_Callback");
                },
              });
              a.currentPage++;
            }
          };
          if ("function" === typeof d.paginate)
            d.paginate(function () {
              return a.currentPage <= a.pages && a.moreResults ? (k(), !0) : !1;
            });
          else {
            var l = 0;
            m.bind("scroll.QD_infinityScroll_paginate", function () {
              clearTimeout(l);
              l = setTimeout(function () {
                a.currentPage <= a.pages &&
                  a.moreResults &&
                  d.authorizeScroll() &&
                  g.scrollTop() + g.height() >= d.getShelfHeight(b) &&
                  k();
              }, 70);
            });
          }
        })();
        return b;
      }),
      c(document).ajaxSend(function (c, a, e) {
        -1 < e.url.indexOf("PageNumber") &&
          0 < e.url.search(/PageNumber\=[^0-9]+/) &&
          a.abort();
      }),
      (window.goToTopPage = function () {}),
      c(function () {
        window.goToTopPage = function () {};
      }));
  })(jQuery);
} catch (e) {
  typeof console !== "undefined" &&
    typeof console.error === "function" &&
    console.error("Houve um erro nos objetos. Detalhes: " + e.message);
}

try {
  (function () {
    var body, ajaxStop, windowLoad;

    windowLoad = function () {
      Common.windowOnload();
      CustomSearch.windowOnload();
      if (body.is(".home")) Home.windowOnload();
      else if (body.is(".resultado-busca, .departamento, .categoria"))
        Search.windowOnload();
      else if (body.is(".produto")) Product.windowOnload();
      else if (
        body.is(
          ".listas, .giftlist,.giftlist-home,.giftlist-shelf,.giftlist-manage,.giftlist-create"
        )
      )
        List.windowOnload();
      else if (body.is(".institucional")) Institutional.windowOnload();
    };

    ajaxStop = function () {
      Common.ajaxStop();
      CustomSearch.ajaxStop();
      if (body.is(".home")) Home.ajaxStop();
      else if (body.is(".resultado-busca, .departamento, .categoria"))
        Search.ajaxStop();
      else if (body.is(".produto")) Product.ajaxStop();
      else if (
        body.is(
          ".listas, .giftlist,.giftlist-home,.giftlist-shelf,.giftlist-manage,.giftlist-create"
        )
      )
        List.ajaxStop();
      else if (body.is(".institucional")) Institutional.ajaxStop();
      else if (body.is(".account, .orders")) Account.ajaxStop();
    };

    $(function () {
      Common.init();
      CustomSearch.init();

      body = $(document.body);

      if (body.is(".home")) Home.init();
      else if (body.is(".resultado-busca, .departamento, .categoria")) {
        Search.isSearch = $(document.body).is(".resultado-busca");
        Search.isDepartament = $(document.body).is(".departamento");
        Search.isCategory = $(document.body).is(".categoria");
        Search.init();
      } else if (body.is(".produto")) Product.init();
      else if (
        body.is(
          ".listas, .giftlist,.giftlist-home,.giftlist-shelf,.giftlist-manage,.giftlist-create"
        )
      )
        List.init();
      else if (body.is(".institucional")) Institutional.init();
      else if (body.is(".account, .orders")) Account.init();

      $(document).ajaxStop(ajaxStop);
      $(window).load(windowLoad);
      body.addClass("jsFullLoaded");
      Common.ready();
    });

    Common.run();
    if (
      location.pathname.substr(location.pathname.length - 2, 2).toLowerCase() ==
      "/p"
    )
      Product.run();
    else if (location.pathname.search(/^(\/giftlist|\/list\/)/) == 0)
      List.run();
  })();
} catch (e) {
  typeof console !== "undefined" &&
    typeof console.error === "function" &&
    $("body").addClass("jsFullLoaded jsFullLoadedError") &&
    console.error(
      "Houve um erro ao iniciar os objetos. Detalhes: " + e.message
    );
}

// jQuery Mask Plugin v1.6.5
// github.com/igorescobar/jQuery-Mask-Plugin
(function (g) {
  "function" === typeof define && define.amd
    ? define(["jquery"], g)
    : g(window.jQuery || window.Zepto);
})(function (g) {
  var z = function (b, f, d) {
    var l = this,
      x,
      y;
    b = g(b);
    f = "function" === typeof f ? f(b.val(), void 0, b, d) : f;
    l.init = function () {
      d = d || {};
      l.byPassKeys = [9, 16, 17, 18, 36, 37, 38, 39, 40, 91];
      l.translation = {
        0: { pattern: /\d/ },
        9: { pattern: /\d/, optional: !0 },
        "#": { pattern: /\d/, recursive: !0 },
        A: { pattern: /[a-zA-Z0-9]/ },
        S: { pattern: /[a-zA-Z]/ },
      };
      l.translation = g.extend({}, l.translation, d.translation);
      l = g.extend(!0, {}, l, d);
      y = c.getRegexMask();
      b.each(function () {
        !1 !== d.maxlength && b.attr("maxlength", f.length);
        d.placeholder && b.attr("placeholder", d.placeholder);
        b.attr("autocomplete", "off");
        c.destroyEvents();
        c.events();
        var a = c.getCaret();
        c.val(c.getMasked());
        c.setCaret(a + c.getMaskCharactersBeforeCount(a, !0));
      });
    };
    var c = {
      getCaret: function () {
        var a;
        a = 0;
        var e = b.get(0),
          c = document.selection,
          e = e.selectionStart;
        if (c && !~navigator.appVersion.indexOf("MSIE 10"))
          (a = c.createRange()),
            a.moveStart(
              "character",
              b.is("input") ? -b.val().length : -b.text().length
            ),
            (a = a.text.length);
        else if (e || "0" === e) a = e;
        return a;
      },
      setCaret: function (a) {
        if (b.is(":focus")) {
          var e;
          e = b.get(0);
          e.setSelectionRange
            ? e.setSelectionRange(a, a)
            : e.createTextRange &&
              ((e = e.createTextRange()),
              e.collapse(!0),
              e.moveEnd("character", a),
              e.moveStart("character", a),
              e.select());
        }
      },
      events: function () {
        b.on("keydown.mask", function () {
          x = c.val();
        });
        b.on("keyup.mask", c.behaviour);
        b.on("paste.mask drop.mask", function () {
          setTimeout(function () {
            b.keydown().keyup();
          }, 100);
        });
        b.on("change.mask", function () {
          b.data("changeCalled", !0);
        });
        b.on("blur.mask", function (a) {
          a = g(a.target);
          a.prop("defaultValue") !== a.val() &&
            (a.prop("defaultValue", a.val()),
            a.data("changeCalled") || a.trigger("change"));
          a.data("changeCalled", !1);
        });
        b.on("focusout.mask", function () {
          d.clearIfNotMatch && !y.test(c.val()) && c.val("");
        });
      },
      getRegexMask: function () {
        var a = [],
          e,
          b,
          c,
          d,
          k;
        for (k in f)
          (e = l.translation[f[k]])
            ? ((b = e.pattern.toString().replace(/.{1}$|^.{1}/g, "")),
              (c = e.optional),
              (e = e.recursive)
                ? (a.push(f[k]), (d = { digit: f[k], pattern: b }))
                : a.push(c || e ? b + "?" : b))
            : a.push("\\" + f[k]);
        a = a.join("");
        d &&
          (a = a
            .replace(RegExp("(" + d.digit + "(.*" + d.digit + ")?)"), "($1)?")
            .replace(RegExp(d.digit, "g"), d.pattern));
        return RegExp(a);
      },
      destroyEvents: function () {
        b.off(
          "keydown.mask keyup.mask paste.mask drop.mask change.mask blur.mask focusout.mask"
        ).removeData("changeCalled");
      },
      val: function (a) {
        var e = b.is("input");
        return 0 < arguments.length
          ? e
            ? b.val(a)
            : b.text(a)
          : e
          ? b.val()
          : b.text();
      },
      getMaskCharactersBeforeCount: function (a, e) {
        for (var b = 0, c = 0, d = f.length; c < d && c < a; c++)
          l.translation[f.charAt(c)] || ((a = e ? a + 1 : a), b++);
        return b;
      },
      determineCaretPos: function (a, b, d, h) {
        return l.translation[f.charAt(Math.min(a - 1, f.length - 1))]
          ? Math.min(a + d - b - h, d)
          : c.determineCaretPos(a + 1, b, d, h);
      },
      behaviour: function (a) {
        a = a || window.event;
        var b = a.keyCode || a.which;
        if (-1 === g.inArray(b, l.byPassKeys)) {
          var d = c.getCaret(),
            f = c.val(),
            n = f.length,
            k = d < n,
            p = c.getMasked(),
            m = p.length,
            q =
              c.getMaskCharactersBeforeCount(m - 1) -
              c.getMaskCharactersBeforeCount(n - 1);
          p !== f && c.val(p);
          !k ||
            (65 === b && a.ctrlKey) ||
            (8 !== b && 46 !== b && (d = c.determineCaretPos(d, n, m, q)),
            c.setCaret(d));
          return c.callbacks(a);
        }
      },
      getMasked: function (a) {
        var b = [],
          g = c.val(),
          h = 0,
          n = f.length,
          k = 0,
          p = g.length,
          m = 1,
          q = "push",
          s = -1,
          r,
          u;
        d.reverse
          ? ((q = "unshift"),
            (m = -1),
            (r = 0),
            (h = n - 1),
            (k = p - 1),
            (u = function () {
              return -1 < h && -1 < k;
            }))
          : ((r = n - 1),
            (u = function () {
              return h < n && k < p;
            }));
        for (; u(); ) {
          var v = f.charAt(h),
            w = g.charAt(k),
            t = l.translation[v];
          if (t)
            w.match(t.pattern)
              ? (b[q](w),
                t.recursive &&
                  (-1 === s ? (s = h) : h === r && (h = s - m),
                  r === s && (h -= m)),
                (h += m))
              : t.optional && ((h += m), (k -= m)),
              (k += m);
          else {
            if (!a) b[q](v);
            w === v && (k += m);
            h += m;
          }
        }
        a = f.charAt(r);
        n !== p + 1 || l.translation[a] || b.push(a);
        return b.join("");
      },
      callbacks: function (a) {
        var e = c.val(),
          g = c.val() !== x;
        if (!0 === g && "function" === typeof d.onChange)
          d.onChange(e, a, b, d);
        if (!0 === g && "function" === typeof d.onKeyPress)
          d.onKeyPress(e, a, b, d);
        if ("function" === typeof d.onComplete && e.length === f.length)
          d.onComplete(e, a, b, d);
      },
    };
    l.remove = function () {
      var a = c.getCaret(),
        b = c.getMaskCharactersBeforeCount(a);
      c.destroyEvents();
      c.val(l.getCleanVal()).removeAttr("maxlength");
      c.setCaret(a - b);
    };
    l.getCleanVal = function () {
      return c.getMasked(!0);
    };
    l.init();
  };
  g.fn.mask = function (b, f) {
    this.unmask();
    return this.each(function () {
      g(this).data("mask", new z(this, b, f));
    });
  };
  g.fn.unmask = function () {
    return this.each(function () {
      try {
        g(this).data("mask").remove();
      } catch (b) {}
    });
  };
  g.fn.cleanVal = function () {
    return g(this).data("mask").getCleanVal();
  };
  g("*[data-mask]").each(function () {
    var b = g(this),
      f = {};
    "true" === b.attr("data-mask-reverse") && (f.reverse = !0);
    "false" === b.attr("data-mask-maxlength") && (f.maxlength = !1);
    "true" === b.attr("data-mask-clearifnotmatch") && (f.clearIfNotMatch = !0);
    b.mask(b.attr("data-mask"), f);
  });
});

/*! jQuery Validation Plugin - v1.12.0 - 4/1/2014
 * http://jqueryvalidation.org/
 * Copyright (c) 2014 Jörn Zaefferer; Licensed MIT */
!(function (a) {
  a.extend(a.fn, {
    validate: function (b) {
      if (!this.length)
        return void (
          b &&
          b.debug &&
          window.console &&
          console.warn("Nothing selected, can't validate, returning nothing.")
        );
      var c = a.data(this[0], "validator");
      return c
        ? c
        : (this.attr("novalidate", "novalidate"),
          (c = new a.validator(b, this[0])),
          a.data(this[0], "validator", c),
          c.settings.onsubmit &&
            (this.validateDelegate(":submit", "click", function (b) {
              c.settings.submitHandler && (c.submitButton = b.target),
                a(b.target).hasClass("cancel") && (c.cancelSubmit = !0),
                void 0 !== a(b.target).attr("formnovalidate") &&
                  (c.cancelSubmit = !0);
            }),
            this.submit(function (b) {
              function d() {
                var d;
                return c.settings.submitHandler
                  ? (c.submitButton &&
                      (d = a("<input type='hidden'/>")
                        .attr("name", c.submitButton.name)
                        .val(a(c.submitButton).val())
                        .appendTo(c.currentForm)),
                    c.settings.submitHandler.call(c, c.currentForm, b),
                    c.submitButton && d.remove(),
                    !1)
                  : !0;
              }
              return (
                c.settings.debug && b.preventDefault(),
                c.cancelSubmit
                  ? ((c.cancelSubmit = !1), d())
                  : c.form()
                  ? c.pendingRequest
                    ? ((c.formSubmitted = !0), !1)
                    : d()
                  : (c.focusInvalid(), !1)
              );
            })),
          c);
    },
    valid: function () {
      var b, c;
      return (
        a(this[0]).is("form")
          ? (b = this.validate().form())
          : ((b = !0),
            (c = a(this[0].form).validate()),
            this.each(function () {
              b = c.element(this) && b;
            })),
        b
      );
    },
    removeAttrs: function (b) {
      var c = {},
        d = this;
      return (
        a.each(b.split(/\s/), function (a, b) {
          (c[b] = d.attr(b)), d.removeAttr(b);
        }),
        c
      );
    },
    rules: function (b, c) {
      var d,
        e,
        f,
        g,
        h,
        i,
        j = this[0];
      if (b)
        switch (
          ((d = a.data(j.form, "validator").settings),
          (e = d.rules),
          (f = a.validator.staticRules(j)),
          b)
        ) {
          case "add":
            a.extend(f, a.validator.normalizeRule(c)),
              delete f.messages,
              (e[j.name] = f),
              c.messages &&
                (d.messages[j.name] = a.extend(d.messages[j.name], c.messages));
            break;
          case "remove":
            return c
              ? ((i = {}),
                a.each(c.split(/\s/), function (b, c) {
                  (i[c] = f[c]),
                    delete f[c],
                    "required" === c && a(j).removeAttr("aria-required");
                }),
                i)
              : (delete e[j.name], f);
        }
      return (
        (g = a.validator.normalizeRules(
          a.extend(
            {},
            a.validator.classRules(j),
            a.validator.attributeRules(j),
            a.validator.dataRules(j),
            a.validator.staticRules(j)
          ),
          j
        )),
        g.required &&
          ((h = g.required),
          delete g.required,
          (g = a.extend({ required: h }, g)),
          a(j).attr("aria-required", "true")),
        g.remote &&
          ((h = g.remote), delete g.remote, (g = a.extend(g, { remote: h }))),
        g
      );
    },
  }),
    a.extend(a.expr[":"], {
      blank: function (b) {
        return !a.trim("" + a(b).val());
      },
      filled: function (b) {
        return !!a.trim("" + a(b).val());
      },
      unchecked: function (b) {
        return !a(b).prop("checked");
      },
    }),
    (a.validator = function (b, c) {
      (this.settings = a.extend(!0, {}, a.validator.defaults, b)),
        (this.currentForm = c),
        this.init();
    }),
    (a.validator.format = function (b, c) {
      return 1 === arguments.length
        ? function () {
            var c = a.makeArray(arguments);
            return c.unshift(b), a.validator.format.apply(this, c);
          }
        : (arguments.length > 2 &&
            c.constructor !== Array &&
            (c = a.makeArray(arguments).slice(1)),
          c.constructor !== Array && (c = [c]),
          a.each(c, function (a, c) {
            b = b.replace(new RegExp("\\{" + a + "\\}", "g"), function () {
              return c;
            });
          }),
          b);
    }),
    a.extend(a.validator, {
      defaults: {
        messages: {},
        groups: {},
        rules: {},
        errorClass: "error",
        validClass: "valid",
        errorElement: "label",
        focusInvalid: !0,
        errorContainer: a([]),
        errorLabelContainer: a([]),
        onsubmit: !0,
        ignore: ":hidden",
        ignoreTitle: !1,
        onfocusin: function (a) {
          (this.lastActive = a),
            this.settings.focusCleanup &&
              !this.blockFocusCleanup &&
              (this.settings.unhighlight &&
                this.settings.unhighlight.call(
                  this,
                  a,
                  this.settings.errorClass,
                  this.settings.validClass
                ),
              this.addWrapper(this.errorsFor(a)).hide());
        },
        onfocusout: function (a) {
          this.checkable(a) ||
            (!(a.name in this.submitted) && this.optional(a)) ||
            this.element(a);
        },
        onkeyup: function (a, b) {
          (9 !== b.which || "" !== this.elementValue(a)) &&
            (a.name in this.submitted || a === this.lastElement) &&
            this.element(a);
        },
        onclick: function (a) {
          a.name in this.submitted
            ? this.element(a)
            : a.parentNode.name in this.submitted && this.element(a.parentNode);
        },
        highlight: function (b, c, d) {
          "radio" === b.type
            ? this.findByName(b.name).addClass(c).removeClass(d)
            : a(b).addClass(c).removeClass(d);
        },
        unhighlight: function (b, c, d) {
          "radio" === b.type
            ? this.findByName(b.name).removeClass(c).addClass(d)
            : a(b).removeClass(c).addClass(d);
        },
      },
      setDefaults: function (b) {
        a.extend(a.validator.defaults, b);
      },
      messages: {
        required: "This field is required.",
        remote: "Please fix this field.",
        email: "Please enter a valid email address.",
        url: "Please enter a valid URL.",
        date: "Please enter a valid date.",
        dateISO: "Please enter a valid date (ISO).",
        number: "Please enter a valid number.",
        digits: "Please enter only digits.",
        creditcard: "Please enter a valid credit card number.",
        equalTo: "Please enter the same value again.",
        maxlength: a.validator.format(
          "Please enter no more than {0} characters."
        ),
        minlength: a.validator.format("Please enter at least {0} characters."),
        rangelength: a.validator.format(
          "Please enter a value between {0} and {1} characters long."
        ),
        range: a.validator.format("Please enter a value between {0} and {1}."),
        max: a.validator.format(
          "Please enter a value less than or equal to {0}."
        ),
        min: a.validator.format(
          "Please enter a value greater than or equal to {0}."
        ),
      },
      autoCreateRanges: !1,
      prototype: {
        init: function () {
          function b(b) {
            var c = a.data(this[0].form, "validator"),
              d = "on" + b.type.replace(/^validate/, ""),
              e = c.settings;
            e[d] && !this.is(e.ignore) && e[d].call(c, this[0], b);
          }
          (this.labelContainer = a(this.settings.errorLabelContainer)),
            (this.errorContext =
              (this.labelContainer.length && this.labelContainer) ||
              a(this.currentForm)),
            (this.containers = a(this.settings.errorContainer).add(
              this.settings.errorLabelContainer
            )),
            (this.submitted = {}),
            (this.valueCache = {}),
            (this.pendingRequest = 0),
            (this.pending = {}),
            (this.invalid = {}),
            this.reset();
          var c,
            d = (this.groups = {});
          a.each(this.settings.groups, function (b, c) {
            "string" == typeof c && (c = c.split(/\s/)),
              a.each(c, function (a, c) {
                d[c] = b;
              });
          }),
            (c = this.settings.rules),
            a.each(c, function (b, d) {
              c[b] = a.validator.normalizeRule(d);
            }),
            a(this.currentForm)
              .validateDelegate(
                ":text, [type='password'], [type='file'], select, textarea, [type='number'], [type='search'] ,[type='tel'], [type='url'], [type='email'], [type='datetime'], [type='date'], [type='month'], [type='week'], [type='time'], [type='datetime-local'], [type='range'], [type='color'] ",
                "focusin focusout keyup",
                b
              )
              .validateDelegate(
                "[type='radio'], [type='checkbox'], select, option",
                "click",
                b
              ),
            this.settings.invalidHandler &&
              a(this.currentForm).bind(
                "invalid-form.validate",
                this.settings.invalidHandler
              ),
            a(this.currentForm)
              .find("[required], [data-rule-required], .required")
              .attr("aria-required", "true");
        },
        form: function () {
          return (
            this.checkForm(),
            a.extend(this.submitted, this.errorMap),
            (this.invalid = a.extend({}, this.errorMap)),
            this.valid() ||
              a(this.currentForm).triggerHandler("invalid-form", [this]),
            this.showErrors(),
            this.valid()
          );
        },
        checkForm: function () {
          this.prepareForm();
          for (
            var a = 0, b = (this.currentElements = this.elements());
            b[a];
            a++
          )
            this.check(b[a]);
          return this.valid();
        },
        element: function (b) {
          var c = this.clean(b),
            d = this.validationTargetFor(c),
            e = !0;
          return (
            (this.lastElement = d),
            void 0 === d
              ? delete this.invalid[c.name]
              : (this.prepareElement(d),
                (this.currentElements = a(d)),
                (e = this.check(d) !== !1),
                e ? delete this.invalid[d.name] : (this.invalid[d.name] = !0)),
            a(b).attr("aria-invalid", !e),
            this.numberOfInvalids() ||
              (this.toHide = this.toHide.add(this.containers)),
            this.showErrors(),
            e
          );
        },
        showErrors: function (b) {
          if (b) {
            a.extend(this.errorMap, b), (this.errorList = []);
            for (var c in b)
              this.errorList.push({
                message: b[c],
                element: this.findByName(c)[0],
              });
            this.successList = a.grep(this.successList, function (a) {
              return !(a.name in b);
            });
          }
          this.settings.showErrors
            ? this.settings.showErrors.call(this, this.errorMap, this.errorList)
            : this.defaultShowErrors();
        },
        resetForm: function () {
          a.fn.resetForm && a(this.currentForm).resetForm(),
            (this.submitted = {}),
            (this.lastElement = null),
            this.prepareForm(),
            this.hideErrors(),
            this.elements()
              .removeClass(this.settings.errorClass)
              .removeData("previousValue")
              .removeAttr("aria-invalid");
        },
        numberOfInvalids: function () {
          return this.objectLength(this.invalid);
        },
        objectLength: function (a) {
          var b,
            c = 0;
          for (b in a) c++;
          return c;
        },
        hideErrors: function () {
          this.addWrapper(this.toHide).hide();
        },
        valid: function () {
          return 0 === this.size();
        },
        size: function () {
          return this.errorList.length;
        },
        focusInvalid: function () {
          if (this.settings.focusInvalid)
            try {
              a(
                this.findLastActive() ||
                  (this.errorList.length && this.errorList[0].element) ||
                  []
              )
                .filter(":visible")
                .focus()
                .trigger("focusin");
            } catch (b) {}
        },
        findLastActive: function () {
          var b = this.lastActive;
          return (
            b &&
            1 ===
              a.grep(this.errorList, function (a) {
                return a.element.name === b.name;
              }).length &&
            b
          );
        },
        elements: function () {
          var b = this,
            c = {};
          return a(this.currentForm)
            .find("input, select, textarea")
            .not(":submit, :reset, :image, [disabled]")
            .not(this.settings.ignore)
            .filter(function () {
              return (
                !this.name &&
                  b.settings.debug &&
                  window.console &&
                  console.error("%o has no name assigned", this),
                this.name in c || !b.objectLength(a(this).rules())
                  ? !1
                  : ((c[this.name] = !0), !0)
              );
            });
        },
        clean: function (b) {
          return a(b)[0];
        },
        errors: function () {
          var b = this.settings.errorClass.split(" ").join(".");
          return a(this.settings.errorElement + "." + b, this.errorContext);
        },
        reset: function () {
          (this.successList = []),
            (this.errorList = []),
            (this.errorMap = {}),
            (this.toShow = a([])),
            (this.toHide = a([])),
            (this.currentElements = a([]));
        },
        prepareForm: function () {
          this.reset(), (this.toHide = this.errors().add(this.containers));
        },
        prepareElement: function (a) {
          this.reset(), (this.toHide = this.errorsFor(a));
        },
        elementValue: function (b) {
          var c,
            d = a(b),
            e = d.attr("type");
          return "radio" === e || "checkbox" === e
            ? a("input[name='" + d.attr("name") + "']:checked").val()
            : ((c = d.val()), "string" == typeof c ? c.replace(/\r/g, "") : c);
        },
        check: function (b) {
          b = this.validationTargetFor(this.clean(b));
          var c,
            d,
            e,
            f = a(b).rules(),
            g = a.map(f, function (a, b) {
              return b;
            }).length,
            h = !1,
            i = this.elementValue(b);
          for (d in f) {
            e = { method: d, parameters: f[d] };
            try {
              if (
                ((c = a.validator.methods[d].call(this, i, b, e.parameters)),
                "dependency-mismatch" === c && 1 === g)
              ) {
                h = !0;
                continue;
              }
              if (((h = !1), "pending" === c))
                return void (this.toHide = this.toHide.not(this.errorsFor(b)));
              if (!c) return this.formatAndAdd(b, e), !1;
            } catch (j) {
              throw (
                (this.settings.debug &&
                  window.console &&
                  console.log(
                    "Exception occurred when checking element " +
                      b.id +
                      ", check the '" +
                      e.method +
                      "' method.",
                    j
                  ),
                j)
              );
            }
          }
          if (!h) return this.objectLength(f) && this.successList.push(b), !0;
        },
        customDataMessage: function (b, c) {
          return (
            a(b).data(
              "msg" + c[0].toUpperCase() + c.substring(1).toLowerCase()
            ) || a(b).data("msg")
          );
        },
        customMessage: function (a, b) {
          var c = this.settings.messages[a];
          return c && (c.constructor === String ? c : c[b]);
        },
        findDefined: function () {
          for (var a = 0; a < arguments.length; a++)
            if (void 0 !== arguments[a]) return arguments[a];
          return void 0;
        },
        defaultMessage: function (b, c) {
          return this.findDefined(
            this.customMessage(b.name, c),
            this.customDataMessage(b, c),
            (!this.settings.ignoreTitle && b.title) || void 0,
            a.validator.messages[c],
            "<strong>Warning: No message defined for " + b.name + "</strong>"
          );
        },
        formatAndAdd: function (b, c) {
          var d = this.defaultMessage(b, c.method),
            e = /\$?\{(\d+)\}/g;
          "function" == typeof d
            ? (d = d.call(this, c.parameters, b))
            : e.test(d) &&
              (d = a.validator.format(d.replace(e, "{$1}"), c.parameters)),
            this.errorList.push({
              message: d,
              element: b,
              method: c.method,
            }),
            (this.errorMap[b.name] = d),
            (this.submitted[b.name] = d);
        },
        addWrapper: function (a) {
          return (
            this.settings.wrapper &&
              (a = a.add(a.parent(this.settings.wrapper))),
            a
          );
        },
        defaultShowErrors: function () {
          var a, b, c;
          for (a = 0; this.errorList[a]; a++)
            (c = this.errorList[a]),
              this.settings.highlight &&
                this.settings.highlight.call(
                  this,
                  c.element,
                  this.settings.errorClass,
                  this.settings.validClass
                ),
              this.showLabel(c.element, c.message);
          if (
            (this.errorList.length &&
              (this.toShow = this.toShow.add(this.containers)),
            this.settings.success)
          )
            for (a = 0; this.successList[a]; a++)
              this.showLabel(this.successList[a]);
          if (this.settings.unhighlight)
            for (a = 0, b = this.validElements(); b[a]; a++)
              this.settings.unhighlight.call(
                this,
                b[a],
                this.settings.errorClass,
                this.settings.validClass
              );
          (this.toHide = this.toHide.not(this.toShow)),
            this.hideErrors(),
            this.addWrapper(this.toShow).show();
        },
        validElements: function () {
          return this.currentElements.not(this.invalidElements());
        },
        invalidElements: function () {
          return a(this.errorList).map(function () {
            return this.element;
          });
        },
        showLabel: function (b, c) {
          var d = this.errorsFor(b);
          d.length
            ? (d
                .removeClass(this.settings.validClass)
                .addClass(this.settings.errorClass),
              d.html(c))
            : ((d = a("<" + this.settings.errorElement + ">")
                .attr("for", this.idOrName(b))
                .addClass(this.settings.errorClass)
                .html(c || "")),
              this.settings.wrapper &&
                (d = d
                  .hide()
                  .show()
                  .wrap("<" + this.settings.wrapper + "/>")
                  .parent()),
              this.labelContainer.append(d).length ||
                (this.settings.errorPlacement
                  ? this.settings.errorPlacement(d, a(b))
                  : d.insertAfter(b))),
            !c &&
              this.settings.success &&
              (d.text(""),
              "string" == typeof this.settings.success
                ? d.addClass(this.settings.success)
                : this.settings.success(d, b)),
            (this.toShow = this.toShow.add(d));
        },
        errorsFor: function (b) {
          var c = this.idOrName(b);
          return this.errors().filter(function () {
            return a(this).attr("for") === c;
          });
        },
        idOrName: function (a) {
          return (
            this.groups[a.name] || (this.checkable(a) ? a.name : a.id || a.name)
          );
        },
        validationTargetFor: function (a) {
          return (
            this.checkable(a) &&
              (a = this.findByName(a.name).not(this.settings.ignore)[0]),
            a
          );
        },
        checkable: function (a) {
          return /radio|checkbox/i.test(a.type);
        },
        findByName: function (b) {
          return a(this.currentForm).find("[name='" + b + "']");
        },
        getLength: function (b, c) {
          switch (c.nodeName.toLowerCase()) {
            case "select":
              return a("option:selected", c).length;
            case "input":
              if (this.checkable(c))
                return this.findByName(c.name).filter(":checked").length;
          }
          return b.length;
        },
        depend: function (a, b) {
          return this.dependTypes[typeof a]
            ? this.dependTypes[typeof a](a, b)
            : !0;
        },
        dependTypes: {
          boolean: function (a) {
            return a;
          },
          string: function (b, c) {
            return !!a(b, c.form).length;
          },
          function: function (a, b) {
            return a(b);
          },
        },
        optional: function (b) {
          var c = this.elementValue(b);
          return (
            !a.validator.methods.required.call(this, c, b) &&
            "dependency-mismatch"
          );
        },
        startRequest: function (a) {
          this.pending[a.name] ||
            (this.pendingRequest++, (this.pending[a.name] = !0));
        },
        stopRequest: function (b, c) {
          this.pendingRequest--,
            this.pendingRequest < 0 && (this.pendingRequest = 0),
            delete this.pending[b.name],
            c && 0 === this.pendingRequest && this.formSubmitted && this.form()
              ? (a(this.currentForm).submit(), (this.formSubmitted = !1))
              : !c &&
                0 === this.pendingRequest &&
                this.formSubmitted &&
                (a(this.currentForm).triggerHandler("invalid-form", [this]),
                (this.formSubmitted = !1));
        },
        previousValue: function (b) {
          return (
            a.data(b, "previousValue") ||
            a.data(b, "previousValue", {
              old: null,
              valid: !0,
              message: this.defaultMessage(b, "remote"),
            })
          );
        },
      },
      classRuleSettings: {
        required: { required: !0 },
        email: { email: !0 },
        url: { url: !0 },
        date: { date: !0 },
        dateISO: { dateISO: !0 },
        number: { number: !0 },
        digits: { digits: !0 },
        creditcard: { creditcard: !0 },
      },
      addClassRules: function (b, c) {
        b.constructor === String
          ? (this.classRuleSettings[b] = c)
          : a.extend(this.classRuleSettings, b);
      },
      classRules: function (b) {
        var c = {},
          d = a(b).attr("class");
        return (
          d &&
            a.each(d.split(" "), function () {
              this in a.validator.classRuleSettings &&
                a.extend(c, a.validator.classRuleSettings[this]);
            }),
          c
        );
      },
      attributeRules: function (b) {
        var c,
          d,
          e = {},
          f = a(b),
          g = b.getAttribute("type");
        for (c in a.validator.methods)
          "required" === c
            ? ((d = b.getAttribute(c)), "" === d && (d = !0), (d = !!d))
            : (d = f.attr(c)),
            /min|max/.test(c) &&
              (null === g || /number|range|text/.test(g)) &&
              (d = Number(d)),
            d || 0 === d ? (e[c] = d) : g === c && "range" !== g && (e[c] = !0);
        return (
          e.maxlength &&
            /-1|2147483647|524288/.test(e.maxlength) &&
            delete e.maxlength,
          e
        );
      },
      dataRules: function (b) {
        var c,
          d,
          e = {},
          f = a(b);
        for (c in a.validator.methods)
          (d = f.data(
            "rule" + c[0].toUpperCase() + c.substring(1).toLowerCase()
          )),
            void 0 !== d && (e[c] = d);
        return e;
      },
      staticRules: function (b) {
        var c = {},
          d = a.data(b.form, "validator");
        return (
          d.settings.rules &&
            (c = a.validator.normalizeRule(d.settings.rules[b.name]) || {}),
          c
        );
      },
      normalizeRules: function (b, c) {
        return (
          a.each(b, function (d, e) {
            if (e === !1) return void delete b[d];
            if (e.param || e.depends) {
              var f = !0;
              switch (typeof e.depends) {
                case "string":
                  f = !!a(e.depends, c.form).length;
                  break;
                case "function":
                  f = e.depends.call(c, c);
              }
              f ? (b[d] = void 0 !== e.param ? e.param : !0) : delete b[d];
            }
          }),
          a.each(b, function (d, e) {
            b[d] = a.isFunction(e) ? e(c) : e;
          }),
          a.each(["minlength", "maxlength"], function () {
            b[this] && (b[this] = Number(b[this]));
          }),
          a.each(["rangelength", "range"], function () {
            var c;
            b[this] &&
              (a.isArray(b[this])
                ? (b[this] = [Number(b[this][0]), Number(b[this][1])])
                : "string" == typeof b[this] &&
                  ((c = b[this].split(/[\s,]+/)),
                  (b[this] = [Number(c[0]), Number(c[1])])));
          }),
          a.validator.autoCreateRanges &&
            (b.min &&
              b.max &&
              ((b.range = [b.min, b.max]), delete b.min, delete b.max),
            b.minlength &&
              b.maxlength &&
              ((b.rangelength = [b.minlength, b.maxlength]),
              delete b.minlength,
              delete b.maxlength)),
          b
        );
      },
      normalizeRule: function (b) {
        if ("string" == typeof b) {
          var c = {};
          a.each(b.split(/\s/), function () {
            c[this] = !0;
          }),
            (b = c);
        }
        return b;
      },
      addMethod: function (b, c, d) {
        (a.validator.methods[b] = c),
          (a.validator.messages[b] =
            void 0 !== d ? d : a.validator.messages[b]),
          c.length < 3 &&
            a.validator.addClassRules(b, a.validator.normalizeRule(b));
      },
      methods: {
        required: function (b, c, d) {
          if (!this.depend(d, c)) return "dependency-mismatch";
          if ("select" === c.nodeName.toLowerCase()) {
            var e = a(c).val();
            return e && e.length > 0;
          }
          return this.checkable(c)
            ? this.getLength(b, c) > 0
            : a.trim(b).length > 0;
        },
        email: function (a, b) {
          return (
            this.optional(b) ||
            /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(
              a
            )
          );
        },
        url: function (a, b) {
          return (
            this.optional(b) ||
            /^(https?|s?ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(
              a
            )
          );
        },
        date: function (a, b) {
          return (
            this.optional(b) || !/Invalid|NaN/.test(new Date(a).toString())
          );
        },
        dateISO: function (a, b) {
          return (
            this.optional(b) || /^\d{4}[\/\-]\d{1,2}[\/\-]\d{1,2}$/.test(a)
          );
        },
        number: function (a, b) {
          return (
            this.optional(b) ||
            /^-?(?:\d+|\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(a)
          );
        },
        digits: function (a, b) {
          return this.optional(b) || /^\d+$/.test(a);
        },
        creditcard: function (a, b) {
          if (this.optional(b)) return "dependency-mismatch";
          if (/[^0-9 \-]+/.test(a)) return !1;
          var c,
            d,
            e = 0,
            f = 0,
            g = !1;
          if (((a = a.replace(/\D/g, "")), a.length < 13 || a.length > 19))
            return !1;
          for (c = a.length - 1; c >= 0; c--)
            (d = a.charAt(c)),
              (f = parseInt(d, 10)),
              g && (f *= 2) > 9 && (f -= 9),
              (e += f),
              (g = !g);
          return e % 10 === 0;
        },
        minlength: function (b, c, d) {
          var e = a.isArray(b) ? b.length : this.getLength(a.trim(b), c);
          return this.optional(c) || e >= d;
        },
        maxlength: function (b, c, d) {
          var e = a.isArray(b) ? b.length : this.getLength(a.trim(b), c);
          return this.optional(c) || d >= e;
        },
        rangelength: function (b, c, d) {
          var e = a.isArray(b) ? b.length : this.getLength(a.trim(b), c);
          return this.optional(c) || (e >= d[0] && e <= d[1]);
        },
        min: function (a, b, c) {
          return this.optional(b) || a >= c;
        },
        max: function (a, b, c) {
          return this.optional(b) || c >= a;
        },
        range: function (a, b, c) {
          return this.optional(b) || (a >= c[0] && a <= c[1]);
        },
        equalTo: function (b, c, d) {
          var e = a(d);
          return (
            this.settings.onfocusout &&
              e
                .unbind(".validate-equalTo")
                .bind("blur.validate-equalTo", function () {
                  a(c).valid();
                }),
            b === e.val()
          );
        },
        remote: function (b, c, d) {
          if (this.optional(c)) return "dependency-mismatch";
          var e,
            f,
            g = this.previousValue(c);
          return (
            this.settings.messages[c.name] ||
              (this.settings.messages[c.name] = {}),
            (g.originalMessage = this.settings.messages[c.name].remote),
            (this.settings.messages[c.name].remote = g.message),
            (d = ("string" == typeof d && { url: d }) || d),
            g.old === b
              ? g.valid
              : ((g.old = b),
                (e = this),
                this.startRequest(c),
                (f = {}),
                (f[c.name] = b),
                a.ajax(
                  a.extend(
                    !0,
                    {
                      url: d,
                      mode: "abort",
                      port: "validate" + c.name,
                      dataType: "json",
                      data: f,
                      context: e.currentForm,
                      success: function (d) {
                        var f,
                          h,
                          i,
                          j = d === !0 || "true" === d;
                        (e.settings.messages[c.name].remote =
                          g.originalMessage),
                          j
                            ? ((i = e.formSubmitted),
                              e.prepareElement(c),
                              (e.formSubmitted = i),
                              e.successList.push(c),
                              delete e.invalid[c.name],
                              e.showErrors())
                            : ((f = {}),
                              (h = d || e.defaultMessage(c, "remote")),
                              (f[c.name] = g.message =
                                a.isFunction(h) ? h(b) : h),
                              (e.invalid[c.name] = !0),
                              e.showErrors(f)),
                          (g.valid = j),
                          e.stopRequest(c, j);
                      },
                    },
                    d
                  )
                ),
                "pending")
          );
        },
      },
    }),
    (a.format = function () {
      throw "$.format has been deprecated. Please use $.validator.format instead.";
    });
})(jQuery),
  (function (a) {
    var b,
      c = {};
    a.ajaxPrefilter
      ? a.ajaxPrefilter(function (a, b, d) {
          var e = a.port;
          "abort" === a.mode && (c[e] && c[e].abort(), (c[e] = d));
        })
      : ((b = a.ajax),
        (a.ajax = function (d) {
          var e = ("mode" in d ? d : a.ajaxSettings).mode,
            f = ("port" in d ? d : a.ajaxSettings).port;
          return "abort" === e
            ? (c[f] && c[f].abort(), (c[f] = b.apply(this, arguments)), c[f])
            : b.apply(this, arguments);
        }));
  })(jQuery),
  (function (a) {
    a.extend(a.fn, {
      validateDelegate: function (b, c, d) {
        return this.bind(c, function (c) {
          var e = a(c.target);
          return e.is(b) ? d.apply(e, arguments) : void 0;
        });
      },
    });
  })(jQuery);

// Customização do jQUery validate
$.validator.addMethod(
  "cpf",
  function (value, element) {
    function valida_cpf(cpf) {
      if (cpf.length < 11) return false;

      var numeros, digitos, soma, i, resultado;
      numeros = cpf.substring(0, 9);
      digitos = cpf.substring(9);
      soma = 0;
      for (i = 10; i > 1; i--) soma += numeros.charAt(10 - i) * i;
      resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
      if (resultado != digitos.charAt(0)) return false;
      numeros = cpf.substring(0, 10);
      soma = 0;
      for (i = 11; i > 1; i--) soma += numeros.charAt(11 - i) * i;
      resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
      if (resultado != digitos.charAt(1)) return false;
      return true;
    }
    return valida_cpf(value.replace(/[^0-9]/gi, ""));
  },
  "Informe um CPF válido."
);
!(function (e) {
  function n(e) {
    var n = e.value || "";
    return n.length || (n = null), n;
  }
  e.fn.serializeObject = function () {
    "use strict";
    var a = {},
      t = function (t, i) {
        var o = a[i.name];
        "undefined" != typeof o && null !== o
          ? e.isArray(o)
            ? o.push(n(i))
            : (a[i.name] = [o, n(i)])
          : (a[i.name] = n(i));
      };
    return e.each(this.serializeArray(), t), a;
  };
})(jQuery);

(function (factory) {
  "use strict";
  if (typeof define === "function" && define.amd) {
    define(["jquery"], factory);
  } else if (typeof exports !== "undefined") {
    module.exports = factory(require("jquery"));
  } else {
    factory(jQuery);
  }
})(function ($) {
  "use strict";
  var Slick = window.Slick || {};
  Slick = (function () {
    var instanceUid = 0;
    function Slick(element, settings) {
      var _ = this,
        dataSettings;
      _.defaults = {
        accessibility: true,
        adaptiveHeight: false,
        appendArrows: $(element),
        appendDots: $(element),
        arrows: true,
        asNavFor: null,
        prevArrow:
          '<button class="slick-prev" aria-label="Previous" type="button">Previous</button>',
        nextArrow:
          '<button class="slick-next" aria-label="Next" type="button">Next</button>',
        autoplay: false,
        autoplaySpeed: 3e3,
        centerMode: false,
        centerPadding: "50px",
        cssEase: "ease",
        customPaging: function (slider, i) {
          return $('<button type="button" />').text(i + 1);
        },
        dots: false,
        dotsClass: "slick-dots",
        draggable: true,
        easing: "linear",
        edgeFriction: 0.35,
        fade: false,
        focusOnSelect: false,
        focusOnChange: false,
        infinite: true,
        initialSlide: 0,
        lazyLoad: "ondemand",
        mobileFirst: false,
        pauseOnHover: true,
        pauseOnFocus: true,
        pauseOnDotsHover: false,
        respondTo: "window",
        responsive: null,
        rows: 1,
        rtl: false,
        slide: "",
        slidesPerRow: 1,
        slidesToShow: 1,
        slidesToScroll: 1,
        speed: 500,
        swipe: true,
        swipeToSlide: false,
        touchMove: true,
        touchThreshold: 5,
        useCSS: true,
        useTransform: true,
        variableWidth: false,
        vertical: false,
        verticalSwiping: false,
        waitForAnimate: true,
        zIndex: 1e3,
      };
      _.initials = {
        animating: false,
        dragging: false,
        autoPlayTimer: null,
        currentDirection: 0,
        currentLeft: null,
        currentSlide: 0,
        direction: 1,
        $dots: null,
        listWidth: null,
        listHeight: null,
        loadIndex: 0,
        $nextArrow: null,
        $prevArrow: null,
        scrolling: false,
        slideCount: null,
        slideWidth: null,
        $slideTrack: null,
        $slides: null,
        sliding: false,
        slideOffset: 0,
        swipeLeft: null,
        swiping: false,
        $list: null,
        touchObject: {},
        transformsEnabled: false,
        unslicked: false,
      };
      $.extend(_, _.initials);
      _.activeBreakpoint = null;
      _.animType = null;
      _.animProp = null;
      _.breakpoints = [];
      _.breakpointSettings = [];
      _.cssTransitions = false;
      _.focussed = false;
      _.interrupted = false;
      _.hidden = "hidden";
      _.paused = true;
      _.positionProp = null;
      _.respondTo = null;
      _.rowCount = 1;
      _.shouldClick = true;
      _.$slider = $(element);
      _.$slidesCache = null;
      _.transformType = null;
      _.transitionType = null;
      _.visibilityChange = "visibilitychange";
      _.windowWidth = 0;
      _.windowTimer = null;
      dataSettings = $(element).data("slick") || {};
      _.options = $.extend({}, _.defaults, settings, dataSettings);
      _.currentSlide = _.options.initialSlide;
      _.originalSettings = _.options;
      if (typeof document.mozHidden !== "undefined") {
        _.hidden = "mozHidden";
        _.visibilityChange = "mozvisibilitychange";
      } else if (typeof document.webkitHidden !== "undefined") {
        _.hidden = "webkitHidden";
        _.visibilityChange = "webkitvisibilitychange";
      }
      _.autoPlay = $.proxy(_.autoPlay, _);
      _.autoPlayClear = $.proxy(_.autoPlayClear, _);
      _.autoPlayIterator = $.proxy(_.autoPlayIterator, _);
      _.changeSlide = $.proxy(_.changeSlide, _);
      _.clickHandler = $.proxy(_.clickHandler, _);
      _.selectHandler = $.proxy(_.selectHandler, _);
      _.setPosition = $.proxy(_.setPosition, _);
      _.swipeHandler = $.proxy(_.swipeHandler, _);
      _.dragHandler = $.proxy(_.dragHandler, _);
      _.keyHandler = $.proxy(_.keyHandler, _);
      _.instanceUid = instanceUid++;
      _.htmlExpr = /^(?:\s*(<[\w\W]+>)[^>]*)$/;
      _.registerBreakpoints();
      _.init(true);
    }
    return Slick;
  })();
  Slick.prototype.activateADA = function () {
    var _ = this;
    _.$slideTrack
      .find(".slick-active")
      .attr({ "aria-hidden": "false" })
      .find("a, input, button, select")
      .attr({ tabindex: "0" });
  };
  Slick.prototype.addSlide = Slick.prototype.slickAdd = function (
    markup,
    index,
    addBefore
  ) {
    var _ = this;
    if (typeof index === "boolean") {
      addBefore = index;
      index = null;
    } else if (index < 0 || index >= _.slideCount) {
      return false;
    }
    _.unload();
    if (typeof index === "number") {
      if (index === 0 && _.$slides.length === 0) {
        $(markup).appendTo(_.$slideTrack);
      } else if (addBefore) {
        $(markup).insertBefore(_.$slides.eq(index));
      } else {
        $(markup).insertAfter(_.$slides.eq(index));
      }
    } else {
      if (addBefore === true) {
        $(markup).prependTo(_.$slideTrack);
      } else {
        $(markup).appendTo(_.$slideTrack);
      }
    }
    _.$slides = _.$slideTrack.children(this.options.slide);
    _.$slideTrack.children(this.options.slide).detach();
    _.$slideTrack.append(_.$slides);
    _.$slides.each(function (index, element) {
      $(element).attr("data-slick-index", index);
    });
    _.$slidesCache = _.$slides;
    _.reinit();
  };
  Slick.prototype.animateHeight = function () {
    var _ = this;
    if (
      _.options.slidesToShow === 1 &&
      _.options.adaptiveHeight === true &&
      _.options.vertical === false
    ) {
      var targetHeight = _.$slides.eq(_.currentSlide).outerHeight(true);
      _.$list.animate({ height: targetHeight }, _.options.speed);
    }
  };
  Slick.prototype.animateSlide = function (targetLeft, callback) {
    var animProps = {},
      _ = this;
    _.animateHeight();
    if (_.options.rtl === true && _.options.vertical === false) {
      targetLeft = -targetLeft;
    }
    if (_.transformsEnabled === false) {
      if (_.options.vertical === false) {
        _.$slideTrack.animate(
          { left: targetLeft },
          _.options.speed,
          _.options.easing,
          callback
        );
      } else {
        _.$slideTrack.animate(
          { top: targetLeft },
          _.options.speed,
          _.options.easing,
          callback
        );
      }
    } else {
      if (_.cssTransitions === false) {
        if (_.options.rtl === true) {
          _.currentLeft = -_.currentLeft;
        }
        $({ animStart: _.currentLeft }).animate(
          { animStart: targetLeft },
          {
            duration: _.options.speed,
            easing: _.options.easing,
            step: function (now) {
              now = Math.ceil(now);
              if (_.options.vertical === false) {
                animProps[_.animType] = "translate(" + now + "px, 0px)";
                _.$slideTrack.css(animProps);
              } else {
                animProps[_.animType] = "translate(0px," + now + "px)";
                _.$slideTrack.css(animProps);
              }
            },
            complete: function () {
              if (callback) {
                callback.call();
              }
            },
          }
        );
      } else {
        _.applyTransition();
        targetLeft = Math.ceil(targetLeft);
        if (_.options.vertical === false) {
          animProps[_.animType] = "translate3d(" + targetLeft + "px, 0px, 0px)";
        } else {
          animProps[_.animType] = "translate3d(0px," + targetLeft + "px, 0px)";
        }
        _.$slideTrack.css(animProps);
        if (callback) {
          setTimeout(function () {
            _.disableTransition();
            callback.call();
          }, _.options.speed);
        }
      }
    }
  };
  Slick.prototype.getNavTarget = function () {
    var _ = this,
      asNavFor = _.options.asNavFor;
    if (asNavFor && asNavFor !== null) {
      asNavFor = $(asNavFor).not(_.$slider);
    }
    return asNavFor;
  };
  Slick.prototype.asNavFor = function (index) {
    var _ = this,
      asNavFor = _.getNavTarget();
    if (asNavFor !== null && typeof asNavFor === "object") {
      asNavFor.each(function () {
        var target = $(this).slick("getSlick");
        if (!target.unslicked) {
          target.slideHandler(index, true);
        }
      });
    }
  };
  Slick.prototype.applyTransition = function (slide) {
    var _ = this,
      transition = {};
    if (_.options.fade === false) {
      transition[_.transitionType] =
        _.transformType + " " + _.options.speed + "ms " + _.options.cssEase;
    } else {
      transition[_.transitionType] =
        "opacity " + _.options.speed + "ms " + _.options.cssEase;
    }
    if (_.options.fade === false) {
      _.$slideTrack.css(transition);
    } else {
      _.$slides.eq(slide).css(transition);
    }
  };
  Slick.prototype.autoPlay = function () {
    var _ = this;
    _.autoPlayClear();
    if (_.slideCount > _.options.slidesToShow) {
      _.autoPlayTimer = setInterval(
        _.autoPlayIterator,
        _.options.autoplaySpeed
      );
    }
  };
  Slick.prototype.autoPlayClear = function () {
    var _ = this;
    if (_.autoPlayTimer) {
      clearInterval(_.autoPlayTimer);
    }
  };
  Slick.prototype.autoPlayIterator = function () {
    var _ = this,
      slideTo = _.currentSlide + _.options.slidesToScroll;
    if (!_.paused && !_.interrupted && !_.focussed) {
      if (_.options.infinite === false) {
        if (_.direction === 1 && _.currentSlide + 1 === _.slideCount - 1) {
          _.direction = 0;
        } else if (_.direction === 0) {
          slideTo = _.currentSlide - _.options.slidesToScroll;
          if (_.currentSlide - 1 === 0) {
            _.direction = 1;
          }
        }
      }
      _.slideHandler(slideTo);
    }
  };
  Slick.prototype.buildArrows = function () {
    var _ = this;
    if (_.options.arrows === true) {
      _.$prevArrow = $(_.options.prevArrow).addClass("slick-arrow");
      _.$nextArrow = $(_.options.nextArrow).addClass("slick-arrow");
      if (_.slideCount > _.options.slidesToShow) {
        _.$prevArrow
          .removeClass("slick-hidden")
          .removeAttr("aria-hidden tabindex");
        _.$nextArrow
          .removeClass("slick-hidden")
          .removeAttr("aria-hidden tabindex");
        if (_.htmlExpr.test(_.options.prevArrow)) {
          _.$prevArrow.prependTo(_.options.appendArrows);
        }
        if (_.htmlExpr.test(_.options.nextArrow)) {
          _.$nextArrow.appendTo(_.options.appendArrows);
        }
        if (_.options.infinite !== true) {
          _.$prevArrow.addClass("slick-disabled").attr("aria-disabled", "true");
        }
      } else {
        _.$prevArrow
          .add(_.$nextArrow)
          .addClass("slick-hidden")
          .attr({ "aria-disabled": "true", tabindex: "-1" });
      }
    }
  };
  Slick.prototype.buildDots = function () {
    var _ = this,
      i,
      dot;
    if (_.options.dots === true && _.slideCount > _.options.slidesToShow) {
      _.$slider.addClass("slick-dotted");
      dot = $("<ul />").addClass(_.options.dotsClass);
      for (i = 0; i <= _.getDotCount(); i += 1) {
        dot.append($("<li />").append(_.options.customPaging.call(this, _, i)));
      }
      _.$dots = dot.appendTo(_.options.appendDots);
      _.$dots.find("li").first().addClass("slick-active");
    }
  };
  Slick.prototype.buildOut = function () {
    var _ = this;
    _.$slides = _.$slider
      .children(_.options.slide + ":not(.slick-cloned)")
      .addClass("slick-slide");
    _.slideCount = _.$slides.length;
    _.$slides.each(function (index, element) {
      $(element)
        .attr("data-slick-index", index)
        .data("originalStyling", $(element).attr("style") || "");
    });
    _.$slider.addClass("slick-slider");
    _.$slideTrack =
      _.slideCount === 0
        ? $('<div class="slick-track"/>').appendTo(_.$slider)
        : _.$slides.wrapAll('<div class="slick-track"/>').parent();
    _.$list = _.$slideTrack.wrap('<div class="slick-list"/>').parent();
    _.$slideTrack.css("opacity", 0);
    if (_.options.centerMode === true || _.options.swipeToSlide === true) {
      _.options.slidesToScroll = 1;
    }
    $("img[data-lazy]", _.$slider).not("[src]").addClass("slick-loading");
    _.setupInfinite();
    _.buildArrows();
    _.buildDots();
    _.updateDots();
    _.setSlideClasses(typeof _.currentSlide === "number" ? _.currentSlide : 0);
    if (_.options.draggable === true) {
      _.$list.addClass("draggable");
    }
  };
  Slick.prototype.buildRows = function () {
    var _ = this,
      a,
      b,
      c,
      newSlides,
      numOfSlides,
      originalSlides,
      slidesPerSection;
    newSlides = document.createDocumentFragment();
    originalSlides = _.$slider.children();
    if (_.options.rows > 0) {
      slidesPerSection = _.options.slidesPerRow * _.options.rows;
      numOfSlides = Math.ceil(originalSlides.length / slidesPerSection);
      for (a = 0; a < numOfSlides; a++) {
        var slide = document.createElement("div");
        for (b = 0; b < _.options.rows; b++) {
          var row = document.createElement("div");
          for (c = 0; c < _.options.slidesPerRow; c++) {
            var target =
              a * slidesPerSection + (b * _.options.slidesPerRow + c);
            if (originalSlides.get(target)) {
              row.appendChild(originalSlides.get(target));
            }
          }
          slide.appendChild(row);
        }
        newSlides.appendChild(slide);
      }
      _.$slider.empty().append(newSlides);
      _.$slider
        .children()
        .children()
        .children()
        .css({
          width: 100 / _.options.slidesPerRow + "%",
          display: "inline-block",
        });
    }
  };
  Slick.prototype.checkResponsive = function (initial, forceUpdate) {
    var _ = this,
      breakpoint,
      targetBreakpoint,
      respondToWidth,
      triggerBreakpoint = false;
    var sliderWidth = _.$slider.width();
    var windowWidth = window.innerWidth || $(window).width();
    if (_.respondTo === "window") {
      respondToWidth = windowWidth;
    } else if (_.respondTo === "slider") {
      respondToWidth = sliderWidth;
    } else if (_.respondTo === "min") {
      respondToWidth = Math.min(windowWidth, sliderWidth);
    }
    if (
      _.options.responsive &&
      _.options.responsive.length &&
      _.options.responsive !== null
    ) {
      targetBreakpoint = null;
      for (breakpoint in _.breakpoints) {
        if (_.breakpoints.hasOwnProperty(breakpoint)) {
          if (_.originalSettings.mobileFirst === false) {
            if (respondToWidth < _.breakpoints[breakpoint]) {
              targetBreakpoint = _.breakpoints[breakpoint];
            }
          } else {
            if (respondToWidth > _.breakpoints[breakpoint]) {
              targetBreakpoint = _.breakpoints[breakpoint];
            }
          }
        }
      }
      if (targetBreakpoint !== null) {
        if (_.activeBreakpoint !== null) {
          if (targetBreakpoint !== _.activeBreakpoint || forceUpdate) {
            _.activeBreakpoint = targetBreakpoint;
            if (_.breakpointSettings[targetBreakpoint] === "unslick") {
              _.unslick(targetBreakpoint);
            } else {
              _.options = $.extend(
                {},
                _.originalSettings,
                _.breakpointSettings[targetBreakpoint]
              );
              if (initial === true) {
                _.currentSlide = _.options.initialSlide;
              }
              _.refresh(initial);
            }
            triggerBreakpoint = targetBreakpoint;
          }
        } else {
          _.activeBreakpoint = targetBreakpoint;
          if (_.breakpointSettings[targetBreakpoint] === "unslick") {
            _.unslick(targetBreakpoint);
          } else {
            _.options = $.extend(
              {},
              _.originalSettings,
              _.breakpointSettings[targetBreakpoint]
            );
            if (initial === true) {
              _.currentSlide = _.options.initialSlide;
            }
            _.refresh(initial);
          }
          triggerBreakpoint = targetBreakpoint;
        }
      } else {
        if (_.activeBreakpoint !== null) {
          _.activeBreakpoint = null;
          _.options = _.originalSettings;
          if (initial === true) {
            _.currentSlide = _.options.initialSlide;
          }
          _.refresh(initial);
          triggerBreakpoint = targetBreakpoint;
        }
      }
      if (!initial && triggerBreakpoint !== false) {
        _.$slider.trigger("breakpoint", [_, triggerBreakpoint]);
      }
    }
  };
  Slick.prototype.changeSlide = function (event, dontAnimate) {
    var _ = this,
      $target = $(event.currentTarget),
      indexOffset,
      slideOffset,
      unevenOffset;
    if ($target.is("a")) {
      event.preventDefault();
    }
    if (!$target.is("li")) {
      $target = $target.closest("li");
    }
    unevenOffset = _.slideCount % _.options.slidesToScroll !== 0;
    indexOffset = unevenOffset
      ? 0
      : (_.slideCount - _.currentSlide) % _.options.slidesToScroll;
    switch (event.data.message) {
      case "previous":
        slideOffset =
          indexOffset === 0
            ? _.options.slidesToScroll
            : _.options.slidesToShow - indexOffset;
        if (_.slideCount > _.options.slidesToShow) {
          _.slideHandler(_.currentSlide - slideOffset, false, dontAnimate);
        }
        break;
      case "next":
        slideOffset =
          indexOffset === 0 ? _.options.slidesToScroll : indexOffset;
        if (_.slideCount > _.options.slidesToShow) {
          _.slideHandler(_.currentSlide + slideOffset, false, dontAnimate);
        }
        break;
      case "index":
        var index =
          event.data.index === 0
            ? 0
            : event.data.index || $target.index() * _.options.slidesToScroll;
        _.slideHandler(_.checkNavigable(index), false, dontAnimate);
        $target.children().trigger("focus");
        break;
      default:
        return;
    }
  };
  Slick.prototype.checkNavigable = function (index) {
    var _ = this,
      navigables,
      prevNavigable;
    navigables = _.getNavigableIndexes();
    prevNavigable = 0;
    if (index > navigables[navigables.length - 1]) {
      index = navigables[navigables.length - 1];
    } else {
      for (var n in navigables) {
        if (index < navigables[n]) {
          index = prevNavigable;
          break;
        }
        prevNavigable = navigables[n];
      }
    }
    return index;
  };
  Slick.prototype.cleanUpEvents = function () {
    var _ = this;
    if (_.options.dots && _.$dots !== null) {
      $("li", _.$dots)
        .off("click.slick", _.changeSlide)
        .off("mouseenter.slick", $.proxy(_.interrupt, _, true))
        .off("mouseleave.slick", $.proxy(_.interrupt, _, false));
      if (_.options.accessibility === true) {
        _.$dots.off("keydown.slick", _.keyHandler);
      }
    }
    _.$slider.off("focus.slick blur.slick");
    if (_.options.arrows === true && _.slideCount > _.options.slidesToShow) {
      _.$prevArrow && _.$prevArrow.off("click.slick", _.changeSlide);
      _.$nextArrow && _.$nextArrow.off("click.slick", _.changeSlide);
      if (_.options.accessibility === true) {
        _.$prevArrow && _.$prevArrow.off("keydown.slick", _.keyHandler);
        _.$nextArrow && _.$nextArrow.off("keydown.slick", _.keyHandler);
      }
    }
    _.$list.off("touchstart.slick mousedown.slick", _.swipeHandler);
    _.$list.off("touchmove.slick mousemove.slick", _.swipeHandler);
    _.$list.off("touchend.slick mouseup.slick", _.swipeHandler);
    _.$list.off("touchcancel.slick mouseleave.slick", _.swipeHandler);
    _.$list.off("click.slick", _.clickHandler);
    $(document).off(_.visibilityChange, _.visibility);
    _.cleanUpSlideEvents();
    if (_.options.accessibility === true) {
      _.$list.off("keydown.slick", _.keyHandler);
    }
    if (_.options.focusOnSelect === true) {
      $(_.$slideTrack).children().off("click.slick", _.selectHandler);
    }
    $(window).off(
      "orientationchange.slick.slick-" + _.instanceUid,
      _.orientationChange
    );
    $(window).off("resize.slick.slick-" + _.instanceUid, _.resize);
    $("[draggable!=true]", _.$slideTrack).off("dragstart", _.preventDefault);
    $(window).off("load.slick.slick-" + _.instanceUid, _.setPosition);
  };
  Slick.prototype.cleanUpSlideEvents = function () {
    var _ = this;
    _.$list.off("mouseenter.slick", $.proxy(_.interrupt, _, true));
    _.$list.off("mouseleave.slick", $.proxy(_.interrupt, _, false));
  };
  Slick.prototype.cleanUpRows = function () {
    var _ = this,
      originalSlides;
    if (_.options.rows > 0) {
      originalSlides = _.$slides.children().children();
      originalSlides.removeAttr("style");
      _.$slider.empty().append(originalSlides);
    }
  };
  Slick.prototype.clickHandler = function (event) {
    var _ = this;
    if (_.shouldClick === false) {
      event.stopImmediatePropagation();
      event.stopPropagation();
      event.preventDefault();
    }
  };
  Slick.prototype.destroy = function (refresh) {
    var _ = this;
    _.autoPlayClear();
    _.touchObject = {};
    _.cleanUpEvents();
    $(".slick-cloned", _.$slider).detach();
    if (_.$dots) {
      _.$dots.remove();
    }
    if (_.$prevArrow && _.$prevArrow.length) {
      _.$prevArrow
        .removeClass("slick-disabled slick-arrow slick-hidden")
        .removeAttr("aria-hidden aria-disabled tabindex")
        .css("display", "");
      if (_.htmlExpr.test(_.options.prevArrow)) {
        _.$prevArrow.remove();
      }
    }
    if (_.$nextArrow && _.$nextArrow.length) {
      _.$nextArrow
        .removeClass("slick-disabled slick-arrow slick-hidden")
        .removeAttr("aria-hidden aria-disabled tabindex")
        .css("display", "");
      if (_.htmlExpr.test(_.options.nextArrow)) {
        _.$nextArrow.remove();
      }
    }
    if (_.$slides) {
      _.$slides
        .removeClass(
          "slick-slide slick-active slick-center slick-visible slick-current"
        )
        .removeAttr("aria-hidden")
        .removeAttr("data-slick-index")
        .each(function () {
          $(this).attr("style", $(this).data("originalStyling"));
        });
      _.$slideTrack.children(this.options.slide).detach();
      _.$slideTrack.detach();
      _.$list.detach();
      _.$slider.append(_.$slides);
    }
    _.cleanUpRows();
    _.$slider.removeClass("slick-slider");
    _.$slider.removeClass("slick-initialized");
    _.$slider.removeClass("slick-dotted");
    _.unslicked = true;
    if (!refresh) {
      _.$slider.trigger("destroy", [_]);
    }
  };
  Slick.prototype.disableTransition = function (slide) {
    var _ = this,
      transition = {};
    transition[_.transitionType] = "";
    if (_.options.fade === false) {
      _.$slideTrack.css(transition);
    } else {
      _.$slides.eq(slide).css(transition);
    }
  };
  Slick.prototype.fadeSlide = function (slideIndex, callback) {
    var _ = this;
    if (_.cssTransitions === false) {
      _.$slides.eq(slideIndex).css({ zIndex: _.options.zIndex });
      _.$slides
        .eq(slideIndex)
        .animate({ opacity: 1 }, _.options.speed, _.options.easing, callback);
    } else {
      _.applyTransition(slideIndex);
      _.$slides.eq(slideIndex).css({ opacity: 1, zIndex: _.options.zIndex });
      if (callback) {
        setTimeout(function () {
          _.disableTransition(slideIndex);
          callback.call();
        }, _.options.speed);
      }
    }
  };
  Slick.prototype.fadeSlideOut = function (slideIndex) {
    var _ = this;
    if (_.cssTransitions === false) {
      _.$slides
        .eq(slideIndex)
        .animate(
          { opacity: 0, zIndex: _.options.zIndex - 2 },
          _.options.speed,
          _.options.easing
        );
    } else {
      _.applyTransition(slideIndex);
      _.$slides
        .eq(slideIndex)
        .css({ opacity: 0, zIndex: _.options.zIndex - 2 });
    }
  };
  Slick.prototype.filterSlides = Slick.prototype.slickFilter = function (
    filter
  ) {
    var _ = this;
    if (filter !== null) {
      _.$slidesCache = _.$slides;
      _.unload();
      _.$slideTrack.children(this.options.slide).detach();
      _.$slidesCache.filter(filter).appendTo(_.$slideTrack);
      _.reinit();
    }
  };
  Slick.prototype.focusHandler = function () {
    var _ = this;
    _.$slider
      .off("focus.slick blur.slick")
      .on("focus.slick", "*", function (event) {
        var $sf = $(this);
        setTimeout(function () {
          if (_.options.pauseOnFocus) {
            if ($sf.is(":focus")) {
              _.focussed = true;
              _.autoPlay();
            }
          }
        }, 0);
      })
      .on("blur.slick", "*", function (event) {
        var $sf = $(this);
        if (_.options.pauseOnFocus) {
          _.focussed = false;
          _.autoPlay();
        }
      });
  };
  Slick.prototype.getCurrent = Slick.prototype.slickCurrentSlide = function () {
    var _ = this;
    return _.currentSlide;
  };
  Slick.prototype.getDotCount = function () {
    var _ = this;
    var breakPoint = 0;
    var counter = 0;
    var pagerQty = 0;
    if (_.options.infinite === true) {
      if (_.slideCount <= _.options.slidesToShow) {
        ++pagerQty;
      } else {
        while (breakPoint < _.slideCount) {
          ++pagerQty;
          breakPoint = counter + _.options.slidesToScroll;
          counter +=
            _.options.slidesToScroll <= _.options.slidesToShow
              ? _.options.slidesToScroll
              : _.options.slidesToShow;
        }
      }
    } else if (_.options.centerMode === true) {
      pagerQty = _.slideCount;
    } else if (!_.options.asNavFor) {
      pagerQty =
        1 +
        Math.ceil(
          (_.slideCount - _.options.slidesToShow) / _.options.slidesToScroll
        );
    } else {
      while (breakPoint < _.slideCount) {
        ++pagerQty;
        breakPoint = counter + _.options.slidesToScroll;
        counter +=
          _.options.slidesToScroll <= _.options.slidesToShow
            ? _.options.slidesToScroll
            : _.options.slidesToShow;
      }
    }
    return pagerQty - 1;
  };
  Slick.prototype.getLeft = function (slideIndex) {
    var _ = this,
      targetLeft,
      verticalHeight,
      verticalOffset = 0,
      targetSlide,
      coef;
    _.slideOffset = 0;
    verticalHeight = _.$slides.first().outerHeight(true);
    if (_.options.infinite === true) {
      if (_.slideCount > _.options.slidesToShow) {
        _.slideOffset = _.slideWidth * _.options.slidesToShow * -1;
        coef = -1;
        if (_.options.vertical === true && _.options.centerMode === true) {
          if (_.options.slidesToShow === 2) {
            coef = -1.5;
          } else if (_.options.slidesToShow === 1) {
            coef = -2;
          }
        }
        verticalOffset = verticalHeight * _.options.slidesToShow * coef;
      }
      if (_.slideCount % _.options.slidesToScroll !== 0) {
        if (
          slideIndex + _.options.slidesToScroll > _.slideCount &&
          _.slideCount > _.options.slidesToShow
        ) {
          if (slideIndex > _.slideCount) {
            _.slideOffset =
              (_.options.slidesToShow - (slideIndex - _.slideCount)) *
              _.slideWidth *
              -1;
            verticalOffset =
              (_.options.slidesToShow - (slideIndex - _.slideCount)) *
              verticalHeight *
              -1;
          } else {
            _.slideOffset =
              (_.slideCount % _.options.slidesToScroll) * _.slideWidth * -1;
            verticalOffset =
              (_.slideCount % _.options.slidesToScroll) * verticalHeight * -1;
          }
        }
      }
    } else {
      if (slideIndex + _.options.slidesToShow > _.slideCount) {
        _.slideOffset =
          (slideIndex + _.options.slidesToShow - _.slideCount) * _.slideWidth;
        verticalOffset =
          (slideIndex + _.options.slidesToShow - _.slideCount) * verticalHeight;
      }
    }
    if (_.slideCount <= _.options.slidesToShow) {
      _.slideOffset = 0;
      verticalOffset = 0;
    }
    if (
      _.options.centerMode === true &&
      _.slideCount <= _.options.slidesToShow
    ) {
      _.slideOffset =
        (_.slideWidth * Math.floor(_.options.slidesToShow)) / 2 -
        (_.slideWidth * _.slideCount) / 2;
    } else if (_.options.centerMode === true && _.options.infinite === true) {
      _.slideOffset +=
        _.slideWidth * Math.floor(_.options.slidesToShow / 2) - _.slideWidth;
    } else if (_.options.centerMode === true) {
      _.slideOffset = 0;
      _.slideOffset += _.slideWidth * Math.floor(_.options.slidesToShow / 2);
    }
    if (_.options.vertical === false) {
      targetLeft = slideIndex * _.slideWidth * -1 + _.slideOffset;
    } else {
      targetLeft = slideIndex * verticalHeight * -1 + verticalOffset;
    }
    if (_.options.variableWidth === true) {
      if (
        _.slideCount <= _.options.slidesToShow ||
        _.options.infinite === false
      ) {
        targetSlide = _.$slideTrack.children(".slick-slide").eq(slideIndex);
      } else {
        targetSlide = _.$slideTrack
          .children(".slick-slide")
          .eq(slideIndex + _.options.slidesToShow);
      }
      if (_.options.rtl === true) {
        if (targetSlide[0]) {
          targetLeft =
            (_.$slideTrack.width() -
              targetSlide[0].offsetLeft -
              targetSlide.width()) *
            -1;
        } else {
          targetLeft = 0;
        }
      } else {
        targetLeft = targetSlide[0] ? targetSlide[0].offsetLeft * -1 : 0;
      }
      if (_.options.centerMode === true) {
        if (
          _.slideCount <= _.options.slidesToShow ||
          _.options.infinite === false
        ) {
          targetSlide = _.$slideTrack.children(".slick-slide").eq(slideIndex);
        } else {
          targetSlide = _.$slideTrack
            .children(".slick-slide")
            .eq(slideIndex + _.options.slidesToShow + 1);
        }
        if (_.options.rtl === true) {
          if (targetSlide[0]) {
            targetLeft =
              (_.$slideTrack.width() -
                targetSlide[0].offsetLeft -
                targetSlide.width()) *
              -1;
          } else {
            targetLeft = 0;
          }
        } else {
          targetLeft = targetSlide[0] ? targetSlide[0].offsetLeft * -1 : 0;
        }
        targetLeft += (_.$list.width() - targetSlide.outerWidth()) / 2;
      }
    }
    return targetLeft;
  };
  Slick.prototype.getOption = Slick.prototype.slickGetOption = function (
    option
  ) {
    var _ = this;
    return _.options[option];
  };
  Slick.prototype.getNavigableIndexes = function () {
    var _ = this,
      breakPoint = 0,
      counter = 0,
      indexes = [],
      max;
    if (_.options.infinite === false) {
      max = _.slideCount;
    } else {
      breakPoint = _.options.slidesToScroll * -1;
      counter = _.options.slidesToScroll * -1;
      max = _.slideCount * 2;
    }
    while (breakPoint < max) {
      indexes.push(breakPoint);
      breakPoint = counter + _.options.slidesToScroll;
      counter +=
        _.options.slidesToScroll <= _.options.slidesToShow
          ? _.options.slidesToScroll
          : _.options.slidesToShow;
    }
    return indexes;
  };
  Slick.prototype.getSlick = function () {
    return this;
  };
  Slick.prototype.getSlideCount = function () {
    var _ = this,
      slidesTraversed,
      swipedSlide,
      swipeTarget,
      centerOffset;
    centerOffset =
      _.options.centerMode === true ? Math.floor(_.$list.width() / 2) : 0;
    swipeTarget = _.swipeLeft * -1 + centerOffset;
    if (_.options.swipeToSlide === true) {
      _.$slideTrack.find(".slick-slide").each(function (index, slide) {
        var slideOuterWidth, slideOffset, slideRightBoundary;
        slideOuterWidth = $(slide).outerWidth();
        slideOffset = slide.offsetLeft;
        if (_.options.centerMode !== true) {
          slideOffset += slideOuterWidth / 2;
        }
        slideRightBoundary = slideOffset + slideOuterWidth;
        if (swipeTarget < slideRightBoundary) {
          swipedSlide = slide;
          return false;
        }
      });
      slidesTraversed =
        Math.abs($(swipedSlide).attr("data-slick-index") - _.currentSlide) || 1;
      return slidesTraversed;
    } else {
      return _.options.slidesToScroll;
    }
  };
  Slick.prototype.goTo = Slick.prototype.slickGoTo = function (
    slide,
    dontAnimate
  ) {
    var _ = this;
    _.changeSlide(
      { data: { message: "index", index: parseInt(slide) } },
      dontAnimate
    );
  };
  Slick.prototype.init = function (creation) {
    var _ = this;
    if (!$(_.$slider).hasClass("slick-initialized")) {
      $(_.$slider).addClass("slick-initialized");
      _.buildRows();
      _.buildOut();
      _.setProps();
      _.startLoad();
      _.loadSlider();
      _.initializeEvents();
      _.updateArrows();
      _.updateDots();
      _.checkResponsive(true);
      _.focusHandler();
    }
    if (creation) {
      _.$slider.trigger("init", [_]);
    }
    if (_.options.accessibility === true) {
      _.initADA();
    }
    if (_.options.autoplay) {
      _.paused = false;
      _.autoPlay();
    }
  };
  Slick.prototype.initADA = function () {
    var _ = this,
      numDotGroups = Math.ceil(_.slideCount / _.options.slidesToShow),
      tabControlIndexes = _.getNavigableIndexes().filter(function (val) {
        return val >= 0 && val < _.slideCount;
      });
    _.$slides
      .add(_.$slideTrack.find(".slick-cloned"))
      .attr({ "aria-hidden": "true", tabindex: "-1" })
      .find("a, input, button, select")
      .attr({ tabindex: "-1" });
    if (_.$dots !== null) {
      _.$slides.not(_.$slideTrack.find(".slick-cloned")).each(function (i) {
        var slideControlIndex = tabControlIndexes.indexOf(i);
        $(this).attr({
          role: "tabpanel",
          id: "slick-slide" + _.instanceUid + i,
          tabindex: -1,
        });
        if (slideControlIndex !== -1) {
          var ariaButtonControl =
            "slick-slide-control" + _.instanceUid + slideControlIndex;
          if ($("#" + ariaButtonControl).length) {
            $(this).attr({
              "aria-describedby": ariaButtonControl,
            });
          }
        }
      });
      _.$dots
        .attr("role", "tablist")
        .find("li")
        .each(function (i) {
          var mappedSlideIndex = tabControlIndexes[i];
          $(this).attr({ role: "presentation" });
          $(this)
            .find("button")
            .first()
            .attr({
              role: "tab",
              id: "slick-slide-control" + _.instanceUid + i,
              "aria-controls": "slick-slide" + _.instanceUid + mappedSlideIndex,
              "aria-label": i + 1 + " of " + numDotGroups,
              "aria-selected": null,
              tabindex: "-1",
            });
        })
        .eq(_.currentSlide)
        .find("button")
        .attr({ "aria-selected": "true", tabindex: "0" })
        .end();
    }
    for (
      var i = _.currentSlide, max = i + _.options.slidesToShow;
      i < max;
      i++
    ) {
      if (_.options.focusOnChange) {
        _.$slides.eq(i).attr({ tabindex: "0" });
      } else {
        _.$slides.eq(i).removeAttr("tabindex");
      }
    }
    _.activateADA();
  };
  Slick.prototype.initArrowEvents = function () {
    var _ = this;
    if (_.options.arrows === true && _.slideCount > _.options.slidesToShow) {
      _.$prevArrow
        .off("click.slick")
        .on("click.slick", { message: "previous" }, _.changeSlide);
      _.$nextArrow
        .off("click.slick")
        .on("click.slick", { message: "next" }, _.changeSlide);
      if (_.options.accessibility === true) {
        _.$prevArrow.on("keydown.slick", _.keyHandler);
        _.$nextArrow.on("keydown.slick", _.keyHandler);
      }
    }
  };
  Slick.prototype.initDotEvents = function () {
    var _ = this;
    if (_.options.dots === true && _.slideCount > _.options.slidesToShow) {
      $("li", _.$dots).on("click.slick", { message: "index" }, _.changeSlide);
      if (_.options.accessibility === true) {
        _.$dots.on("keydown.slick", _.keyHandler);
      }
    }
    if (
      _.options.dots === true &&
      _.options.pauseOnDotsHover === true &&
      _.slideCount > _.options.slidesToShow
    ) {
      $("li", _.$dots)
        .on("mouseenter.slick", $.proxy(_.interrupt, _, true))
        .on("mouseleave.slick", $.proxy(_.interrupt, _, false));
    }
  };
  Slick.prototype.initSlideEvents = function () {
    var _ = this;
    if (_.options.pauseOnHover) {
      _.$list.on("mouseenter.slick", $.proxy(_.interrupt, _, true));
      _.$list.on("mouseleave.slick", $.proxy(_.interrupt, _, false));
    }
  };
  Slick.prototype.initializeEvents = function () {
    var _ = this;
    _.initArrowEvents();
    _.initDotEvents();
    _.initSlideEvents();
    _.$list.on(
      "touchstart.slick mousedown.slick",
      { action: "start" },
      _.swipeHandler
    );
    _.$list.on(
      "touchmove.slick mousemove.slick",
      { action: "move" },
      _.swipeHandler
    );
    _.$list.on(
      "touchend.slick mouseup.slick",
      { action: "end" },
      _.swipeHandler
    );
    _.$list.on(
      "touchcancel.slick mouseleave.slick",
      { action: "end" },
      _.swipeHandler
    );
    _.$list.on("click.slick", _.clickHandler);
    $(document).on(_.visibilityChange, $.proxy(_.visibility, _));
    if (_.options.accessibility === true) {
      _.$list.on("keydown.slick", _.keyHandler);
    }
    if (_.options.focusOnSelect === true) {
      $(_.$slideTrack).children().on("click.slick", _.selectHandler);
    }
    $(window).on(
      "orientationchange.slick.slick-" + _.instanceUid,
      $.proxy(_.orientationChange, _)
    );
    $(window).on("resize.slick.slick-" + _.instanceUid, $.proxy(_.resize, _));
    $("[draggable!=true]", _.$slideTrack).on("dragstart", _.preventDefault);
    $(window).on("load.slick.slick-" + _.instanceUid, _.setPosition);
    $(_.setPosition);
  };
  Slick.prototype.initUI = function () {
    var _ = this;
    if (_.options.arrows === true && _.slideCount > _.options.slidesToShow) {
      _.$prevArrow.show();
      _.$nextArrow.show();
    }
    if (_.options.dots === true && _.slideCount > _.options.slidesToShow) {
      _.$dots.show();
    }
  };
  Slick.prototype.keyHandler = function (event) {
    var _ = this;
    if (!event.target.tagName.match("TEXTAREA|INPUT|SELECT")) {
      if (event.keyCode === 37 && _.options.accessibility === true) {
        _.changeSlide({
          data: {
            message: _.options.rtl === true ? "next" : "previous",
          },
        });
      } else if (event.keyCode === 39 && _.options.accessibility === true) {
        _.changeSlide({
          data: {
            message: _.options.rtl === true ? "previous" : "next",
          },
        });
      }
    }
  };
  Slick.prototype.lazyLoad = function () {
    var _ = this,
      loadRange,
      cloneRange,
      rangeStart,
      rangeEnd;
    function loadImages(imagesScope) {
      $("img[data-lazy]", imagesScope).each(function () {
        var image = $(this),
          imageSource = $(this).attr("data-lazy"),
          imageSrcSet = $(this).attr("data-srcset"),
          imageSizes =
            $(this).attr("data-sizes") || _.$slider.attr("data-sizes"),
          imageToLoad = document.createElement("img");
        imageToLoad.onload = function () {
          image.animate({ opacity: 0 }, 100, function () {
            if (imageSrcSet) {
              image.attr("srcset", imageSrcSet);
              if (imageSizes) {
                image.attr("sizes", imageSizes);
              }
            }
            image
              .attr("src", imageSource)
              .animate({ opacity: 1 }, 200, function () {
                image
                  .removeAttr("data-lazy data-srcset data-sizes")
                  .removeClass("slick-loading");
              });
            _.$slider.trigger("lazyLoaded", [_, image, imageSource]);
          });
        };
        imageToLoad.onerror = function () {
          image
            .removeAttr("data-lazy")
            .removeClass("slick-loading")
            .addClass("slick-lazyload-error");
          _.$slider.trigger("lazyLoadError", [_, image, imageSource]);
        };
        imageToLoad.src = imageSource;
      });
    }
    if (_.options.centerMode === true) {
      if (_.options.infinite === true) {
        rangeStart = _.currentSlide + (_.options.slidesToShow / 2 + 1);
        rangeEnd = rangeStart + _.options.slidesToShow + 2;
      } else {
        rangeStart = Math.max(
          0,
          _.currentSlide - (_.options.slidesToShow / 2 + 1)
        );
        rangeEnd = 2 + (_.options.slidesToShow / 2 + 1) + _.currentSlide;
      }
    } else {
      rangeStart = _.options.infinite
        ? _.options.slidesToShow + _.currentSlide
        : _.currentSlide;
      rangeEnd = Math.ceil(rangeStart + _.options.slidesToShow);
      if (_.options.fade === true) {
        if (rangeStart > 0) rangeStart--;
        if (rangeEnd <= _.slideCount) rangeEnd++;
      }
    }
    loadRange = _.$slider.find(".slick-slide").slice(rangeStart, rangeEnd);
    if (_.options.lazyLoad === "anticipated") {
      var prevSlide = rangeStart - 1,
        nextSlide = rangeEnd,
        $slides = _.$slider.find(".slick-slide");
      for (var i = 0; i < _.options.slidesToScroll; i++) {
        if (prevSlide < 0) prevSlide = _.slideCount - 1;
        loadRange = loadRange.add($slides.eq(prevSlide));
        loadRange = loadRange.add($slides.eq(nextSlide));
        prevSlide--;
        nextSlide++;
      }
    }
    loadImages(loadRange);
    if (_.slideCount <= _.options.slidesToShow) {
      cloneRange = _.$slider.find(".slick-slide");
      loadImages(cloneRange);
    } else if (_.currentSlide >= _.slideCount - _.options.slidesToShow) {
      cloneRange = _.$slider
        .find(".slick-cloned")
        .slice(0, _.options.slidesToShow);
      loadImages(cloneRange);
    } else if (_.currentSlide === 0) {
      cloneRange = _.$slider
        .find(".slick-cloned")
        .slice(_.options.slidesToShow * -1);
      loadImages(cloneRange);
    }
  };
  Slick.prototype.loadSlider = function () {
    var _ = this;
    _.setPosition();
    _.$slideTrack.css({ opacity: 1 });
    _.$slider.removeClass("slick-loading");
    _.initUI();
    if (_.options.lazyLoad === "progressive") {
      _.progressiveLazyLoad();
    }
  };
  Slick.prototype.next = Slick.prototype.slickNext = function () {
    var _ = this;
    _.changeSlide({ data: { message: "next" } });
  };
  Slick.prototype.orientationChange = function () {
    var _ = this;
    _.checkResponsive();
    _.setPosition();
  };
  Slick.prototype.pause = Slick.prototype.slickPause = function () {
    var _ = this;
    _.autoPlayClear();
    _.paused = true;
  };
  Slick.prototype.play = Slick.prototype.slickPlay = function () {
    var _ = this;
    _.autoPlay();
    _.options.autoplay = true;
    _.paused = false;
    _.focussed = false;
    _.interrupted = false;
  };
  Slick.prototype.postSlide = function (index) {
    var _ = this;
    if (!_.unslicked) {
      _.$slider.trigger("afterChange", [_, index]);
      _.animating = false;
      if (_.slideCount > _.options.slidesToShow) {
        _.setPosition();
      }
      _.swipeLeft = null;
      if (_.options.autoplay) {
        _.autoPlay();
      }
      if (_.options.accessibility === true) {
        _.initADA();
        if (_.options.focusOnChange) {
          var $currentSlide = $(_.$slides.get(_.currentSlide));
          $currentSlide.attr("tabindex", 0).focus();
        }
      }
    }
  };
  Slick.prototype.prev = Slick.prototype.slickPrev = function () {
    var _ = this;
    _.changeSlide({ data: { message: "previous" } });
  };
  Slick.prototype.preventDefault = function (event) {
    event.preventDefault();
  };
  Slick.prototype.progressiveLazyLoad = function (tryCount) {
    tryCount = tryCount || 1;
    var _ = this,
      $imgsToLoad = $("img[data-lazy]", _.$slider),
      image,
      imageSource,
      imageSrcSet,
      imageSizes,
      imageToLoad;
    if ($imgsToLoad.length) {
      image = $imgsToLoad.first();
      imageSource = image.attr("data-lazy");
      imageSrcSet = image.attr("data-srcset");
      imageSizes = image.attr("data-sizes") || _.$slider.attr("data-sizes");
      imageToLoad = document.createElement("img");
      imageToLoad.onload = function () {
        if (imageSrcSet) {
          image.attr("srcset", imageSrcSet);
          if (imageSizes) {
            image.attr("sizes", imageSizes);
          }
        }
        image
          .attr("src", imageSource)
          .removeAttr("data-lazy data-srcset data-sizes")
          .removeClass("slick-loading");
        if (_.options.adaptiveHeight === true) {
          _.setPosition();
        }
        _.$slider.trigger("lazyLoaded", [_, image, imageSource]);
        _.progressiveLazyLoad();
      };
      imageToLoad.onerror = function () {
        if (tryCount < 3) {
          setTimeout(function () {
            _.progressiveLazyLoad(tryCount + 1);
          }, 500);
        } else {
          image
            .removeAttr("data-lazy")
            .removeClass("slick-loading")
            .addClass("slick-lazyload-error");
          _.$slider.trigger("lazyLoadError", [_, image, imageSource]);
          _.progressiveLazyLoad();
        }
      };
      imageToLoad.src = imageSource;
    } else {
      _.$slider.trigger("allImagesLoaded", [_]);
    }
  };
  Slick.prototype.refresh = function (initializing) {
    var _ = this,
      currentSlide,
      lastVisibleIndex;
    lastVisibleIndex = _.slideCount - _.options.slidesToShow;
    if (!_.options.infinite && _.currentSlide > lastVisibleIndex) {
      _.currentSlide = lastVisibleIndex;
    }
    if (_.slideCount <= _.options.slidesToShow) {
      _.currentSlide = 0;
    }
    currentSlide = _.currentSlide;
    _.destroy(true);
    $.extend(_, _.initials, { currentSlide: currentSlide });
    _.init();
    if (!initializing) {
      _.changeSlide({ data: { message: "index", index: currentSlide } }, false);
    }
  };
  Slick.prototype.registerBreakpoints = function () {
    var _ = this,
      breakpoint,
      currentBreakpoint,
      l,
      responsiveSettings = _.options.responsive || null;
    if ($.type(responsiveSettings) === "array" && responsiveSettings.length) {
      _.respondTo = _.options.respondTo || "window";
      for (breakpoint in responsiveSettings) {
        l = _.breakpoints.length - 1;
        if (responsiveSettings.hasOwnProperty(breakpoint)) {
          currentBreakpoint = responsiveSettings[breakpoint].breakpoint;
          while (l >= 0) {
            if (_.breakpoints[l] && _.breakpoints[l] === currentBreakpoint) {
              _.breakpoints.splice(l, 1);
            }
            l--;
          }
          _.breakpoints.push(currentBreakpoint);
          _.breakpointSettings[currentBreakpoint] =
            responsiveSettings[breakpoint].settings;
        }
      }
      _.breakpoints.sort(function (a, b) {
        return _.options.mobileFirst ? a - b : b - a;
      });
    }
  };
  Slick.prototype.reinit = function () {
    var _ = this;
    _.$slides = _.$slideTrack.children(_.options.slide).addClass("slick-slide");
    _.slideCount = _.$slides.length;
    if (_.currentSlide >= _.slideCount && _.currentSlide !== 0) {
      _.currentSlide = _.currentSlide - _.options.slidesToScroll;
    }
    if (_.slideCount <= _.options.slidesToShow) {
      _.currentSlide = 0;
    }
    _.registerBreakpoints();
    _.setProps();
    _.setupInfinite();
    _.buildArrows();
    _.updateArrows();
    _.initArrowEvents();
    _.buildDots();
    _.updateDots();
    _.initDotEvents();
    _.cleanUpSlideEvents();
    _.initSlideEvents();
    _.checkResponsive(false, true);
    if (_.options.focusOnSelect === true) {
      $(_.$slideTrack).children().on("click.slick", _.selectHandler);
    }
    _.setSlideClasses(typeof _.currentSlide === "number" ? _.currentSlide : 0);
    _.setPosition();
    _.focusHandler();
    _.paused = !_.options.autoplay;
    _.autoPlay();
    _.$slider.trigger("reInit", [_]);
  };
  Slick.prototype.resize = function () {
    var _ = this;
    if ($(window).width() !== _.windowWidth) {
      clearTimeout(_.windowDelay);
      _.windowDelay = window.setTimeout(function () {
        _.windowWidth = $(window).width();
        _.checkResponsive();
        if (!_.unslicked) {
          _.setPosition();
        }
      }, 50);
    }
  };
  Slick.prototype.removeSlide = Slick.prototype.slickRemove = function (
    index,
    removeBefore,
    removeAll
  ) {
    var _ = this;
    if (typeof index === "boolean") {
      removeBefore = index;
      index = removeBefore === true ? 0 : _.slideCount - 1;
    } else {
      index = removeBefore === true ? --index : index;
    }
    if (_.slideCount < 1 || index < 0 || index > _.slideCount - 1) {
      return false;
    }
    _.unload();
    if (removeAll === true) {
      _.$slideTrack.children().remove();
    } else {
      _.$slideTrack.children(this.options.slide).eq(index).remove();
    }
    _.$slides = _.$slideTrack.children(this.options.slide);
    _.$slideTrack.children(this.options.slide).detach();
    _.$slideTrack.append(_.$slides);
    _.$slidesCache = _.$slides;
    _.reinit();
  };
  Slick.prototype.setCSS = function (position) {
    var _ = this,
      positionProps = {},
      x,
      y;
    if (_.options.rtl === true) {
      position = -position;
    }
    x = _.positionProp == "left" ? Math.ceil(position) + "px" : "0px";
    y = _.positionProp == "top" ? Math.ceil(position) + "px" : "0px";
    positionProps[_.positionProp] = position;
    if (_.transformsEnabled === false) {
      _.$slideTrack.css(positionProps);
    } else {
      positionProps = {};
      if (_.cssTransitions === false) {
        positionProps[_.animType] = "translate(" + x + ", " + y + ")";
        _.$slideTrack.css(positionProps);
      } else {
        positionProps[_.animType] = "translate3d(" + x + ", " + y + ", 0px)";
        _.$slideTrack.css(positionProps);
      }
    }
  };
  Slick.prototype.setDimensions = function () {
    var _ = this;
    if (_.options.vertical === false) {
      if (_.options.centerMode === true) {
        _.$list.css({ padding: "0px " + _.options.centerPadding });
      }
    } else {
      _.$list.height(
        _.$slides.first().outerHeight(true) * _.options.slidesToShow
      );
      if (_.options.centerMode === true) {
        _.$list.css({ padding: _.options.centerPadding + " 0px" });
      }
    }
    _.listWidth = _.$list.width();
    _.listHeight = _.$list.height();
    if (_.options.vertical === false && _.options.variableWidth === false) {
      _.slideWidth = Math.ceil(_.listWidth / _.options.slidesToShow);
      _.$slideTrack.width(
        Math.ceil(_.slideWidth * _.$slideTrack.children(".slick-slide").length)
      );
    } else if (_.options.variableWidth === true) {
      _.$slideTrack.width(5e3 * _.slideCount);
    } else {
      _.slideWidth = Math.ceil(_.listWidth);
      _.$slideTrack.height(
        Math.ceil(
          _.$slides.first().outerHeight(true) *
            _.$slideTrack.children(".slick-slide").length
        )
      );
    }
    var offset = _.$slides.first().outerWidth(true) - _.$slides.first().width();
    if (_.options.variableWidth === false)
      _.$slideTrack.children(".slick-slide").width(_.slideWidth - offset);
  };
  Slick.prototype.setFade = function () {
    var _ = this,
      targetLeft;
    _.$slides.each(function (index, element) {
      targetLeft = _.slideWidth * index * -1;
      if (_.options.rtl === true) {
        $(element).css({
          position: "relative",
          right: targetLeft,
          top: 0,
          zIndex: _.options.zIndex - 2,
          opacity: 0,
        });
      } else {
        $(element).css({
          position: "relative",
          left: targetLeft,
          top: 0,
          zIndex: _.options.zIndex - 2,
          opacity: 0,
        });
      }
    });
    _.$slides
      .eq(_.currentSlide)
      .css({ zIndex: _.options.zIndex - 1, opacity: 1 });
  };
  Slick.prototype.setHeight = function () {
    var _ = this;
    if (
      _.options.slidesToShow === 1 &&
      _.options.adaptiveHeight === true &&
      _.options.vertical === false
    ) {
      var targetHeight = _.$slides.eq(_.currentSlide).outerHeight(true);
      _.$list.css("height", targetHeight);
    }
  };
  Slick.prototype.setOption = Slick.prototype.slickSetOption = function () {
    var _ = this,
      l,
      item,
      option,
      value,
      refresh = false,
      type;
    if ($.type(arguments[0]) === "object") {
      option = arguments[0];
      refresh = arguments[1];
      type = "multiple";
    } else if ($.type(arguments[0]) === "string") {
      option = arguments[0];
      value = arguments[1];
      refresh = arguments[2];
      if (arguments[0] === "responsive" && $.type(arguments[1]) === "array") {
        type = "responsive";
      } else if (typeof arguments[1] !== "undefined") {
        type = "single";
      }
    }
    if (type === "single") {
      _.options[option] = value;
    } else if (type === "multiple") {
      $.each(option, function (opt, val) {
        _.options[opt] = val;
      });
    } else if (type === "responsive") {
      for (item in value) {
        if ($.type(_.options.responsive) !== "array") {
          _.options.responsive = [value[item]];
        } else {
          l = _.options.responsive.length - 1;
          while (l >= 0) {
            if (_.options.responsive[l].breakpoint === value[item].breakpoint) {
              _.options.responsive.splice(l, 1);
            }
            l--;
          }
          _.options.responsive.push(value[item]);
        }
      }
    }
    if (refresh) {
      _.unload();
      _.reinit();
    }
  };
  Slick.prototype.setPosition = function () {
    var _ = this;
    _.setDimensions();
    _.setHeight();
    if (_.options.fade === false) {
      _.setCSS(_.getLeft(_.currentSlide));
    } else {
      _.setFade();
    }
    _.$slider.trigger("setPosition", [_]);
  };
  Slick.prototype.setProps = function () {
    var _ = this,
      bodyStyle = document.body.style;
    _.positionProp = _.options.vertical === true ? "top" : "left";
    if (_.positionProp === "top") {
      _.$slider.addClass("slick-vertical");
    } else {
      _.$slider.removeClass("slick-vertical");
    }
    if (
      bodyStyle.WebkitTransition !== undefined ||
      bodyStyle.MozTransition !== undefined ||
      bodyStyle.msTransition !== undefined
    ) {
      if (_.options.useCSS === true) {
        _.cssTransitions = true;
      }
    }
    if (_.options.fade) {
      if (typeof _.options.zIndex === "number") {
        if (_.options.zIndex < 3) {
          _.options.zIndex = 3;
        }
      } else {
        _.options.zIndex = _.defaults.zIndex;
      }
    }
    if (bodyStyle.OTransform !== undefined) {
      _.animType = "OTransform";
      _.transformType = "-o-transform";
      _.transitionType = "OTransition";
      if (
        bodyStyle.perspectiveProperty === undefined &&
        bodyStyle.webkitPerspective === undefined
      )
        _.animType = false;
    }
    if (bodyStyle.MozTransform !== undefined) {
      _.animType = "MozTransform";
      _.transformType = "-moz-transform";
      _.transitionType = "MozTransition";
      if (
        bodyStyle.perspectiveProperty === undefined &&
        bodyStyle.MozPerspective === undefined
      )
        _.animType = false;
    }
    if (bodyStyle.webkitTransform !== undefined) {
      _.animType = "webkitTransform";
      _.transformType = "-webkit-transform";
      _.transitionType = "webkitTransition";
      if (
        bodyStyle.perspectiveProperty === undefined &&
        bodyStyle.webkitPerspective === undefined
      )
        _.animType = false;
    }
    if (bodyStyle.msTransform !== undefined) {
      _.animType = "msTransform";
      _.transformType = "-ms-transform";
      _.transitionType = "msTransition";
      if (bodyStyle.msTransform === undefined) _.animType = false;
    }
    if (bodyStyle.transform !== undefined && _.animType !== false) {
      _.animType = "transform";
      _.transformType = "transform";
      _.transitionType = "transition";
    }
    _.transformsEnabled =
      _.options.useTransform && _.animType !== null && _.animType !== false;
  };
  Slick.prototype.setSlideClasses = function (index) {
    var _ = this,
      centerOffset,
      allSlides,
      indexOffset,
      remainder;
    allSlides = _.$slider
      .find(".slick-slide")
      .removeClass("slick-active slick-center slick-current")
      .attr("aria-hidden", "true");
    _.$slides.eq(index).addClass("slick-current");
    if (_.options.centerMode === true) {
      var evenCoef = _.options.slidesToShow % 2 === 0 ? 1 : 0;
      centerOffset = Math.floor(_.options.slidesToShow / 2);
      if (_.options.infinite === true) {
        if (index >= centerOffset && index <= _.slideCount - 1 - centerOffset) {
          _.$slides
            .slice(index - centerOffset + evenCoef, index + centerOffset + 1)
            .addClass("slick-active")
            .attr("aria-hidden", "false");
        } else {
          indexOffset = _.options.slidesToShow + index;
          allSlides
            .slice(
              indexOffset - centerOffset + 1 + evenCoef,
              indexOffset + centerOffset + 2
            )
            .addClass("slick-active")
            .attr("aria-hidden", "false");
        }
        if (index === 0) {
          allSlides
            .eq(allSlides.length - 1 - _.options.slidesToShow)
            .addClass("slick-center");
        } else if (index === _.slideCount - 1) {
          allSlides.eq(_.options.slidesToShow).addClass("slick-center");
        }
      }
      _.$slides.eq(index).addClass("slick-center");
    } else {
      if (index >= 0 && index <= _.slideCount - _.options.slidesToShow) {
        _.$slides
          .slice(index, index + _.options.slidesToShow)
          .addClass("slick-active")
          .attr("aria-hidden", "false");
      } else if (allSlides.length <= _.options.slidesToShow) {
        allSlides.addClass("slick-active").attr("aria-hidden", "false");
      } else {
        remainder = _.slideCount % _.options.slidesToShow;
        indexOffset =
          _.options.infinite === true ? _.options.slidesToShow + index : index;
        if (
          _.options.slidesToShow == _.options.slidesToScroll &&
          _.slideCount - index < _.options.slidesToShow
        ) {
          allSlides
            .slice(
              indexOffset - (_.options.slidesToShow - remainder),
              indexOffset + remainder
            )
            .addClass("slick-active")
            .attr("aria-hidden", "false");
        } else {
          allSlides
            .slice(indexOffset, indexOffset + _.options.slidesToShow)
            .addClass("slick-active")
            .attr("aria-hidden", "false");
        }
      }
    }
    if (
      _.options.lazyLoad === "ondemand" ||
      _.options.lazyLoad === "anticipated"
    ) {
      _.lazyLoad();
    }
  };
  Slick.prototype.setupInfinite = function () {
    var _ = this,
      i,
      slideIndex,
      infiniteCount;
    if (_.options.fade === true) {
      _.options.centerMode = false;
    }
    if (_.options.infinite === true && _.options.fade === false) {
      slideIndex = null;
      if (_.slideCount > _.options.slidesToShow) {
        if (_.options.centerMode === true) {
          infiniteCount = _.options.slidesToShow + 1;
        } else {
          infiniteCount = _.options.slidesToShow;
        }
        for (i = _.slideCount; i > _.slideCount - infiniteCount; i -= 1) {
          slideIndex = i - 1;
          $(_.$slides[slideIndex])
            .clone(true)
            .attr("id", "")
            .attr("data-slick-index", slideIndex - _.slideCount)
            .prependTo(_.$slideTrack)
            .addClass("slick-cloned");
        }
        for (i = 0; i < infiniteCount + _.slideCount; i += 1) {
          slideIndex = i;
          $(_.$slides[slideIndex])
            .clone(true)
            .attr("id", "")
            .attr("data-slick-index", slideIndex + _.slideCount)
            .appendTo(_.$slideTrack)
            .addClass("slick-cloned");
        }
        _.$slideTrack
          .find(".slick-cloned")
          .find("[id]")
          .each(function () {
            $(this).attr("id", "");
          });
      }
    }
  };
  Slick.prototype.interrupt = function (toggle) {
    var _ = this;
    if (!toggle) {
      _.autoPlay();
    }
    _.interrupted = toggle;
  };
  Slick.prototype.selectHandler = function (event) {
    var _ = this;
    var targetElement = $(event.target).is(".slick-slide")
      ? $(event.target)
      : $(event.target).parents(".slick-slide");
    var index = parseInt(targetElement.attr("data-slick-index"));
    if (!index) index = 0;
    if (_.slideCount <= _.options.slidesToShow) {
      _.slideHandler(index, false, true);
      return;
    }
    _.slideHandler(index);
  };
  Slick.prototype.slideHandler = function (index, sync, dontAnimate) {
    var targetSlide,
      animSlide,
      oldSlide,
      slideLeft,
      targetLeft = null,
      _ = this,
      navTarget;
    sync = sync || false;
    if (_.animating === true && _.options.waitForAnimate === true) {
      return;
    }
    if (_.options.fade === true && _.currentSlide === index) {
      return;
    }
    if (sync === false) {
      _.asNavFor(index);
    }
    targetSlide = index;
    targetLeft = _.getLeft(targetSlide);
    slideLeft = _.getLeft(_.currentSlide);
    _.currentLeft = _.swipeLeft === null ? slideLeft : _.swipeLeft;
    if (
      _.options.infinite === false &&
      _.options.centerMode === false &&
      (index < 0 || index > _.getDotCount() * _.options.slidesToScroll)
    ) {
      if (_.options.fade === false) {
        targetSlide = _.currentSlide;
        if (dontAnimate !== true && _.slideCount > _.options.slidesToShow) {
          _.animateSlide(slideLeft, function () {
            _.postSlide(targetSlide);
          });
        } else {
          _.postSlide(targetSlide);
        }
      }
      return;
    } else if (
      _.options.infinite === false &&
      _.options.centerMode === true &&
      (index < 0 || index > _.slideCount - _.options.slidesToScroll)
    ) {
      if (_.options.fade === false) {
        targetSlide = _.currentSlide;
        if (dontAnimate !== true && _.slideCount > _.options.slidesToShow) {
          _.animateSlide(slideLeft, function () {
            _.postSlide(targetSlide);
          });
        } else {
          _.postSlide(targetSlide);
        }
      }
      return;
    }
    if (_.options.autoplay) {
      clearInterval(_.autoPlayTimer);
    }
    if (targetSlide < 0) {
      if (_.slideCount % _.options.slidesToScroll !== 0) {
        animSlide = _.slideCount - (_.slideCount % _.options.slidesToScroll);
      } else {
        animSlide = _.slideCount + targetSlide;
      }
    } else if (targetSlide >= _.slideCount) {
      if (_.slideCount % _.options.slidesToScroll !== 0) {
        animSlide = 0;
      } else {
        animSlide = targetSlide - _.slideCount;
      }
    } else {
      animSlide = targetSlide;
    }
    _.animating = true;
    _.$slider.trigger("beforeChange", [_, _.currentSlide, animSlide]);
    oldSlide = _.currentSlide;
    _.currentSlide = animSlide;
    _.setSlideClasses(_.currentSlide);
    if (_.options.asNavFor) {
      navTarget = _.getNavTarget();
      navTarget = navTarget.slick("getSlick");
      if (navTarget.slideCount <= navTarget.options.slidesToShow) {
        navTarget.setSlideClasses(_.currentSlide);
      }
    }
    _.updateDots();
    _.updateArrows();
    if (_.options.fade === true) {
      if (dontAnimate !== true) {
        _.fadeSlideOut(oldSlide);
        _.fadeSlide(animSlide, function () {
          _.postSlide(animSlide);
        });
      } else {
        _.postSlide(animSlide);
      }
      _.animateHeight();
      return;
    }
    if (dontAnimate !== true && _.slideCount > _.options.slidesToShow) {
      _.animateSlide(targetLeft, function () {
        _.postSlide(animSlide);
      });
    } else {
      _.postSlide(animSlide);
    }
  };
  Slick.prototype.startLoad = function () {
    var _ = this;
    if (_.options.arrows === true && _.slideCount > _.options.slidesToShow) {
      _.$prevArrow.hide();
      _.$nextArrow.hide();
    }
    if (_.options.dots === true && _.slideCount > _.options.slidesToShow) {
      _.$dots.hide();
    }
    _.$slider.addClass("slick-loading");
  };
  Slick.prototype.swipeDirection = function () {
    var xDist,
      yDist,
      r,
      swipeAngle,
      _ = this;
    xDist = _.touchObject.startX - _.touchObject.curX;
    yDist = _.touchObject.startY - _.touchObject.curY;
    r = Math.atan2(yDist, xDist);
    swipeAngle = Math.round((r * 180) / Math.PI);
    if (swipeAngle < 0) {
      swipeAngle = 360 - Math.abs(swipeAngle);
    }
    if (swipeAngle <= 45 && swipeAngle >= 0) {
      return _.options.rtl === false ? "left" : "right";
    }
    if (swipeAngle <= 360 && swipeAngle >= 315) {
      return _.options.rtl === false ? "left" : "right";
    }
    if (swipeAngle >= 135 && swipeAngle <= 225) {
      return _.options.rtl === false ? "right" : "left";
    }
    if (_.options.verticalSwiping === true) {
      if (swipeAngle >= 35 && swipeAngle <= 135) {
        return "down";
      } else {
        return "up";
      }
    }
    return "vertical";
  };
  Slick.prototype.swipeEnd = function (event) {
    var _ = this,
      slideCount,
      direction;
    _.dragging = false;
    _.swiping = false;
    if (_.scrolling) {
      _.scrolling = false;
      return false;
    }
    _.interrupted = false;
    _.shouldClick = _.touchObject.swipeLength > 10 ? false : true;
    if (_.touchObject.curX === undefined) {
      return false;
    }
    if (_.touchObject.edgeHit === true) {
      _.$slider.trigger("edge", [_, _.swipeDirection()]);
    }
    if (_.touchObject.swipeLength >= _.touchObject.minSwipe) {
      direction = _.swipeDirection();
      switch (direction) {
        case "left":
        case "down":
          slideCount = _.options.swipeToSlide
            ? _.checkNavigable(_.currentSlide + _.getSlideCount())
            : _.currentSlide + _.getSlideCount();
          _.currentDirection = 0;
          break;
        case "right":
        case "up":
          slideCount = _.options.swipeToSlide
            ? _.checkNavigable(_.currentSlide - _.getSlideCount())
            : _.currentSlide - _.getSlideCount();
          _.currentDirection = 1;
          break;
        default:
      }
      if (direction != "vertical") {
        _.slideHandler(slideCount);
        _.touchObject = {};
        _.$slider.trigger("swipe", [_, direction]);
      }
    } else {
      if (_.touchObject.startX !== _.touchObject.curX) {
        _.slideHandler(_.currentSlide);
        _.touchObject = {};
      }
    }
  };
  Slick.prototype.swipeHandler = function (event) {
    var _ = this;
    if (
      _.options.swipe === false ||
      ("ontouchend" in document && _.options.swipe === false)
    ) {
      return;
    } else if (
      _.options.draggable === false &&
      event.type.indexOf("mouse") !== -1
    ) {
      return;
    }
    _.touchObject.fingerCount =
      event.originalEvent && event.originalEvent.touches !== undefined
        ? event.originalEvent.touches.length
        : 1;
    _.touchObject.minSwipe = _.listWidth / _.options.touchThreshold;
    if (_.options.verticalSwiping === true) {
      _.touchObject.minSwipe = _.listHeight / _.options.touchThreshold;
    }
    switch (event.data.action) {
      case "start":
        _.swipeStart(event);
        break;
      case "move":
        _.swipeMove(event);
        break;
      case "end":
        _.swipeEnd(event);
        break;
    }
  };
  Slick.prototype.swipeMove = function (event) {
    var _ = this,
      edgeWasHit = false,
      curLeft,
      swipeDirection,
      swipeLength,
      positionOffset,
      touches,
      verticalSwipeLength;
    touches =
      event.originalEvent !== undefined ? event.originalEvent.touches : null;
    if (!_.dragging || _.scrolling || (touches && touches.length !== 1)) {
      return false;
    }
    curLeft = _.getLeft(_.currentSlide);
    _.touchObject.curX =
      touches !== undefined ? touches[0].pageX : event.clientX;
    _.touchObject.curY =
      touches !== undefined ? touches[0].pageY : event.clientY;
    _.touchObject.swipeLength = Math.round(
      Math.sqrt(Math.pow(_.touchObject.curX - _.touchObject.startX, 2))
    );
    verticalSwipeLength = Math.round(
      Math.sqrt(Math.pow(_.touchObject.curY - _.touchObject.startY, 2))
    );
    if (!_.options.verticalSwiping && !_.swiping && verticalSwipeLength > 4) {
      _.scrolling = true;
      return false;
    }
    if (_.options.verticalSwiping === true) {
      _.touchObject.swipeLength = verticalSwipeLength;
    }
    swipeDirection = _.swipeDirection();
    if (event.originalEvent !== undefined && _.touchObject.swipeLength > 4) {
      _.swiping = true;
      event.preventDefault();
    }
    positionOffset =
      (_.options.rtl === false ? 1 : -1) *
      (_.touchObject.curX > _.touchObject.startX ? 1 : -1);
    if (_.options.verticalSwiping === true) {
      positionOffset = _.touchObject.curY > _.touchObject.startY ? 1 : -1;
    }
    swipeLength = _.touchObject.swipeLength;
    _.touchObject.edgeHit = false;
    if (_.options.infinite === false) {
      if (
        (_.currentSlide === 0 && swipeDirection === "right") ||
        (_.currentSlide >= _.getDotCount() && swipeDirection === "left")
      ) {
        swipeLength = _.touchObject.swipeLength * _.options.edgeFriction;
        _.touchObject.edgeHit = true;
      }
    }
    if (_.options.vertical === false) {
      _.swipeLeft = curLeft + swipeLength * positionOffset;
    } else {
      _.swipeLeft =
        curLeft +
        swipeLength * (_.$list.height() / _.listWidth) * positionOffset;
    }
    if (_.options.verticalSwiping === true) {
      _.swipeLeft = curLeft + swipeLength * positionOffset;
    }
    if (_.options.fade === true || _.options.touchMove === false) {
      return false;
    }
    if (_.animating === true) {
      _.swipeLeft = null;
      return false;
    }
    _.setCSS(_.swipeLeft);
  };
  Slick.prototype.swipeStart = function (event) {
    var _ = this,
      touches;
    _.interrupted = true;
    if (
      _.touchObject.fingerCount !== 1 ||
      _.slideCount <= _.options.slidesToShow
    ) {
      _.touchObject = {};
      return false;
    }
    if (
      event.originalEvent !== undefined &&
      event.originalEvent.touches !== undefined
    ) {
      touches = event.originalEvent.touches[0];
    }
    _.touchObject.startX = _.touchObject.curX =
      touches !== undefined ? touches.pageX : event.clientX;
    _.touchObject.startY = _.touchObject.curY =
      touches !== undefined ? touches.pageY : event.clientY;
    _.dragging = true;
  };
  Slick.prototype.unfilterSlides = Slick.prototype.slickUnfilter = function () {
    var _ = this;
    if (_.$slidesCache !== null) {
      _.unload();
      _.$slideTrack.children(this.options.slide).detach();
      _.$slidesCache.appendTo(_.$slideTrack);
      _.reinit();
    }
  };
  Slick.prototype.unload = function () {
    var _ = this;
    $(".slick-cloned", _.$slider).remove();
    if (_.$dots) {
      _.$dots.remove();
    }
    if (_.$prevArrow && _.htmlExpr.test(_.options.prevArrow)) {
      _.$prevArrow.remove();
    }
    if (_.$nextArrow && _.htmlExpr.test(_.options.nextArrow)) {
      _.$nextArrow.remove();
    }
    _.$slides
      .removeClass("slick-slide slick-active slick-visible slick-current")
      .attr("aria-hidden", "true")
      .css("width", "");
  };
  Slick.prototype.unslick = function (fromBreakpoint) {
    var _ = this;
    _.$slider.trigger("unslick", [_, fromBreakpoint]);
    _.destroy();
  };
  Slick.prototype.updateArrows = function () {
    var _ = this,
      centerOffset;
    centerOffset = Math.floor(_.options.slidesToShow / 2);
    if (
      _.options.arrows === true &&
      _.slideCount > _.options.slidesToShow &&
      !_.options.infinite
    ) {
      _.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false");
      _.$nextArrow.removeClass("slick-disabled").attr("aria-disabled", "false");
      if (_.currentSlide === 0) {
        _.$prevArrow.addClass("slick-disabled").attr("aria-disabled", "true");
        _.$nextArrow
          .removeClass("slick-disabled")
          .attr("aria-disabled", "false");
      } else if (
        _.currentSlide >= _.slideCount - _.options.slidesToShow &&
        _.options.centerMode === false
      ) {
        _.$nextArrow.addClass("slick-disabled").attr("aria-disabled", "true");
        _.$prevArrow
          .removeClass("slick-disabled")
          .attr("aria-disabled", "false");
      } else if (
        _.currentSlide >= _.slideCount - 1 &&
        _.options.centerMode === true
      ) {
        _.$nextArrow.addClass("slick-disabled").attr("aria-disabled", "true");
        _.$prevArrow
          .removeClass("slick-disabled")
          .attr("aria-disabled", "false");
      }
    }
  };
  Slick.prototype.updateDots = function () {
    var _ = this;
    if (_.$dots !== null) {
      _.$dots.find("li").removeClass("slick-active").end();
      _.$dots
        .find("li")
        .eq(Math.floor(_.currentSlide / _.options.slidesToScroll))
        .addClass("slick-active");
    }
  };
  Slick.prototype.visibility = function () {
    var _ = this;
    if (_.options.autoplay) {
      if (document[_.hidden]) {
        _.interrupted = true;
      } else {
        _.interrupted = false;
      }
    }
  };
  $.fn.slick = function () {
    var _ = this,
      opt = arguments[0],
      args = Array.prototype.slice.call(arguments, 1),
      l = _.length,
      i,
      ret;
    for (i = 0; i < l; i++) {
      if (typeof opt == "object" || typeof opt == "undefined")
        _[i].slick = new Slick(_[i], opt);
      else ret = _[i].slick[opt].apply(_[i].slick, args);
      if (typeof ret != "undefined") return ret;
    }
    return _;
  };
});

/* Quatro Digital Amazing Menu // 2.13 // Carlos Vinicius // Todos os direitos reservados */

/* FUNÇÕES AUXILIARES */
"function" !== typeof String.prototype.trim &&
  (String.prototype.trim = function () {
    return this.replace(/^\s+|\s+$/g, "");
  });
"function" != typeof String.prototype.capitalize &&
  (String.prototype.capitalize = function () {
    return this.charAt(0).toUpperCase() + this.slice(1).toLowerCase();
  });
"function" !== typeof String.prototype.replaceSpecialChars &&
  (String.prototype.replaceSpecialChars = function () {
    var b = {
      "\u00e7": "c",
      "\u00e6": "ae",
      "\u0153": "oe",
      "\u00e1": "a",
      "\u00e9": "e",
      "\u00ed": "i",
      "\u00f3": "o",
      "\u00fa": "u",
      "\u00e0": "a",
      "\u00e8": "e",
      "\u00ec": "i",
      "\u00f2": "o",
      "\u00f9": "u",
      "\u00e4": "a",
      "\u00eb": "e",
      "\u00ef": "i",
      "\u00f6": "o",
      "\u00fc": "u",
      "\u00ff": "y",
      "\u00e2": "a",
      "\u00ea": "e",
      "\u00ee": "i",
      "\u00f4": "o",
      "\u00fb": "u",
      "\u00e5": "a",
      "\u00e3": "a",
      "\u00f8": "o",
      "\u00f5": "o",
      u: "u",
      "\u00c1": "A",
      "\u00c9": "E",
      "\u00cd": "I",
      "\u00d3": "O",
      "\u00da": "U",
      "\u00ca": "E",
      "\u00d4": "O",
      "\u00dc": "U",
      "\u00c3": "A",
      "\u00d5": "O",
      "\u00c0": "A",
      "\u00c7": "C",
    };
    return this.replace(/[\u00e0-\u00fa]/gi, function (a) {
      return "undefined" != typeof b[a] ? b[a] : a;
    });
  });
/* $("a").getParent("ul"); // 3 // Carlos Vinicius [ QUATRO DIGITAL ] // MIT */
(function (a) {
  a.fn.getParent = a.fn.closest;
})(jQuery);
/* Quatro Digital - jQuery Ajax Queue // 4.0 // Carlos Vinicius [ QUATRO DIGITAL ] // MIT <http://pt.wikipedia.org/wiki/Licen%C3%A7a_MIT> */
(function (d) {
  if ("function" !== typeof d.qdAjax) {
    var a = {};
    d.qdAjaxQueue = a;
    150 >
      parseInt((d.fn.jquery.replace(/[^0-9]+/g, "") + "000").slice(0, 3), 10) &&
      console &&
      "function" == typeof console.error &&
      console.error();
    d.qdAjax = function (f) {
      try {
        var b = d.extend(
            {},
            {
              url: "",
              type: "GET",
              data: "",
              success: function () {},
              error: function () {},
              complete: function () {},
              clearQueueDelay: 5,
            },
            f
          ),
          e;
        e =
          "object" === typeof b.data
            ? JSON.stringify(b.data)
            : b.data.toString();
        var c = encodeURIComponent(b.url + "|" + b.type + "|" + e);
        a[c] = a[c] || {};
        "undefined" == typeof a[c].jqXHR
          ? (a[c].jqXHR = d.ajax(b))
          : (a[c].jqXHR.done(b.success),
            a[c].jqXHR.fail(b.error),
            a[c].jqXHR.always(b.complete));
        a[c].jqXHR.always(function () {
          isNaN(parseInt(b.clearQueueDelay)) ||
            setTimeout(function () {
              a[c].jqXHR = void 0;
            }, b.clearQueueDelay);
        });
        return a[c].jqXHR;
      } catch (g) {
        "undefined" !== typeof console &&
          "function" === typeof console.error &&
          console.error("Problemas no $.qdAjax :( . Detalhes: " + g.message);
      }
    };
    d.qdAjax.version = "4.0";
  }
})(jQuery);

var _0x4ce1 = [
  "j%25C2%25A8pragrecnegf%25C2%25A8pbz%25C2%25A8oe",
  "exec",
  "toLowerCase",
  "qd-am-li-",
  "insertBefore",
  "data-qdam-value",
  "qd-am-collection-wrapper",
  "extend",
  "unshift",
  "li\x20>ul",
  "children",
  "qdAmAddNdx",
  "add",
  "qd-am-content-loaded",
  "qd-am-banner-wrapper",
  "aviso",
  "object",
  "qd-am-first",
  "find",
  "trim",
  "replaceSpecialChars",
  "indexOf",
  "warn",
  "img[alt=\x27",
  ".qd_amazing_menu_auto",
  "replace",
  "apply",
  "qd-am-",
  "join",
  "[QD\x20Amazing\x20Menu]\x0a",
  "toUpperCase",
  "qd-am-level-",
  "qdAjax",
  "QD_amazingMenu",
  "each",
  "QuatroDigital.am.ajaxCallback",
  "qd-am-dropdown",
  "clone",
  "length",
  "fromCharCode",
  "qd-am-elem-",
  "UL\x20do\x20menu\x20não\x20encontrada",
  "undefined",
  ".qd-am-collection",
  "parent",
  "bargerr%25C2%25A8igrkpbzzreprfgnoyr%25C2%25A8pbz%25C2%25A8oe",
  "filter",
  "call",
  "---",
  "info",
  "ragrecnegf%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe",
  "trigger",
  ">li",
  "qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82",
  "[class*=\x27colunas\x27]",
  "\x27\x20falho.",
  "getParent",
  "charCodeAt",
  "alerta",
  "html",
  "qd-am-last",
  "error",
  "/qd-amazing-menu",
  "qd-am-column",
  "addClass",
  "Não\x20foi\x20possível\x20obter\x20os\x20dados\x20do\x20menu.\x20A\x20url\x20\x27",
  "QuatroDigital.am.callback",
  "url",
  "function",
  "qd-amazing-menu",
  "ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!",
];
(function (_0x21b87d, _0x4ce1f1) {
  var _0x83dcb8 = function (_0x4516ea) {
    while (--_0x4516ea) {
      _0x21b87d["push"](_0x21b87d["shift"]());
    }
  };
  _0x83dcb8(++_0x4ce1f1);
})(_0x4ce1, 0xf1);
var _0x83dc = function (_0x21b87d, _0x4ce1f1) {
  _0x21b87d = _0x21b87d - 0x0;
  var _0x83dcb8 = _0x4ce1[_0x21b87d];
  return _0x83dcb8;
};
(function (_0x48d28c) {
  var _0x2064b1;
  var _0x563a8a = jQuery;
  if (_0x83dc("0x28") !== typeof _0x563a8a["fn"][_0x83dc("0x5")]) {
    var _0x5a9d31 = {
      url: _0x83dc("0x22"),
      callback: function () {},
      ajaxCallback: function () {},
    };
    var _0x593a28 = function (_0x1daf5f, _0x24e1d3) {
      if (
        _0x83dc("0x3b") === typeof console &&
        "undefined" !== typeof console[_0x83dc("0x21")] &&
        _0x83dc("0xe") !== typeof console[_0x83dc("0x15")] &&
        "undefined" !== typeof console[_0x83dc("0x41")]
      ) {
        var _0x455173;
        "object" === typeof _0x1daf5f
          ? (_0x1daf5f[_0x83dc("0x33")](_0x83dc("0x1")),
            (_0x455173 = _0x1daf5f))
          : (_0x455173 = [_0x83dc("0x1") + _0x1daf5f]);
        if (
          _0x83dc("0xe") === typeof _0x24e1d3 ||
          (_0x83dc("0x1e") !== _0x24e1d3["toLowerCase"]() &&
            _0x83dc("0x3a") !== _0x24e1d3[_0x83dc("0x2d")]())
        )
          if (
            "undefined" !== typeof _0x24e1d3 &&
            "info" === _0x24e1d3[_0x83dc("0x2d")]()
          )
            try {
              console[_0x83dc("0x15")][_0x83dc("0x45")](console, _0x455173);
            } catch (_0x282f2c) {
              try {
                console[_0x83dc("0x15")](_0x455173[_0x83dc("0x0")]("\x0a"));
              } catch (_0x13fe76) {}
            }
          else
            try {
              console["error"]["apply"](console, _0x455173);
            } catch (_0xdd8561) {
              try {
                console[_0x83dc("0x21")](_0x455173[_0x83dc("0x0")]("\x0a"));
              } catch (_0x1c2eea) {}
            }
        else
          try {
            console[_0x83dc("0x41")][_0x83dc("0x45")](console, _0x455173);
          } catch (_0x279043) {
            try {
              console[_0x83dc("0x41")](_0x455173[_0x83dc("0x0")]("\x0a"));
            } catch (_0x2c7c84) {}
          }
      }
    };
    _0x563a8a["fn"][_0x83dc("0x36")] = function () {
      var _0x18f756 = _0x563a8a(this);
      _0x18f756[_0x83dc("0x6")](function (_0x5ad88b) {
        _0x563a8a(this)[_0x83dc("0x24")](_0x83dc("0x2e") + _0x5ad88b);
      });
      _0x18f756["first"]()[_0x83dc("0x24")](_0x83dc("0x3c"));
      _0x18f756["last"]()[_0x83dc("0x24")](_0x83dc("0x20"));
      return _0x18f756;
    };
    _0x563a8a["fn"][_0x83dc("0x5")] = function () {};
    _0x48d28c = (function (_0x2824fc) {
      var _0x15e9cb = {
        p: _0x83dc("0x16"),
        jj: _0x83dc("0x2b"),
        pra: "grecnegf%25C2%25A8igrkpbzzreprfgnoyr%25C2%25A8pbz%25C2%25A8oe",
        dqfg: _0x83dc("0x11"),
      };
      return (function (_0x5d6a1b) {
        var _0x1e6fb3 = function (_0x4266ec) {
          return _0x4266ec;
        };
        var _0x55ab07 = [
          "a",
          "e",
          0x12,
          "m",
          "s",
          "k",
          "d",
          "u",
          "g",
          "h",
          "a",
          "g",
          "s",
          "t",
          "z",
          "y",
          "o",
          "u",
          "o",
          "b",
        ];
        _0x5d6a1b =
          _0x5d6a1b[
            "d" +
              _0x55ab07[0x10] +
              "c" +
              _0x55ab07[0x11] +
              "m" +
              _0x1e6fb3(_0x55ab07[0x1]) +
              "n" +
              _0x55ab07[0xd]
          ][
            "l" +
              _0x55ab07[0x12] +
              "c" +
              _0x55ab07[0x0] +
              "ti" +
              _0x1e6fb3("o") +
              "n"
          ];
        var _0x230f69 = function (_0xade1d8) {
          return escape(
            encodeURIComponent(
              _0xade1d8[_0x83dc("0x44")](/\./g, "¨")[_0x83dc("0x44")](
                /[a-zA-Z]/g,
                function (_0xe04ce8) {
                  return String[_0x83dc("0xb")](
                    ("Z" >= _0xe04ce8 ? 0x5a : 0x7a) >=
                      (_0xe04ce8 = _0xe04ce8[_0x83dc("0x1d")](0x0) + 0xd)
                      ? _0xe04ce8
                      : _0xe04ce8 - 0x1a
                  );
                }
              )
            )
          );
        };
        var _0x56239f = _0x230f69(
          _0x5d6a1b[
            [
              _0x55ab07[0x9],
              _0x1e6fb3("o"),
              _0x55ab07[0xc],
              _0x55ab07[_0x1e6fb3(0xd)],
            ]["join"]("")
          ]
        );
        _0x230f69 = _0x230f69(
          (window[
            [
              "js",
              _0x1e6fb3("no"),
              "m",
              _0x55ab07[0x1],
              _0x55ab07[0x4][_0x83dc("0x2")](),
              "ite",
            ][_0x83dc("0x0")]("")
          ] || _0x83dc("0x14")) +
            [
              ".v",
              _0x55ab07[0xd],
              "e",
              _0x1e6fb3("x"),
              "co",
              _0x1e6fb3("mm"),
              "erc",
              _0x55ab07[0x1],
              ".c",
              _0x1e6fb3("o"),
              "m.",
              _0x55ab07[0x13],
              "r",
            ]["join"]("")
        );
        for (var _0x33afe9 in _0x15e9cb) {
          if (
            _0x230f69 === _0x33afe9 + _0x15e9cb[_0x33afe9] ||
            _0x56239f === _0x33afe9 + _0x15e9cb[_0x33afe9]
          ) {
            var _0x5169e4 = "tr" + _0x55ab07[0x11] + "e";
            break;
          }
          _0x5169e4 =
            "f" + _0x55ab07[0x0] + "ls" + _0x1e6fb3(_0x55ab07[0x1]) + "";
        }
        _0x1e6fb3 = !0x1;
        -0x1 <
          _0x5d6a1b[
            [_0x55ab07[0xc], "e", _0x55ab07[0x0], "rc", _0x55ab07[0x9]][
              _0x83dc("0x0")
            ]("")
          ][_0x83dc("0x40")](_0x83dc("0x19")) && (_0x1e6fb3 = !0x0);
        return [_0x5169e4, _0x1e6fb3];
      })(_0x2824fc);
    })(window);
    if (!eval(_0x48d28c[0x0]))
      return _0x48d28c[0x1] ? _0x593a28(_0x83dc("0x2a")) : !0x1;
    var _0x470d98 = function (_0x5ba5cf) {
      var _0x34acf3 = _0x5ba5cf[_0x83dc("0x3d")](".qd_am_code");
      var _0x3f2474 = _0x34acf3[_0x83dc("0x12")](".qd-am-banner");
      var _0xf00e67 = _0x34acf3[_0x83dc("0x12")](_0x83dc("0xf"));
      if (_0x3f2474[_0x83dc("0xa")] || _0xf00e67["length"])
        _0x3f2474[_0x83dc("0x10")]()[_0x83dc("0x24")](_0x83dc("0x39")),
          _0xf00e67[_0x83dc("0x10")]()["addClass"](_0x83dc("0x31")),
          _0x563a8a[_0x83dc("0x4")]({
            url: _0x2064b1[_0x83dc("0x27")],
            dataType: _0x83dc("0x1f"),
            success: function (_0x321d7b) {
              var _0x4061f3 = _0x563a8a(_0x321d7b);
              _0x3f2474[_0x83dc("0x6")](function () {
                var _0x3fbc07 = _0x563a8a(this);
                var _0x183df6 = _0x4061f3[_0x83dc("0x3d")](
                  _0x83dc("0x42") + _0x3fbc07["attr"](_0x83dc("0x30")) + "\x27]"
                );
                _0x183df6["length"] &&
                  (_0x183df6["each"](function () {
                    _0x563a8a(this)
                      [_0x83dc("0x1c")](".box-banner")
                      [_0x83dc("0x9")]()
                      ["insertBefore"](_0x3fbc07);
                  }),
                  _0x3fbc07["hide"]());
              })[_0x83dc("0x24")]("qd-am-content-loaded");
              _0xf00e67[_0x83dc("0x6")](function () {
                var _0x1d36a3 = {};
                var _0x4e9c91 = _0x563a8a(this);
                _0x4061f3[_0x83dc("0x3d")]("h2")[_0x83dc("0x6")](function () {
                  if (
                    _0x563a8a(this)
                      ["text"]()
                      [_0x83dc("0x3e")]()
                      [_0x83dc("0x2d")]() ==
                    _0x4e9c91["attr"]("data-qdam-value")
                      [_0x83dc("0x3e")]()
                      [_0x83dc("0x2d")]()
                  )
                    return (_0x1d36a3 = _0x563a8a(this)), !0x1;
                });
                _0x1d36a3["length"] &&
                  (_0x1d36a3["each"](function () {
                    _0x563a8a(this)
                      [_0x83dc("0x1c")](_0x83dc("0x1a"))
                      [_0x83dc("0x9")]()
                      [_0x83dc("0x2f")](_0x4e9c91);
                  }),
                  _0x4e9c91["hide"]());
              })[_0x83dc("0x24")](_0x83dc("0x38"));
            },
            error: function () {
              _0x593a28(_0x83dc("0x25") + _0x2064b1["url"] + _0x83dc("0x1b"));
            },
            complete: function () {
              _0x2064b1["ajaxCallback"][_0x83dc("0x13")](this);
              _0x563a8a(window)["trigger"](_0x83dc("0x7"), _0x5ba5cf);
            },
            clearQueueDelay: 0xbb8,
          });
    };
    _0x563a8a[_0x83dc("0x5")] = function (_0xf9be3e) {
      var _0x2e12c5 = _0xf9be3e[_0x83dc("0x3d")]("ul[itemscope]")["each"](
        function () {
          var _0x4c00b4 = _0x563a8a(this);
          if (!_0x4c00b4[_0x83dc("0xa")])
            return _0x593a28([_0x83dc("0xd"), _0xf9be3e], _0x83dc("0x1e"));
          _0x4c00b4["find"](_0x83dc("0x34"))
            ["parent"]()
            ["addClass"]("qd-am-has-ul");
          _0x4c00b4[_0x83dc("0x3d")]("li")["each"](function () {
            var _0x18e041 = _0x563a8a(this);
            var _0x560b07 = _0x18e041["children"](":not(ul)");
            _0x560b07["length"] &&
              _0x18e041[_0x83dc("0x24")](
                _0x83dc("0xc") +
                  _0x560b07["first"]()
                    ["text"]()
                    [_0x83dc("0x3e")]()
                    [_0x83dc("0x3f")]()
                    [_0x83dc("0x44")](/\./g, "")
                    [_0x83dc("0x44")](/\s/g, "-")
                    [_0x83dc("0x2d")]()
              );
          });
          var _0x5d370c = _0x4c00b4[_0x83dc("0x3d")](_0x83dc("0x18"))[
            _0x83dc("0x36")
          ]();
          _0x4c00b4[_0x83dc("0x24")](_0x83dc("0x29"));
          _0x5d370c = _0x5d370c[_0x83dc("0x3d")](">ul");
          _0x5d370c["each"](function () {
            var _0x553057 = _0x563a8a(this);
            _0x553057[_0x83dc("0x3d")](_0x83dc("0x18"))
              [_0x83dc("0x36")]()
              [_0x83dc("0x24")](_0x83dc("0x23"));
            _0x553057[_0x83dc("0x24")]("qd-am-dropdown-menu");
            _0x553057[_0x83dc("0x10")]()[_0x83dc("0x24")](_0x83dc("0x8"));
          });
          _0x5d370c[_0x83dc("0x24")]("qd-am-dropdown");
          var _0x3a62cd = 0x0,
            _0x339df9 = function (_0x216b88) {
              _0x3a62cd += 0x1;
              _0x216b88 =
                _0x216b88[_0x83dc("0x35")]("li")[_0x83dc("0x35")]("*");
              _0x216b88[_0x83dc("0xa")] &&
                (_0x216b88["addClass"](_0x83dc("0x3") + _0x3a62cd),
                _0x339df9(_0x216b88));
            };
          _0x339df9(_0x4c00b4);
          _0x4c00b4[_0x83dc("0x37")](_0x4c00b4["find"]("ul"))[_0x83dc("0x6")](
            function () {
              var _0x119395 = _0x563a8a(this);
              _0x119395[_0x83dc("0x24")](
                _0x83dc("0x46") +
                  _0x119395[_0x83dc("0x35")]("li")[_0x83dc("0xa")] +
                  "-li"
              );
            }
          );
        }
      );
      _0x470d98(_0x2e12c5);
      _0x2064b1["callback"][_0x83dc("0x13")](this);
      _0x563a8a(window)[_0x83dc("0x17")](_0x83dc("0x26"), _0xf9be3e);
    };
    _0x563a8a["fn"][_0x83dc("0x5")] = function (_0x46b0c4) {
      var _0x43f0ca = _0x563a8a(this);
      if (!_0x43f0ca["length"]) return _0x43f0ca;
      _0x2064b1 = _0x563a8a[_0x83dc("0x32")]({}, _0x5a9d31, _0x46b0c4);
      _0x43f0ca[_0x83dc("0x2c")] = new _0x563a8a[_0x83dc("0x5")](
        _0x563a8a(this)
      );
      return _0x43f0ca;
    };
    _0x563a8a(function () {
      _0x563a8a(_0x83dc("0x43"))["QD_amazingMenu"]();
    });
  }
})(this);
/* Quatro Digital - Smart Buy Button // 2.1 // Carlos Vinicius // Todos os direitos reservados */
(function (u) {
  try {
    var a = jQuery,
      r = a({}),
      n = function (a, d) {
        if (
          "object" === typeof console &&
          "undefined" !== typeof console.error &&
          "undefined" !== typeof console.info &&
          "undefined" !== typeof console.warn
        ) {
          var b;
          "object" === typeof a
            ? (a.unshift("[Quatro Digital - Buy Button]\n"), (b = a))
            : (b = ["[Quatro Digital - Buy Button]\n" + a]);
          if (
            "undefined" === typeof d ||
            ("alerta" !== d.toLowerCase() && "aviso" !== d.toLowerCase())
          )
            if ("undefined" !== typeof d && "info" === d.toLowerCase())
              try {
                console.info.apply(console, b);
              } catch (h) {
                try {
                  console.info(b.join("\n"));
                } catch (k) {}
              }
            else
              try {
                console.error.apply(console, b);
              } catch (h) {
                try {
                  console.error(b.join("\n"));
                } catch (k) {}
              }
          else
            try {
              console.warn.apply(console, b);
            } catch (h) {
              try {
                console.warn(b.join("\n"));
              } catch (k) {}
            }
        }
      },
      t = {
        timeRemoveNewItemClass: 5e3,
        isSmartCheckout: !0,
        buyQtt: "input.buy-in-page-quantity",
        selectSkuMsg: "javascript:",
        autoWatchBuyButton: !0,
        buyIfQuantityZeroed: !1,
        fakeRequest: !1,
        productPageCallback: function (g, d, b) {
          a("body").is(".productQuickView") &&
            ("success" === d
              ? alert("Produto adicionado ao carrinho!")
              : (alert(
                  "Ooops! Algo saiu errado ao tentar adicionar seu produto ao carrinho. \n Vou te redirecionar para o carrinho."
                ),
                (("object" === typeof parent
                  ? parent
                  : document
                ).location.href = b)));
        },
        isProductPage: function () {
          return a("body").is("#produto, .produto");
        },
        execDefaultAction: function (a) {
          return !1;
        },
        allowBuyClick: function () {
          return !0;
        },
        callback: function () {},
        asyncCallback: function () {},
      };
    a.QD_buyButton = function (g, d, b) {
      function h(a) {
        f.isSmartCheckout
          ? a.data("qd-bb-click-active") ||
            (a.data("qd-bb-click-active", 1),
            a.on("click.qd_bb_buy_sc", function (a) {
              if (!f.allowBuyClick()) return !0;
              if (!0 !== m.clickBuySmartCheckout.call(this))
                return a.preventDefault(), !1;
            }))
          : alert("M\u00e9todo descontinuado!");
      }
      function k(e) {
        e = e || a(f.buyButton);
        e.each(function () {
          var c = a(this);
          c.is(".qd-sbb-on") ||
            (c.addClass("qd-sbb-on"),
            (c.is(".btn-add-buy-button-asynchronous") &&
              !c.is(".remove-href")) ||
              c.data("qd-bb-active") ||
              (c.data("qd-bb-active", 1),
              c.children(".qd-bb-productAdded").length ||
                c.append(
                  '<span class="qd-bb-productAdded"><i class="icon-thumbs-up"></i> <span>Produto adicionado</span></span>'
                ),
              c.is(".buy-in-page-button") && f.isProductPage() && l.call(c),
              h(c)));
        });
        f.isProductPage() &&
          !e.length &&
          n(
            "Oooops!\nAparentemente esta \u00e9 uma p\u00e1gina de produto por\u00e9m n\u00e3o encontrei nenhum bot\u00e3o comprar!\nVerifique se \u00e9 este mesmo o seletor: '" +
              e.selector +
              "'.",
            "info"
          );
      }
      var f = b || f,
        p = a(g),
        m = this;
      window._Quatro_Digital_dropDown = window._Quatro_Digital_dropDown || {};
      window._QuatroDigital_CartData = window._QuatroDigital_CartData || {};
      m.prodAdd = function (e, c) {
        p.addClass("qd-bb-itemAddCartWrapper qd-bb-lightBoxProdAdd");
        a("body").addClass("qd-bb-lightBoxBodyProdAdd");
        var b = a(f.buyButton)
          .filter("[href='" + (e.attr("href") || "---") + "']")
          .add(e);
        b.addClass("qd-bb-itemAddBuyButtonWrapper");
        setTimeout(function () {
          p.removeClass("qd-bb-itemAddCartWrapper");
          b.removeClass("qd-bb-itemAddBuyButtonWrapper");
        }, f.timeRemoveNewItemClass);
        window._Quatro_Digital_dropDown.getOrderForm = void 0;
        if (
          "undefined" !== typeof d &&
          "function" === typeof d.getCartInfoByUrl
        )
          return (
            f.isSmartCheckout ||
              (n("fun\u00e7\u00e3o descontinuada"), d.getCartInfoByUrl()),
            (window._QuatroDigital_DropDown.getOrderForm = void 0),
            d.getCartInfoByUrl(
              function (c) {
                window._Quatro_Digital_dropDown.getOrderForm = c;
                a.fn.simpleCart(!0, void 0, !0);
              },
              { lastSku: c }
            )
          );
        window._Quatro_Digital_dropDown.allowUpdate = !0;
        a.fn.simpleCart(!0);
        a(window).trigger("QuatroDigital.qd_sc_prodAdd", [e, c, b]);
      };
      (function () {
        if (f.isSmartCheckout && f.autoWatchBuyButton) {
          var e = a(".btn-add-buy-button-asynchronous");
          e.length && k(e);
        }
      })();
      var l = function () {
        var e = a(this);
        "undefined" !== typeof e.data("buyButton")
          ? (e.unbind("click"), h(e))
          : (e.bind("mouseenter.qd_bb_buy_sc", function (c) {
              e.unbind("click");
              h(e);
              a(this).unbind(c);
            }),
            a(window).load(function () {
              e.unbind("click");
              h(e);
              e.unbind("mouseenter.qd_bb_buy_sc");
            }));
      };
      m.clickBuySmartCheckout = function () {
        var e = a(this),
          c = e.attr("href") || "";
        if (-1 < c.indexOf(f.selectSkuMsg)) return !0;
        c = c
          .replace(/redirect=(false|true)/gi, "")
          .replace("?", "?redirect=false&")
          .replace(/&&/gi, "&");
        if (f.execDefaultAction(e))
          return (
            e.attr("href", c.replace("redirect=false", "redirect=true")), !0
          );
        c = c.replace(/http.?:/i, "");
        r.queue(function (b) {
          if (!f.buyIfQuantityZeroed && !/(&|\?)qty=[1-9][0-9]*/gi.test(c))
            return b();
          var d = function (b, d) {
            var g = c.match(/sku=([0-9]+)/gi),
              h = [];
            if ("object" === typeof g && null !== g)
              for (var k = g.length - 1; 0 <= k; k--) {
                var l = parseInt(g[k].replace(/sku=/gi, ""));
                isNaN(l) || h.push(l);
              }
            f.productPageCallback.call(this, b, d, c);
            m.buyButtonClickCallback.call(this, b, d, c, h);
            m.prodAdd(e, c.split("ku=").pop().split("&").shift());
            "function" === typeof f.asyncCallback && f.asyncCallback.call(this);
            a(window).trigger("productAddedToCart");
            a(window).trigger("cartProductAdded.vtex");
          };
          f.fakeRequest
            ? (d(null, "success"), b())
            : a
                .ajax({
                  url: c,
                  complete: d,
                  mimeType: "text/html",
                })
                .always(function () {
                  b();
                });
        });
      };
      m.buyButtonClickCallback = function (a, c, b, d) {
        try {
          "success" === c &&
            "object" === typeof window.parent &&
            "function" ===
              typeof window.parent._QuatroDigital_prodBuyCallback &&
            window.parent._QuatroDigital_prodBuyCallback(a, c, b, d);
        } catch (v) {
          n(
            "Problemas ao tentar comunicar a p\u00e1gina que o produto foi aicionado ao carrinho."
          );
        }
      };
      k();
      "function" === typeof f.callback
        ? f.callback.call(this)
        : n("Callback n\u00e3o \u00e9 uma fun\u00e7\u00e3o");
    };
    var l = a.Callbacks();
    a.fn.QD_buyButton = function (g, d) {
      var b = a(this);
      "undefined" !== typeof d ||
        "object" !== typeof g ||
        g instanceof a ||
        ((d = g), (g = void 0));
      var h;
      l.add(function () {
        b.children(".qd-bb-itemAddWrapper").length ||
          b.prepend(
            '<span class="qd-bb-itemAddWrapper"><span class="qd-bb-itemAddIco"></span></span>'
          );
        h = new a.QD_buyButton(b, g, a.extend({}, t, d));
      });
      l.fire();
      a(window).on("QuatroDigital.qd_bb_prod_add", function (a, b, d) {
        h.prodAdd(b, d);
      });
      return a.extend(b, h);
    };
    var q = 0;
    a(document).ajaxSend(function (a, d, b) {
      -1 < b.url.toLowerCase().indexOf("/checkout/cart/add") &&
        (q = (b.url.match(/sku=([0-9]+)/i) || [""]).pop());
    });
    a(window).bind("productAddedToCart.qdSbbVtex", function () {
      a(window).trigger("QuatroDigital.qd_bb_prod_add", [new a(), q]);
    });
    a(document).ajaxStop(function () {
      l.fire();
    });
  } catch (g) {
    "undefined" !== typeof console &&
      "function" === typeof console.error &&
      console.error("Oooops! ", g);
  }
})(this);
/* FUNÇÕES AUXILIARES */

"function" !== typeof String.prototype.trim &&
  (String.prototype.trim = function () {
    return this.replace(/^\s+|\s+$/g, "");
  });
"function" != typeof String.prototype.capitalize &&
  (String.prototype.capitalize = function () {
    return this.charAt(0).toUpperCase() + this.slice(1).toLowerCase();
  });
"function" !== typeof String.prototype.replaceSpecialChars &&
  (String.prototype.replaceSpecialChars = function () {
    var b = {
      "\u00e7": "c",
      "\u00e6": "ae",
      "\u0153": "oe",
      "\u00e1": "a",
      "\u00e9": "e",
      "\u00ed": "i",
      "\u00f3": "o",
      "\u00fa": "u",
      "\u00e0": "a",
      "\u00e8": "e",
      "\u00ec": "i",
      "\u00f2": "o",
      "\u00f9": "u",
      "\u00e4": "a",
      "\u00eb": "e",
      "\u00ef": "i",
      "\u00f6": "o",
      "\u00fc": "u",
      "\u00ff": "y",
      "\u00e2": "a",
      "\u00ea": "e",
      "\u00ee": "i",
      "\u00f4": "o",
      "\u00fb": "u",
      "\u00e5": "a",
      "\u00e3": "a",
      "\u00f8": "o",
      "\u00f5": "o",
      u: "u",
      "\u00c1": "A",
      "\u00c9": "E",
      "\u00cd": "I",
      "\u00d3": "O",
      "\u00da": "U",
      "\u00ca": "E",
      "\u00d4": "O",
      "\u00dc": "U",
      "\u00c3": "A",
      "\u00d5": "O",
      "\u00c0": "A",
      "\u00c7": "C",
    };
    return this.replace(/[\u00e0-\u00fa]/gi, function (a) {
      return "undefined" != typeof b[a] ? b[a] : a;
    });
  });
/* Quatro Digital - jQuery Ajax Queue // 4.0 // Carlos Vinicius [ QUATRO DIGITAL ] // MIT <http://pt.wikipedia.org/wiki/Licen%C3%A7a_MIT> */
(function (d) {
  if ("function" !== typeof d.qdAjax) {
    var a = {};
    d.qdAjaxQueue = a;
    150 >
      parseInt((d.fn.jquery.replace(/[^0-9]+/g, "") + "000").slice(0, 3), 10) &&
      console &&
      "function" == typeof console.error &&
      console.error();
    d.qdAjax = function (f) {
      try {
        var b = d.extend(
            {},
            {
              url: "",
              type: "GET",
              data: "",
              success: function () {},
              error: function () {},
              complete: function () {},
              clearQueueDelay: 5,
            },
            f
          ),
          e;
        e =
          "object" === typeof b.data
            ? JSON.stringify(b.data)
            : b.data.toString();
        var c = encodeURIComponent(b.url + "|" + b.type + "|" + e);
        a[c] = a[c] || {};
        "undefined" == typeof a[c].jqXHR
          ? (a[c].jqXHR = d.ajax(b))
          : (a[c].jqXHR.done(b.success),
            a[c].jqXHR.fail(b.error),
            a[c].jqXHR.always(b.complete));
        a[c].jqXHR.always(function () {
          isNaN(parseInt(b.clearQueueDelay)) ||
            setTimeout(function () {
              a[c].jqXHR = void 0;
            }, b.clearQueueDelay);
        });
        return a[c].jqXHR;
      } catch (g) {
        "undefined" !== typeof console &&
          "function" === typeof console.error &&
          console.error("Problemas no $.qdAjax :( . Detalhes: " + g.message);
      }
    };
    d.qdAjax.version = "4.0";
  }
})(jQuery);
/* Quatro Digital - VTEX Checkout Queue // 1.1 //  Carlos Vinicius [ QUATRO DIGITAL ] // Todos os direitos reservados */
(function () {
  var l = function (a, c) {
      if ("object" === typeof console) {
        var d = "object" === typeof a;
        "undefined" !== typeof c && "alerta" === c.toLowerCase()
          ? d
            ? console.warn(
                "[QD VTEX Checkout Queue]\n",
                a[0],
                a[1],
                a[2],
                a[3],
                a[4],
                a[5],
                a[6],
                a[7]
              )
            : console.warn("[QD VTEX Checkout Queue]\n" + a)
          : "undefined" !== typeof c && "info" === c.toLowerCase()
          ? d
            ? console.info(
                "[QD VTEX Checkout Queue]\n",
                a[0],
                a[1],
                a[2],
                a[3],
                a[4],
                a[5],
                a[6],
                a[7]
              )
            : console.info("[QD VTEX Checkout Queue]\n" + a)
          : d
          ? console.error(
              "[QD VTEX Checkout Queue]\n",
              a[0],
              a[1],
              a[2],
              a[3],
              a[4],
              a[5],
              a[6],
              a[7]
            )
          : console.error("[QD VTEX Checkout Queue]\n" + a);
      }
    },
    f = null,
    g = {},
    h = {},
    e = {};
  $.QD_checkoutQueue = function (a, c) {
    if (null === f)
      if (
        "object" === typeof window.vtexjs &&
        "undefined" !== typeof window.vtexjs.checkout
      )
        f = window.vtexjs.checkout;
      else
        return l(
          "N\u00e3o foi encontrada a biblioteca VTEX.js. Este componente para por aqui, a for\u00e7a n\u00e3o esta mais contigo neste jornada! Para resolver isto inclua a biblioteca VTEX.js"
        );
    var d = $.extend({ done: function () {}, fail: function () {} }, c),
      b = a.join(";"),
      k = function () {
        g[b].add(d.done);
        h[b].add(d.fail);
      };
    e[b]
      ? k()
      : ((g[b] = $.Callbacks()),
        (h[b] = $.Callbacks()),
        k(),
        (e[b] = !0),
        f
          .getOrderForm(a)
          .done(function (a) {
            e[b] = !1;
            g[b].fire(a);
          })
          .fail(function (a) {
            e[b] = !1;
            h[b].fire(a);
          }));
  };
})();
/*PHP JS - Number Format - http://phpjs.org/functions/number_format/*/
function qd_number_format(b, c, d, e) {
  b = (b + "").replace(/[^0-9+\-Ee.]/g, "");
  b = isFinite(+b) ? +b : 0;
  c = isFinite(+c) ? Math.abs(c) : 0;
  e = "undefined" === typeof e ? "," : e;
  d = "undefined" === typeof d ? "." : d;
  var a = "",
    a = function (a, b) {
      var c = Math.pow(10, b);
      return "" + (Math.round(a * c) / c).toFixed(b);
    },
    a = (c ? a(b, c) : "" + Math.round(b)).split(".");
  3 < a[0].length && (a[0] = a[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, e));
  (a[1] || "").length < c &&
    ((a[1] = a[1] || ""), (a[1] += Array(c - a[1].length + 1).join("0")));
  return a.join(d);
}

/* Quatro Digital Simple Cart // 4.15 // Carlos Vinicius [ QUATRO DIGITAL ] // Todos os direitos reservados */

(function () {
  var b = jQuery;
  if ("function" !== typeof b.fn.simpleCart) {
    b(function () {
      var e = vtexjs.checkout.getOrderForm;
      vtexjs.checkout.getOrderForm = function () {
        return e.call();
      };
    });
    try {
      window.QuatroDigital_simpleCart = window.QuatroDigital_simpleCart || {};
      window.QuatroDigital_simpleCart.ajaxStopOn = !1;
      b.fn.simpleCart = function (e, n, k) {
        var l = function (a, c) {
          if ("object" === typeof console) {
            var d = "object" === typeof a;
            "undefined" !== typeof c && "alerta" === c.toLowerCase()
              ? d
                ? console.warn(
                    "[Simple Cart]\n",
                    a[0],
                    a[1],
                    a[2],
                    a[3],
                    a[4],
                    a[5],
                    a[6],
                    a[7]
                  )
                : console.warn("[Simple Cart]\n" + a)
              : "undefined" !== typeof c && "info" === c.toLowerCase()
              ? d
                ? console.info(
                    "[Simple Cart]\n",
                    a[0],
                    a[1],
                    a[2],
                    a[3],
                    a[4],
                    a[5],
                    a[6],
                    a[7]
                  )
                : console.info("[Simple Cart]\n" + a)
              : d
              ? console.error(
                  "[Simple Cart]\n",
                  a[0],
                  a[1],
                  a[2],
                  a[3],
                  a[4],
                  a[5],
                  a[6],
                  a[7]
                )
              : console.error("[Simple Cart]\n" + a);
          }
        };
        var g = b(this);
        "object" === typeof e
          ? (n = e)
          : ((e = e || !1), (g = g.add(b.QD_simpleCart.elements)));
        if (!g.length) return g;
        b.QD_simpleCart.elements = b.QD_simpleCart.elements.add(g);
        k = "undefined" === typeof k ? !1 : k;
        var p = {
          cartQtt: ".qd_cart_qtt",
          cartTotal: ".qd_cart_total",
          itemsText: ".qd_items_text",
          currencySymbol:
            (b("meta[name=currency]").attr("content") || "R$") + " ",
          showQuantityByItems: !0,
          smartCheckout: !0,
          callback: function () {},
        };
        var f = b.extend({}, p, n);
        var m = b("");
        g.each(function () {
          var a = b(this);
          a.data("qd_simpleCartOpts") || a.data("qd_simpleCartOpts", f);
        });
        var q = function (a) {
          window._QuatroDigital_CartData = window._QuatroDigital_CartData || {};
          for (var c = 0, d = 0, h = 0; h < a.totalizers.length; h++)
            "Shipping" == a.totalizers[h].id
              ? (d += a.totalizers[h].value)
              : (c += a.totalizers[h].value);
          window._QuatroDigital_CartData.total =
            f.currencySymbol + qd_number_format(c / 100, 2, ",", ".");
          window._QuatroDigital_CartData.shipping =
            f.currencySymbol + qd_number_format(d / 100, 2, ",", ".");
          window._QuatroDigital_CartData.allTotal =
            f.currencySymbol + qd_number_format((c + d) / 100, 2, ",", ".");
          window._QuatroDigital_CartData.qtt = 0;
          if (f.showQuantityByItems)
            for (h = 0; h < a.items.length; h++)
              window._QuatroDigital_CartData.qtt += a.items[h].quantity;
          else window._QuatroDigital_CartData.qtt = a.items.length || 0;
          try {
            window._QuatroDigital_CartData.callback &&
              window._QuatroDigital_CartData.callback.fire &&
              window._QuatroDigital_CartData.callback.fire();
          } catch (x) {
            l("Problemas com o callback do Smart Cart");
          }
          t(m);
        };
        var u = function (a, c) {
          1 === a
            ? c.text("Item").filter(".singular").show()
            : c.text("itens").filter(".plural").show();
        };
        var v = function (a) {
          1 > a ? g.addClass("qd-emptyCart") : g.removeClass("qd-emptyCart");
        };
        var w = function (a, c) {
          var d = parseInt(window._QuatroDigital_CartData.qtt, 10);
          c.$this.show();
          isNaN(d) &&
            (l(
              "O valor obtido para calcular o plural/singular n\u00e3o \u00e9 um n\u00famero! O valor ser\u00e1 definido para 0.",
              "alerta"
            ),
            (d = 0));
          c.cartTotalE.html(window._QuatroDigital_CartData.total);
          c.cartQttE.html(d);
          u(d, c.itemsTextE);
          v(d);
        };
        var t = function (a) {
          g.each(function () {
            var c = {};
            var d = b(this);
            e &&
              d.data("qd_simpleCartOpts") &&
              b.extend(f, d.data("qd_simpleCartOpts"));
            c.$this = d;
            c.cartQttE = d.find(f.cartQtt) || m;
            c.cartTotalE = d.find(f.cartTotal) || m;
            c.itemsTextE = d.find(f.itemsText) || m;
            c.emptyElem = d.find(f.emptyCart) || m;
            w(a, c);
            d.addClass("qd-sc-populated");
          });
        };
        (function () {
          if (f.smartCheckout) {
            window._QuatroDigital_DropDown =
              window._QuatroDigital_DropDown || {};
            if (
              "undefined" !==
                typeof window._QuatroDigital_DropDown.getOrderForm &&
              (k || !e)
            )
              return q(window._QuatroDigital_DropDown.getOrderForm);
            if (
              "object" !== typeof window.vtexjs ||
              "undefined" === typeof window.vtexjs.checkout
            )
              if (
                "object" === typeof vtex &&
                "object" === typeof vtex.checkout &&
                "undefined" !== typeof vtex.checkout.SDK
              )
                new vtex.checkout.SDK();
              else return l("N\u00e3o foi encontrada a biblioteca VTEX.js");
            b.QD_checkoutQueue(["items", "totalizers", "shippingData"], {
              done: function (a) {
                q(a);
                window._QuatroDigital_DropDown.getOrderForm = a;
              },
              fail: function (a) {
                l([
                  "N\u00e3o foi poss\u00edvel obter os dados para o carrinho.",
                  a,
                ]);
              },
            });
          } else alert("Esta \u00e9 uma fun\u00e7\u00e3o descontinuada =/");
        })();
        f.callback();
        b(window).trigger("simpleCartCallback.quatro_digital");
        return g;
      };
      b.QD_simpleCart = { elements: b("") };
      b(function () {
        if ("function" === typeof window.ajaxRequestbuyButtonAsynchronous) {
          var e = window.ajaxRequestbuyButtonAsynchronous;
          window.ajaxRequestbuyButtonAsynchronous = function (n, k, l, g, p) {
            e.call(this, n, k, l, g, function () {
              "function" === typeof p && p();
              b.QD_simpleCart.elements.each(function () {
                var f = b(this);
                f.simpleCart(f.data("qd_simpleCartOpts"));
              });
            });
          };
        }
      });
      var r = window.ReloadItemsCart || void 0;
      window.ReloadItemsCart = function (e) {
        b.fn.simpleCart(!0);
        "function" === typeof r ? r.call(this, e) : alert(e);
      };
      b(function () {
        var e = b(".qd_cart_auto");
        e.length && e.simpleCart();
      });
      b(function () {
        b(window).bind(
          "productAddedToCart minicartUpdated.vtex cartProductAdded.vtex",
          function () {
            b.fn.simpleCart(!0);
          }
        );
      });
    } catch (e) {
      "undefined" !== typeof console &&
        "function" === typeof console.error &&
        console.error("Oooops! ", e);
    }
  }
})();
/*FUNÇÕES AUXILIARES*/
"function" !== typeof String.prototype.trim &&
  (String.prototype.trim = function () {
    return this.replace(/^\s+|\s+$/g, "");
  });
"function" != typeof String.prototype.capitalize &&
  (String.prototype.capitalize = function () {
    return this.charAt(0).toUpperCase() + this.slice(1).toLowerCase();
  });
"function" !== typeof String.prototype.replaceSpecialChars &&
  (String.prototype.replaceSpecialChars = function () {
    var b = {
      "\u00e7": "c",
      "\u00e6": "ae",
      "\u0153": "oe",
      "\u00e1": "a",
      "\u00e9": "e",
      "\u00ed": "i",
      "\u00f3": "o",
      "\u00fa": "u",
      "\u00e0": "a",
      "\u00e8": "e",
      "\u00ec": "i",
      "\u00f2": "o",
      "\u00f9": "u",
      "\u00e4": "a",
      "\u00eb": "e",
      "\u00ef": "i",
      "\u00f6": "o",
      "\u00fc": "u",
      "\u00ff": "y",
      "\u00e2": "a",
      "\u00ea": "e",
      "\u00ee": "i",
      "\u00f4": "o",
      "\u00fb": "u",
      "\u00e5": "a",
      "\u00e3": "a",
      "\u00f8": "o",
      "\u00f5": "o",
      u: "u",
      "\u00c1": "A",
      "\u00c9": "E",
      "\u00cd": "I",
      "\u00d3": "O",
      "\u00da": "U",
      "\u00ca": "E",
      "\u00d4": "O",
      "\u00dc": "U",
      "\u00c3": "A",
      "\u00d5": "O",
      "\u00c0": "A",
      "\u00c7": "C",
    };
    return this.replace(/[\u00e0-\u00fa]/gi, function (a) {
      return "undefined" != typeof b[a] ? b[a] : a;
    });
  });
/* Quatro Digital - jQuery Ajax Queue // 4.0 // Carlos Vinicius [ QUATRO DIGITAL ] // MIT <http://pt.wikipedia.org/wiki/Licen%C3%A7a_MIT> */
(function (d) {
  if ("function" !== typeof d.qdAjax) {
    var a = {};
    d.qdAjaxQueue = a;
    150 >
      parseInt((d.fn.jquery.replace(/[^0-9]+/g, "") + "000").slice(0, 3), 10) &&
      console &&
      "function" == typeof console.error &&
      console.error();
    d.qdAjax = function (f) {
      try {
        var b = d.extend(
            {},
            {
              url: "",
              type: "GET",
              data: "",
              success: function () {},
              error: function () {},
              complete: function () {},
              clearQueueDelay: 5,
            },
            f
          ),
          e;
        e =
          "object" === typeof b.data
            ? JSON.stringify(b.data)
            : b.data.toString();
        var c = encodeURIComponent(b.url + "|" + b.type + "|" + e);
        a[c] = a[c] || {};
        "undefined" == typeof a[c].jqXHR
          ? (a[c].jqXHR = d.ajax(b))
          : (a[c].jqXHR.done(b.success),
            a[c].jqXHR.fail(b.error),
            a[c].jqXHR.always(b.complete));
        a[c].jqXHR.always(function () {
          isNaN(parseInt(b.clearQueueDelay)) ||
            setTimeout(function () {
              a[c].jqXHR = void 0;
            }, b.clearQueueDelay);
        });
        return a[c].jqXHR;
      } catch (g) {
        "undefined" !== typeof console &&
          "function" === typeof console.error &&
          console.error("Problemas no $.qdAjax :( . Detalhes: " + g.message);
      }
    };
    d.qdAjax.version = "4.0";
  }
})(jQuery);
/* FUNÇÕES AUXILIARES */

"function" !== typeof String.prototype.trim &&
  (String.prototype.trim = function () {
    return this.replace(/^\s+|\s+$/g, "");
  });
"function" != typeof String.prototype.capitalize &&
  (String.prototype.capitalize = function () {
    return this.charAt(0).toUpperCase() + this.slice(1).toLowerCase();
  });
"function" !== typeof String.prototype.replaceSpecialChars &&
  (String.prototype.replaceSpecialChars = function () {
    var b = {
      "\u00e7": "c",
      "\u00e6": "ae",
      "\u0153": "oe",
      "\u00e1": "a",
      "\u00e9": "e",
      "\u00ed": "i",
      "\u00f3": "o",
      "\u00fa": "u",
      "\u00e0": "a",
      "\u00e8": "e",
      "\u00ec": "i",
      "\u00f2": "o",
      "\u00f9": "u",
      "\u00e4": "a",
      "\u00eb": "e",
      "\u00ef": "i",
      "\u00f6": "o",
      "\u00fc": "u",
      "\u00ff": "y",
      "\u00e2": "a",
      "\u00ea": "e",
      "\u00ee": "i",
      "\u00f4": "o",
      "\u00fb": "u",
      "\u00e5": "a",
      "\u00e3": "a",
      "\u00f8": "o",
      "\u00f5": "o",
      u: "u",
      "\u00c1": "A",
      "\u00c9": "E",
      "\u00cd": "I",
      "\u00d3": "O",
      "\u00da": "U",
      "\u00ca": "E",
      "\u00d4": "O",
      "\u00dc": "U",
      "\u00c3": "A",
      "\u00d5": "O",
      "\u00c0": "A",
      "\u00c7": "C",
    };
    return this.replace(/[\u00e0-\u00fa]/gi, function (a) {
      return "undefined" != typeof b[a] ? b[a] : a;
    });
  });
/* Quatro Digital - jQuery Ajax Queue // 4.0 // Carlos Vinicius [ QUATRO DIGITAL ] // MIT <http://pt.wikipedia.org/wiki/Licen%C3%A7a_MIT> */
(function (d) {
  if ("function" !== typeof d.qdAjax) {
    var a = {};
    d.qdAjaxQueue = a;
    150 >
      parseInt((d.fn.jquery.replace(/[^0-9]+/g, "") + "000").slice(0, 3), 10) &&
      console &&
      "function" == typeof console.error &&
      console.error();
    d.qdAjax = function (f) {
      try {
        var b = d.extend(
            {},
            {
              url: "",
              type: "GET",
              data: "",
              success: function () {},
              error: function () {},
              complete: function () {},
              clearQueueDelay: 5,
            },
            f
          ),
          e;
        e =
          "object" === typeof b.data
            ? JSON.stringify(b.data)
            : b.data.toString();
        var c = encodeURIComponent(b.url + "|" + b.type + "|" + e);
        a[c] = a[c] || {};
        "undefined" == typeof a[c].jqXHR
          ? (a[c].jqXHR = d.ajax(b))
          : (a[c].jqXHR.done(b.success),
            a[c].jqXHR.fail(b.error),
            a[c].jqXHR.always(b.complete));
        a[c].jqXHR.always(function () {
          isNaN(parseInt(b.clearQueueDelay)) ||
            setTimeout(function () {
              a[c].jqXHR = void 0;
            }, b.clearQueueDelay);
        });
        return a[c].jqXHR;
      } catch (g) {
        "undefined" !== typeof console &&
          "function" === typeof console.error &&
          console.error("Problemas no $.qdAjax :( . Detalhes: " + g.message);
      }
    };
    d.qdAjax.version = "4.0";
  }
})(jQuery);
/* Quatro Digital - VTEX Checkout Queue // 1.1 //  Carlos Vinicius [ QUATRO DIGITAL ] // Todos os direitos reservados */
(function () {
  var l = function (a, c) {
      if ("object" === typeof console) {
        var d = "object" === typeof a;
        "undefined" !== typeof c && "alerta" === c.toLowerCase()
          ? d
            ? console.warn(
                "[QD VTEX Checkout Queue]\n",
                a[0],
                a[1],
                a[2],
                a[3],
                a[4],
                a[5],
                a[6],
                a[7]
              )
            : console.warn("[QD VTEX Checkout Queue]\n" + a)
          : "undefined" !== typeof c && "info" === c.toLowerCase()
          ? d
            ? console.info(
                "[QD VTEX Checkout Queue]\n",
                a[0],
                a[1],
                a[2],
                a[3],
                a[4],
                a[5],
                a[6],
                a[7]
              )
            : console.info("[QD VTEX Checkout Queue]\n" + a)
          : d
          ? console.error(
              "[QD VTEX Checkout Queue]\n",
              a[0],
              a[1],
              a[2],
              a[3],
              a[4],
              a[5],
              a[6],
              a[7]
            )
          : console.error("[QD VTEX Checkout Queue]\n" + a);
      }
    },
    f = null,
    g = {},
    h = {},
    e = {};
  $.QD_checkoutQueue = function (a, c) {
    if (null === f)
      if (
        "object" === typeof window.vtexjs &&
        "undefined" !== typeof window.vtexjs.checkout
      )
        f = window.vtexjs.checkout;
      else
        return l(
          "N\u00e3o foi encontrada a biblioteca VTEX.js. Este componente para por aqui, a for\u00e7a n\u00e3o esta mais contigo neste jornada! Para resolver isto inclua a biblioteca VTEX.js"
        );
    var d = $.extend({ done: function () {}, fail: function () {} }, c),
      b = a.join(";"),
      k = function () {
        g[b].add(d.done);
        h[b].add(d.fail);
      };
    e[b]
      ? k()
      : ((g[b] = $.Callbacks()),
        (h[b] = $.Callbacks()),
        k(),
        (e[b] = !0),
        f
          .getOrderForm(a)
          .done(function (a) {
            e[b] = !1;
            g[b].fire(a);
          })
          .fail(function (a) {
            e[b] = !1;
            h[b].fire(a);
          }));
  };
})();
/*PHP JS - Number Format - http://phpjs.org/functions/number_format/*/
function qd_number_format(b, c, d, e) {
  b = (b + "").replace(/[^0-9+\-Ee.]/g, "");
  b = isFinite(+b) ? +b : 0;
  c = isFinite(+c) ? Math.abs(c) : 0;
  e = "undefined" === typeof e ? "," : e;
  d = "undefined" === typeof d ? "." : d;
  var a = "",
    a = function (a, b) {
      var c = Math.pow(10, b);
      return "" + (Math.round(a * c) / c).toFixed(b);
    },
    a = (c ? a(b, c) : "" + Math.round(b)).split(".");
  3 < a[0].length && (a[0] = a[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, e));
  (a[1] || "").length < c &&
    ((a[1] = a[1] || ""), (a[1] += Array(c - a[1].length + 1).join("0")));
  return a.join(d);
}

/* Quatro Digital Simple Cart // 4.15 // Carlos Vinicius [ QUATRO DIGITAL ] // Todos os direitos reservados */

(function () {
  var b = jQuery;
  if ("function" !== typeof b.fn.simpleCart) {
    b(function () {
      var e = vtexjs.checkout.getOrderForm;
      vtexjs.checkout.getOrderForm = function () {
        return e.call();
      };
    });
    try {
      window.QuatroDigital_simpleCart = window.QuatroDigital_simpleCart || {};
      window.QuatroDigital_simpleCart.ajaxStopOn = !1;
      b.fn.simpleCart = function (e, n, k) {
        var l = function (a, c) {
          if ("object" === typeof console) {
            var d = "object" === typeof a;
            "undefined" !== typeof c && "alerta" === c.toLowerCase()
              ? d
                ? console.warn(
                    "[Simple Cart]\n",
                    a[0],
                    a[1],
                    a[2],
                    a[3],
                    a[4],
                    a[5],
                    a[6],
                    a[7]
                  )
                : console.warn("[Simple Cart]\n" + a)
              : "undefined" !== typeof c && "info" === c.toLowerCase()
              ? d
                ? console.info(
                    "[Simple Cart]\n",
                    a[0],
                    a[1],
                    a[2],
                    a[3],
                    a[4],
                    a[5],
                    a[6],
                    a[7]
                  )
                : console.info("[Simple Cart]\n" + a)
              : d
              ? console.error(
                  "[Simple Cart]\n",
                  a[0],
                  a[1],
                  a[2],
                  a[3],
                  a[4],
                  a[5],
                  a[6],
                  a[7]
                )
              : console.error("[Simple Cart]\n" + a);
          }
        };
        var g = b(this);
        "object" === typeof e
          ? (n = e)
          : ((e = e || !1), (g = g.add(b.QD_simpleCart.elements)));
        if (!g.length) return g;
        b.QD_simpleCart.elements = b.QD_simpleCart.elements.add(g);
        k = "undefined" === typeof k ? !1 : k;
        var p = {
          cartQtt: ".qd_cart_qtt",
          cartTotal: ".qd_cart_total",
          itemsText: ".qd_items_text",
          currencySymbol:
            (b("meta[name=currency]").attr("content") || "R$") + " ",
          showQuantityByItems: !0,
          smartCheckout: !0,
          callback: function () {},
        };
        var f = b.extend({}, p, n);
        var m = b("");
        g.each(function () {
          var a = b(this);
          a.data("qd_simpleCartOpts") || a.data("qd_simpleCartOpts", f);
        });
        var q = function (a) {
          window._QuatroDigital_CartData = window._QuatroDigital_CartData || {};
          for (var c = 0, d = 0, h = 0; h < a.totalizers.length; h++)
            "Shipping" == a.totalizers[h].id
              ? (d += a.totalizers[h].value)
              : (c += a.totalizers[h].value);
          window._QuatroDigital_CartData.total =
            f.currencySymbol + qd_number_format(c / 100, 2, ",", ".");
          window._QuatroDigital_CartData.shipping =
            f.currencySymbol + qd_number_format(d / 100, 2, ",", ".");
          window._QuatroDigital_CartData.allTotal =
            f.currencySymbol + qd_number_format((c + d) / 100, 2, ",", ".");
          window._QuatroDigital_CartData.qtt = 0;
          if (f.showQuantityByItems)
            for (h = 0; h < a.items.length; h++)
              window._QuatroDigital_CartData.qtt += a.items[h].quantity;
          else window._QuatroDigital_CartData.qtt = a.items.length || 0;
          try {
            window._QuatroDigital_CartData.callback &&
              window._QuatroDigital_CartData.callback.fire &&
              window._QuatroDigital_CartData.callback.fire();
          } catch (x) {
            l("Problemas com o callback do Smart Cart");
          }
          t(m);
        };
        var u = function (a, c) {
          1 === a
            ? c.text("Item").filter(".singular").show()
            : c.text("itens").filter(".plural").show();
        };
        var v = function (a) {
          1 > a ? g.addClass("qd-emptyCart") : g.removeClass("qd-emptyCart");
        };
        var w = function (a, c) {
          var d = parseInt(window._QuatroDigital_CartData.qtt, 10);
          c.$this.show();
          isNaN(d) &&
            (l(
              "O valor obtido para calcular o plural/singular n\u00e3o \u00e9 um n\u00famero! O valor ser\u00e1 definido para 0.",
              "alerta"
            ),
            (d = 0));
          c.cartTotalE.html(window._QuatroDigital_CartData.total);
          c.cartQttE.html(d);
          u(d, c.itemsTextE);
          v(d);
        };
        var t = function (a) {
          g.each(function () {
            var c = {};
            var d = b(this);
            e &&
              d.data("qd_simpleCartOpts") &&
              b.extend(f, d.data("qd_simpleCartOpts"));
            c.$this = d;
            c.cartQttE = d.find(f.cartQtt) || m;
            c.cartTotalE = d.find(f.cartTotal) || m;
            c.itemsTextE = d.find(f.itemsText) || m;
            c.emptyElem = d.find(f.emptyCart) || m;
            w(a, c);
            d.addClass("qd-sc-populated");
          });
        };
        (function () {
          if (f.smartCheckout) {
            window._QuatroDigital_DropDown =
              window._QuatroDigital_DropDown || {};
            if (
              "undefined" !==
                typeof window._QuatroDigital_DropDown.getOrderForm &&
              (k || !e)
            )
              return q(window._QuatroDigital_DropDown.getOrderForm);
            if (
              "object" !== typeof window.vtexjs ||
              "undefined" === typeof window.vtexjs.checkout
            )
              if (
                "object" === typeof vtex &&
                "object" === typeof vtex.checkout &&
                "undefined" !== typeof vtex.checkout.SDK
              )
                new vtex.checkout.SDK();
              else return l("N\u00e3o foi encontrada a biblioteca VTEX.js");
            b.QD_checkoutQueue(["items", "totalizers", "shippingData"], {
              done: function (a) {
                q(a);
                window._QuatroDigital_DropDown.getOrderForm = a;
              },
              fail: function (a) {
                l([
                  "N\u00e3o foi poss\u00edvel obter os dados para o carrinho.",
                  a,
                ]);
              },
            });
          } else alert("Esta \u00e9 uma fun\u00e7\u00e3o descontinuada =/");
        })();
        f.callback();
        b(window).trigger("simpleCartCallback.quatro_digital");
        return g;
      };
      b.QD_simpleCart = { elements: b("") };
      b(function () {
        if ("function" === typeof window.ajaxRequestbuyButtonAsynchronous) {
          var e = window.ajaxRequestbuyButtonAsynchronous;
          window.ajaxRequestbuyButtonAsynchronous = function (n, k, l, g, p) {
            e.call(this, n, k, l, g, function () {
              "function" === typeof p && p();
              b.QD_simpleCart.elements.each(function () {
                var f = b(this);
                f.simpleCart(f.data("qd_simpleCartOpts"));
              });
            });
          };
        }
      });
      var r = window.ReloadItemsCart || void 0;
      window.ReloadItemsCart = function (e) {
        b.fn.simpleCart(!0);
        "function" === typeof r ? r.call(this, e) : alert(e);
      };
      b(function () {
        var e = b(".qd_cart_auto");
        e.length && e.simpleCart();
      });
      b(function () {
        b(window).bind(
          "productAddedToCart minicartUpdated.vtex cartProductAdded.vtex",
          function () {
            b.fn.simpleCart(!0);
          }
        );
      });
    } catch (e) {
      "undefined" !== typeof console &&
        "function" === typeof console.error &&
        console.error("Oooops! ", e);
    }
  }
})();
/* Quatro Digital - VTEX Checkout Queue // 1.1 //  Carlos Vinicius [ QUATRO DIGITAL ] // Todos os direitos reservados */
(function () {
  var l = function (a, c) {
      if ("object" === typeof console) {
        var d = "object" === typeof a;
        "undefined" !== typeof c && "alerta" === c.toLowerCase()
          ? d
            ? console.warn(
                "[QD VTEX Checkout Queue]\n",
                a[0],
                a[1],
                a[2],
                a[3],
                a[4],
                a[5],
                a[6],
                a[7]
              )
            : console.warn("[QD VTEX Checkout Queue]\n" + a)
          : "undefined" !== typeof c && "info" === c.toLowerCase()
          ? d
            ? console.info(
                "[QD VTEX Checkout Queue]\n",
                a[0],
                a[1],
                a[2],
                a[3],
                a[4],
                a[5],
                a[6],
                a[7]
              )
            : console.info("[QD VTEX Checkout Queue]\n" + a)
          : d
          ? console.error(
              "[QD VTEX Checkout Queue]\n",
              a[0],
              a[1],
              a[2],
              a[3],
              a[4],
              a[5],
              a[6],
              a[7]
            )
          : console.error("[QD VTEX Checkout Queue]\n" + a);
      }
    },
    f = null,
    g = {},
    h = {},
    e = {};
  $.QD_checkoutQueue = function (a, c) {
    if (null === f)
      if (
        "object" === typeof window.vtexjs &&
        "undefined" !== typeof window.vtexjs.checkout
      )
        f = window.vtexjs.checkout;
      else
        return l(
          "N\u00e3o foi encontrada a biblioteca VTEX.js. Este componente para por aqui, a for\u00e7a n\u00e3o esta mais contigo neste jornada! Para resolver isto inclua a biblioteca VTEX.js"
        );
    var d = $.extend({ done: function () {}, fail: function () {} }, c),
      b = a.join(";"),
      k = function () {
        g[b].add(d.done);
        h[b].add(d.fail);
      };
    e[b]
      ? k()
      : ((g[b] = $.Callbacks()),
        (h[b] = $.Callbacks()),
        k(),
        (e[b] = !0),
        f
          .getOrderForm(a)
          .done(function (a) {
            e[b] = !1;
            g[b].fire(a);
          })
          .fail(function (a) {
            e[b] = !1;
            h[b].fire(a);
          }));
  };
})();
/* Quatro Digital - Smart Buy Button // 2.1 // Carlos Vinicius // Todos os direitos reservados */
(function (u) {
  try {
    var a = jQuery,
      r = a({}),
      n = function (a, d) {
        console.log("Smart Buy Button", a, d);
        if (
          "object" === typeof console &&
          "undefined" !== typeof console.error &&
          "undefined" !== typeof console.info &&
          "undefined" !== typeof console.warn
        ) {
          var b;
          "object" === typeof a
            ? (a.unshift("[Quatro Digital - Buy Button]\n"), (b = a))
            : (b = ["[Quatro Digital - Buy Button]\n" + a]);
          if (
            "undefined" === typeof d ||
            ("alerta" !== d.toLowerCase() && "aviso" !== d.toLowerCase())
          )
            if ("undefined" !== typeof d && "info" === d.toLowerCase())
              try {
                console.info.apply(console, b);
              } catch (h) {
                try {
                  console.info(b.join("\n"));
                } catch (k) {}
              }
            else
              try {
                console.error.apply(console, b);
              } catch (h) {
                try {
                  console.error(b.join("\n"));
                } catch (k) {}
              }
          else
            try {
              console.warn.apply(console, b);
            } catch (h) {
              try {
                console.warn(b.join("\n"));
              } catch (k) {}
            }
        }
      },
      t = {
        timeRemoveNewItemClass: 5e3,
        isSmartCheckout: !0,
        buyQtt: "input.buy-in-page-quantity",
        selectSkuMsg: "javascript:",
        autoWatchBuyButton: !0,
        buyIfQuantityZeroed: !1,
        fakeRequest: !1,
        productPageCallback: function (g, d, b) {
          a("body").is(".productQuickView") &&
            ("success" === d
              ? alert("Produto adicionado ao carrinho!")
              : (alert(
                  "Ooops! Algo saiu errado ao tentar adicionar seu produto ao carrinho. \n Vou te redirecionar para o carrinho."
                ),
                (("object" === typeof parent
                  ? parent
                  : document
                ).location.href = b)));
        },
        isProductPage: function () {
          return a("body").is("#produto, .produto");
        },
        execDefaultAction: function (a) {
          return !1;
        },
        allowBuyClick: function () {
          return !0;
        },
        callback: function () {},
        asyncCallback: function () {},
      };
    a.QD_buyButton = function (g, d, b) {
      function h(a) {
        f.isSmartCheckout
          ? a.data("qd-bb-click-active") ||
            (a.data("qd-bb-click-active", 1),
            a.on("click.qd_bb_buy_sc", function (a) {
              if (!f.allowBuyClick()) return !0;
              if (!0 !== m.clickBuySmartCheckout.call(this))
                return a.preventDefault(), !1;
            }))
          : alert("M\u00e9todo descontinuado!");
      }
      function k(e) {
        e = e || a(f.buyButton);
        e.each(function () {
          var c = a(this);
          c.is(".qd-sbb-on") ||
            (c.addClass("qd-sbb-on"),
            (c.is(".btn-add-buy-button-asynchronous") &&
              !c.is(".remove-href")) ||
              c.data("qd-bb-active") ||
              (c.data("qd-bb-active", 1),
              c.children(".qd-bb-productAdded").length ||
                c.append(
                  '<span class="qd-bb-productAdded"><i class="icon-thumbs-up"></i> <span>Produto adicionado</span></span>'
                ),
              c.is(".buy-in-page-button") && f.isProductPage() && l.call(c),
              h(c)));
        });
        f.isProductPage() &&
          !e.length &&
          n(
            "Oooops!\nAparentemente esta \u00e9 uma p\u00e1gina de produto por\u00e9m n\u00e3o encontrei nenhum bot\u00e3o comprar!\nVerifique se \u00e9 este mesmo o seletor: '" +
              e.selector +
              "'.",
            "info"
          );
      }
      var f = b || f,
        p = a(g),
        m = this;
      window._Quatro_Digital_dropDown = window._Quatro_Digital_dropDown || {};
      window._QuatroDigital_CartData = window._QuatroDigital_CartData || {};
      m.prodAdd = function (e, c) {
        p.addClass("qd-bb-itemAddCartWrapper qd-bb-lightBoxProdAdd");
        a("body").addClass("qd-bb-lightBoxBodyProdAdd");
        var b = a(f.buyButton)
          .filter("[href='" + (e.attr("href") || "---") + "']")
          .add(e);
        b.addClass("qd-bb-itemAddBuyButtonWrapper");
        setTimeout(function () {
          p.removeClass("qd-bb-itemAddCartWrapper");
          b.removeClass("qd-bb-itemAddBuyButtonWrapper");
        }, f.timeRemoveNewItemClass);
        window._Quatro_Digital_dropDown.getOrderForm = void 0;
        if (
          "undefined" !== typeof d &&
          "function" === typeof d.getCartInfoByUrl
        )
          return (
            f.isSmartCheckout ||
              (n("fun\u00e7\u00e3o descontinuada"), d.getCartInfoByUrl()),
            (window._QuatroDigital_DropDown.getOrderForm = void 0),
            d.getCartInfoByUrl(
              function (c) {
                window._Quatro_Digital_dropDown.getOrderForm = c;
                a.fn.simpleCart(!0, void 0, !0);
              },
              { lastSku: c }
            )
          );
        window._Quatro_Digital_dropDown.allowUpdate = !0;
        a.fn.simpleCart(!0);
        a(window).trigger("QuatroDigital.qd_sc_prodAdd", [e, c, b]);
      };
      (function () {
        if (f.isSmartCheckout && f.autoWatchBuyButton) {
          var e = a(".btn-add-buy-button-asynchronous");
          e.length && k(e);
        }
      })();
      var l = function () {
        var e = a(this);
        "undefined" !== typeof e.data("buyButton")
          ? (e.unbind("click"), h(e))
          : (e.bind("mouseenter.qd_bb_buy_sc", function (c) {
              e.unbind("click");
              h(e);
              a(this).unbind(c);
            }),
            a(window).load(function () {
              e.unbind("click");
              h(e);
              e.unbind("mouseenter.qd_bb_buy_sc");
            }));
      };
      m.clickBuySmartCheckout = function () {
        var e = a(this),
          c = e.attr("href") || "";
        if (-1 < c.indexOf(f.selectSkuMsg)) return !0;
        c = c
          .replace(/redirect=(false|true)/gi, "")
          .replace("?", "?redirect=false&")
          .replace(/&&/gi, "&");
        if (f.execDefaultAction(e))
          return (
            e.attr("href", c.replace("redirect=false", "redirect=true")), !0
          );
        c = c.replace(/http.?:/i, "");
        r.queue(function (b) {
          if (!f.buyIfQuantityZeroed && !/(&|\?)qty=[1-9][0-9]*/gi.test(c))
            return b();
          var d = function (b, d) {
            var g = c.match(/sku=([0-9]+)/gi),
              h = [];
            if ("object" === typeof g && null !== g)
              for (var k = g.length - 1; 0 <= k; k--) {
                var l = parseInt(g[k].replace(/sku=/gi, ""));
                isNaN(l) || h.push(l);
              }
            f.productPageCallback.call(this, b, d, c);
            m.buyButtonClickCallback.call(this, b, d, c, h);
            m.prodAdd(e, c.split("ku=").pop().split("&").shift());
            "function" === typeof f.asyncCallback && f.asyncCallback.call(this);
            a(window).trigger("productAddedToCart");
            a(window).trigger("cartProductAdded.vtex");
          };
          f.fakeRequest
            ? (d(null, "success"), b())
            : a
                .ajax({
                  url: c,
                  complete: d,
                  mimeType: "text/html",
                })
                .always(function () {
                  b();
                });
        });
      };
      m.buyButtonClickCallback = function (a, c, b, d) {
        try {
          "success" === c &&
            "object" === typeof window.parent &&
            "function" ===
              typeof window.parent._QuatroDigital_prodBuyCallback &&
            window.parent._QuatroDigital_prodBuyCallback(a, c, b, d);
        } catch (v) {
          n(
            "Problemas ao tentar comunicar a p\u00e1gina que o produto foi aicionado ao carrinho."
          );
        }
      };
      k();
      "function" === typeof f.callback
        ? f.callback.call(this)
        : n("Callback n\u00e3o \u00e9 uma fun\u00e7\u00e3o");
    };
    var l = a.Callbacks();
    a.fn.QD_buyButton = function (g, d) {
      var b = a(this);
      "undefined" !== typeof d ||
        "object" !== typeof g ||
        g instanceof a ||
        ((d = g), (g = void 0));
      var h;
      l.add(function () {
        b.children(".qd-bb-itemAddWrapper").length ||
          b.prepend(
            '<span class="qd-bb-itemAddWrapper"><span class="qd-bb-itemAddIco"></span></span>'
          );
        h = new a.QD_buyButton(b, g, a.extend({}, t, d));
      });
      l.fire();
      a(window).on("QuatroDigital.qd_bb_prod_add", function (a, b, d) {
        h.prodAdd(b, d);
      });
      return a.extend(b, h);
    };
    var q = 0;
    a(document).ajaxSend(function (a, d, b) {
      -1 < b.url.toLowerCase().indexOf("/checkout/cart/add") &&
        (q = (b.url.match(/sku=([0-9]+)/i) || [""]).pop());
    });
    a(window).bind("productAddedToCart.qdSbbVtex", function () {
      a(window).trigger("QuatroDigital.qd_bb_prod_add", [new a(), q]);
    });
    a(document).ajaxStop(function () {
      l.fire();
    });
  } catch (g) {
    "undefined" !== typeof console &&
      "function" === typeof console.error &&
      console.error("Oooops! ", g);
  }
})(this);
/* $("a").getParent("ul"); // 3 // Carlos Vinicius [ QUATRO DIGITAL ] // MIT */
(function (a) {
  a.fn.getParent = a.fn.closest;
})(jQuery);

/* Quatro Digital Plus Smart Cart // 7.7 // Carlos Vinicius // Todos os direitos reservados */
var _0x99c4 = [
  "productAddedToCart.qdDdcVtex\x20minicartUpdated.vtex.qdDdcVtex",
  "qd-bb-lightBoxProdAdd\x20sc-qd-cart-opened\x20qd-ddc-product-add-time-v2",
  "body",
  "data-sku",
  "buyButton",
  "mouseenter.qd_ddc_hover",
  "clearNotification",
  ".qd-ddc-infoTotalItems",
  "<span\x20class=\x22qd-ddc-infoTotalShipping\x22></span>",
  "vtexjs",
  "<div\x20class=\x22qd-ddc-prodRow\x20qd_ddc_prodRow\x22><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column1\x20qd-ddc-prodImg\x22><div\x20class=\x22qd-ddc-prodImgWrapper\x22><img\x20src=\x22\x22\x20class=\x22qd-ddc-image\x22\x20/><span\x20class=\x22qd-ddc-imgLoading\x22></span></div></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column2\x20qd-ddc-prodName\x22></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column3\x20qd-ddc-prodPrice\x22></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column4\x20qd-ddc-prodQtt\x22><div\x20class=\x22qd-ddc-prodQttWrapper\x20clearfix\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-quantityMinus\x22></a><input\x20type=\x22text\x22\x20class=\x22qd-ddc-quantity\x22\x20/><a\x20href=\x22#\x22\x20class=\x22qd-ddc-quantityMore\x22></a><span\x20class=\x22qd-ddc-qttLoading\x22></span></div></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column5\x20qd-ddc-prodRemove\x22><div\x20class=\x22qd-ddc-removeWrapper\x20clearfix\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-remove\x22></a><span\x20class=\x22qd-ddc-prodRowLoading\x22></span></div></div></div>",
  "callbackProductsList\x20não\x20é\x20uma\x20função",
  "boolean",
  "<div\x20class=\x22qd-ddc-notification\x22>",
  ".qd-ddc-notification-close",
  ".qd-ddc-prodWrapper2",
  ".qd-ddc-emptyCart\x20p",
  "text",
  "Problemas\x20ao\x20atualizar\x20os\x20dados\x20do\x20carrinho\x20a\x20partir\x20do\x20eveento\x20da\x20VTEX.\x20Detalhes:\x20",
  ".qd-ddc-image",
  "j%25C2%25A8pragrecnegf%25C2%25A8pbz%25C2%25A8oe",
  "quantity",
  "http",
  ".qd-ddc-scrollUp",
  ".qd-ddc-infoTotal",
  "$1-",
  "insertProdImg",
  "actionButtons",
  "allowUpdate",
  "Não\x20foi\x20possível\x20atualizar\x20a\x20quantidade\x20de\x20itens\x20no\x20carrinho",
  "done",
  ".qd-ddc-prodRow",
  "warn",
  "qd-ddc-prodLoaded",
  "erc",
  "keyup.qd_ddc_closeFn",
  "grecnegf%25C2%25A8igrkpbzzreprfgnoyr%25C2%25A8pbz%25C2%25A8oe",
  "availability",
  "texts",
  ".qd_ddc_continueShopping",
  "cartContainer",
  "address",
  "object",
  "append",
  "<table\x20class=\x22table\x20qd-dd-cep-slas\x22><thead><tr><th>Valor</th><th>Disponibilidade</th></tr></thead><tbody></tbody></table>",
  "allowRecalculate",
  ".qd-ddc-shipping",
  "Atenção,\x20este\x20método\x20esta\x20descontinuado.",
  "price",
  "shippingEstimate",
  "continueShopping",
  "---",
  "function",
  "scrollCart",
  "ite",
  "preventDefault",
  ".qd-ddc-notification",
  "SKU\x20não\x20encontrado!\x20Certifique-se\x20de\x20que\x20este\x20produto\x20está\x20ativo.",
  "quickViewUpdate",
  "filter",
  "cartIsEmpty",
  "outerHeight",
  "atenção\x20esta\x20método\x20esta\x20descontinuado",
  "Problemas\x20ao\x20tentar\x20definir\x20o\x20CEP\x20com\x20base\x20nos\x20dados\x20do\x20checkout.\x20Detalhes:\x20",
  "qd-loaded",
  "unshift",
  "qtt",
  "removeProduct",
  "SDK",
  ".qd_ddc_lightBoxOverlay",
  "keyup.qd_ddc_cep",
  "timeRemoveNewItemClass",
  "closest",
  "message",
  "empty",
  ".qd-bap-qtt",
  "cartTotal",
  "removeClass",
  ".qd-ddc-quantityMore",
  "toUpperCase",
  "exec",
  "target",
  "<tr></tr>",
  "apply",
  "Não\x20foi\x20encontrada\x20a\x20biblioteca\x20VTEX.js",
  "slideUp",
  "keyup.qd_ddc_change",
  "<span\x20class=\x22qd-ddc-infoAllTotal\x22></span>",
  "input.qd-productId[value=",
  "setOrderForm",
  "callback",
  "aviso",
  "prepend",
  "qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82",
  "_QuatroDigital_AmountProduct",
  ".qd-ddc-quantityMore,.qd-ddc-quantityMinus",
  ".qd-ddc-wrapper",
  "Finalizar\x20Compra",
  "Não\x20foi\x20possível\x20remover\x20o\x20item\x20do\x20carrinho",
  "html",
  "Seu\x20carrinho\x20ainda\x20não\x20tem\x20nenhum\x20produto.",
  "val",
  "meta[name=currency]",
  "length",
  "bargerr%25C2%25A8igrkpbzzreprfgnoyr%25C2%25A8pbz%25C2%25A8oe",
  "buyButtonClicked",
  "qd-ddc-noItems",
  "qd-ddc-cart-rendered\x20qd-ddc-product-add-time",
  "appendTo",
  ".qd-ddc-quantityMinus",
  "info",
  ".qd-ddc-cep-ok",
  "hide",
  "_QuatroDigital_CartData",
  "name",
  "dataOptionsCache",
  ".qd_ddc_continueShopping,\x20.qd_ddc_lightBoxClose",
  "Este\x20método\x20esta\x20descontinuado!",
  "emptyCart",
  "<span\x20class=\x22qd-ddc-infoTotalItems\x22></span>",
  "click.qd_ddc_scrollUp",
  "shipping",
  "#shipping",
  "ProdAddTimeV2",
  "qd-bb-lightBoxBodyProdAdd\x20sc-qd-cart-opened\x20qd-ddc-product-add-time-v2",
  "add",
  "each",
  "#items",
  ".qd-ddc-cep-close",
  "items",
  "smartCheckout",
  "_QuatroDigital_DropDown",
  "keyCode",
  "stop",
  "prod_",
  "parent",
  "off",
  "//io.vtex.com.br/vtex.js/1.0.0/vtex.min.js",
  "click.qd_ddc_closeFn",
  "Oooops!\x20",
  "<span\x20class=\x22qd-ddc-notification-close\x22>X</span><p>#messageText</p>",
  "Não\x20foi\x20informada\x20uma\x20URL\x20para\x20a\x20imagem\x20e\x20nem\x20um\x20SKU",
  "linkCart",
  "qd-ddc-cart-empty",
  "totalizers",
  "insertBefore",
  "load",
  "prodId",
  "<span\x20class=\x22qd-bap-wrapper\x22\x20title=\x22Itens\x20no\x20carrinho\x20para\x20este\x20produto.\x22><span\x20class=\x22qd-bap-wrapper2\x22><span\x20class=\x22qd-bap-qtt\x22></span></span></span>",
  "getParent",
  ".qd-ddc-quantity",
  "simpleCart",
  ".qd-ddc-remove",
  "click._QD_DDC_closeShipping",
  "getCartInfoByUrl",
  "qd-ddc-lastAddedFixed",
  "attr",
  "<div\x20class=\x22qd-ddc-wrapper\x20qd-ddc-noItems\x22><div\x20class=\x22qd-ddc-wrapper2\x22><div\x20class=\x22qd_ddc_lightBoxClose\x22></div><div\x20class=\x22qd-ddc-wrapper3\x22><div\x20class=\x22qd-ddc-emptyCart\x22><p></p></div><div\x20class=\x22qd-ddc-row\x20qd-ddc-products\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-scrollUp\x22></a><div\x20class=\x22qd-ddc-prodWrapper\x22>\x20<div\x20class=\x22qd-ddc-prodWrapper2\x22></div>\x20</div><span\x20class=\x22qd-ddc-prodLoading\x22></span><a\x20href=\x22#\x22\x20class=\x22qd-ddc-scrollDown\x22></a></div><div\x20class=\x22qd-ddc-row\x20qd-ddc-info\x22><div\x20class=\x22qd-ddc-shipping\x22></div><div\x20class=\x22qd-ddc-infoTotal\x22></div><div\x20class=\x22qd-ddc-infoBts\x22><a\x20href=\x22/checkout/#/cart\x22\x20class=\x22qd-ddc-viewCart\x22></a><a\x20href=\x22#\x22\x20class=\x22qd_ddc_continueShopping\x22></a><a\x20href=\x22/checkout/#/orderform\x22\x20class=\x22qd-ddc-checkout\x22></a></div></div></div></div></div>",
  "logisticsInfo",
  ".qd-ddc-cep",
  ".qd-ddc-viewCart",
  "sellingPrice",
  "changeQantity",
  "<td>\x20R$\x20",
  "smartCart",
  "#total",
  "checkout",
  "Não\x20foi\x20possível\x20obter\x20os\x20dados\x20do\x20carrinho",
  ".qd-bap-wrapper",
  "call",
  "forceImageHTTPS",
  ".qd-ddc-infoTotalValue",
  "focusout.qd_ddc_change",
  "$1-$2$3",
  "linkCheckout",
  "Não\x20foi\x20possível\x20obter\x20\x27//io.vtex.com.br/vtex.js/1.0.0/vtex.min.js\x27\x20o\x20DropDown\x20não\x20será\x20executado.",
  "find",
  "selector",
  "QD_checkoutQueue",
  "remove",
  "</td>",
  "O\x20Smart\x20Cart\x20não\x20é\x20mais\x20iniciado\x20desta\x20forma.\x20A\x20versão\x20que\x20você\x20esta\x20executando\x20tem\x20licença\x20restrita\x20e\x20todos\x20os\x20direitos\x20reservados\x20à\x20Quatro\x20Digital.",
  "Continuar\x20Comprando",
  "addClass",
  "error",
  ".qd-ddc-cep-tooltip-text",
  "undefined",
  "#value",
  "A\x20execução\x20do\x20DropDown\x20pará\x20por\x20aqui!",
  "shippingForm",
  "productCategoryIds",
  "Callbacks",
  "qd-bap-item-added",
  "click.qd_ddc_scrollDown",
  "fromCharCode",
  ".qd-ddc-prodWrapper,\x20.qd-ddc-prodWrapper2",
  ".qd-ddc-prodWrapper",
  "<div\x20class=\x22qd-ddc-cep-tooltip\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-cep-btn\x22>Consulte\x20o\x20prazo\x20e\x20o\x20valor\x20do\x20frete</a><div\x20class=\x22qd-ddc-cep-tooltip-text\x22><h4\x20class=\x22qd-ddc-cep-title\x22>Consulte\x20o\x20prazo\x20e\x20o\x20valor\x20do\x20frete</h4><div\x20class=\x22qd-ddc-cep-wrapper\x22><input\x20type=\x22tel\x22\x20class=\x22qd-ddc-cep\x22\x20placeholder=\x22Digite\x20o\x20CEP\x20de\x20entrega\x22><a\x20class=\x22qd-ddc-cep-ok\x22\x20href=\x22#\x22>OK</a></div><a\x20class=\x22qd-ddc-cep-close\x22\x20href=\x22#\x22><i\x20class=\x22fa\x20fa-times\x22\x20aria-hidden=\x22true\x22></i>\x20Fechar</a></div></div>",
  "productId",
  "#messageText",
  "QD_dropDownCart",
  "join",
  "replace",
  "qd-loading",
  "https",
  "renderProductsList",
  "A\x20biblioteca\x20VTEX.js\x20não\x20foi\x20encontrada.\x20o\x20Script\x20tentará\x20buscar\x20no\x20CDN",
  "shippingCalculate",
  ",\x20entrega\x20em\x20",
  "qd-ddc-cart-rendered",
  "ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!",
  ".qd-ddc-checkout",
  "\x20para\x20o\x20CEP\x20",
  "thumbSize",
  "qd-ddc-product-add-time-v2",
  "shippingData",
  "fail",
  ".qd-dd-cep-slas",
  "imageUrl",
  "data-sku-index",
  "updateOnlyHover",
  "dropDown",
  "charCodeAt",
  "slas",
  "<div><span>Itens:\x20#items</span><span>Subtotal:\x20#value</span></div><div><span>Frete:\x20#shipping</span><span>Total:\x20#total</span></div>",
  "Callback\x20não\x20é\x20uma\x20função",
  "lastSku",
  "BRA",
  "qd-ddc-lastAdded",
  "formatCepField",
  ".qd-ddc-cep-btn",
  "src",
  "avisso",
  "Ir\x20ao\x20Carrinho",
  "extend",
  "QD_smartCart",
  "height",
  "qd-ddc-product-add-time",
  "click",
  "enableNotification",
  "callbackProductsList",
  "alerta",
  "getOrderForm",
];
(function (_0x552382, _0x99c451) {
  var _0x4b44a8 = function (_0x177550) {
    while (--_0x177550) {
      _0x552382["push"](_0x552382["shift"]());
    }
  };
  _0x4b44a8(++_0x99c451);
})(_0x99c4, 0x1c9);
var _0x4b44 = function (_0x552382, _0x99c451) {
  _0x552382 = _0x552382 - 0x0;
  var _0x4b44a8 = _0x99c4[_0x552382];
  return _0x4b44a8;
};
(function () {
  try {
    (window[_0x4b44("0x8e")] = window[_0x4b44("0x8e")] || {}),
      (window[_0x4b44("0x8e")][_0x4b44("0x77")] =
        window[_0x4b44("0x8e")][_0x4b44("0x77")] || $[_0x4b44("0xdc")]());
  } catch (_0xe19df8) {
    _0x4b44("0xd7") !== typeof console &&
      "function" === typeof console["error"] &&
      console[_0x4b44("0xd5")](_0x4b44("0xa8"), _0xe19df8[_0x4b44("0x66")]);
  }
})();
(function (_0x3997b7) {
  try {
    var _0x1ac1d3 = jQuery,
      _0x2fef20 = function (_0x2d496f, _0x17101b) {
        if (
          "object" === typeof console &&
          "undefined" !== typeof console[_0x4b44("0xd5")] &&
          _0x4b44("0xd7") !== typeof console[_0x4b44("0x8b")] &&
          _0x4b44("0xd7") !== typeof console[_0x4b44("0x3d")]
        ) {
          var _0x40b875;
          _0x4b44("0x47") === typeof _0x2d496f
            ? (_0x2d496f[_0x4b44("0x5e")](
                "[Quatro\x20Digital\x20-\x20DropDown\x20Cart]\x0a"
              ),
              (_0x40b875 = _0x2d496f))
            : (_0x40b875 = [
                "[Quatro\x20Digital\x20-\x20DropDown\x20Cart]\x0a" + _0x2d496f,
              ]);
          if (
            "undefined" === typeof _0x17101b ||
            (_0x4b44("0x1b") !== _0x17101b["toLowerCase"]() &&
              _0x4b44("0x78") !== _0x17101b["toLowerCase"]())
          )
            if (
              _0x4b44("0xd7") !== typeof _0x17101b &&
              _0x4b44("0x8b") === _0x17101b["toLowerCase"]()
            )
              try {
                console[_0x4b44("0x8b")][_0x4b44("0x70")](console, _0x40b875);
              } catch (_0x4b6015) {
                try {
                  console[_0x4b44("0x8b")](_0x40b875[_0x4b44("0xe6")]("\x0a"));
                } catch (_0x326807) {}
              }
            else
              try {
                console[_0x4b44("0xd5")][_0x4b44("0x70")](console, _0x40b875);
              } catch (_0x13f24d) {
                try {
                  console[_0x4b44("0xd5")](_0x40b875[_0x4b44("0xe6")]("\x0a"));
                } catch (_0x50f0e3) {}
              }
          else
            try {
              console[_0x4b44("0x3d")][_0x4b44("0x70")](console, _0x40b875);
            } catch (_0x460d30) {
              try {
                console["warn"](_0x40b875[_0x4b44("0xe6")]("\x0a"));
              } catch (_0x46e5e6) {}
            }
        }
      };
    window[_0x4b44("0xa0")] = window[_0x4b44("0xa0")] || {};
    window[_0x4b44("0xa0")]["allowUpdate"] = !0x0;
    _0x1ac1d3["QD_dropDownCart"] = function () {};
    _0x1ac1d3["fn"][_0x4b44("0xe5")] = function () {
      return { fn: new _0x1ac1d3() };
    };
    var _0x43cc86 = (function (_0x50b19b) {
      var _0xeb4ab4 = {
        p: "ragrecnegf%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe",
        jj: _0x4b44("0x31"),
        pra: _0x4b44("0x41"),
        dqfg: _0x4b44("0x85"),
      };
      return (function (_0x142238) {
        var _0x44df1b = function (_0x15551e) {
          return _0x15551e;
        };
        var _0x104533 = [
          "a",
          "e",
          0x12,
          "m",
          "s",
          "k",
          "d",
          "u",
          "g",
          "h",
          "a",
          "g",
          "s",
          "t",
          "z",
          "y",
          "o",
          "u",
          "o",
          "b",
        ];
        _0x142238 =
          _0x142238[
            "d" +
              _0x104533[0x10] +
              "c" +
              _0x104533[0x11] +
              "m" +
              _0x44df1b(_0x104533[0x1]) +
              "n" +
              _0x104533[0xd]
          ][
            "l" +
              _0x104533[0x12] +
              "c" +
              _0x104533[0x0] +
              "ti" +
              _0x44df1b("o") +
              "n"
          ];
        var _0x502130 = function (_0x433a57) {
          return escape(
            encodeURIComponent(
              _0x433a57[_0x4b44("0xe7")](/\./g, "¨")[_0x4b44("0xe7")](
                /[a-zA-Z]/g,
                function (_0x287d7b) {
                  return String[_0x4b44("0xdf")](
                    ("Z" >= _0x287d7b ? 0x5a : 0x7a) >=
                      (_0x287d7b = _0x287d7b[_0x4b44("0x8")](0x0) + 0xd)
                      ? _0x287d7b
                      : _0x287d7b - 0x1a
                  );
                }
              )
            )
          );
        };
        var _0x28044d = _0x502130(
          _0x142238[
            [
              _0x104533[0x9],
              _0x44df1b("o"),
              _0x104533[0xc],
              _0x104533[_0x44df1b(0xd)],
            ]["join"]("")
          ]
        );
        _0x502130 = _0x502130(
          (window[
            [
              "js",
              _0x44df1b("no"),
              "m",
              _0x104533[0x1],
              _0x104533[0x4][_0x4b44("0x6c")](),
              _0x4b44("0x53"),
            ][_0x4b44("0xe6")]("")
          ] || _0x4b44("0x50")) +
            [
              ".v",
              _0x104533[0xd],
              "e",
              _0x44df1b("x"),
              "co",
              _0x44df1b("mm"),
              _0x4b44("0x3f"),
              _0x104533[0x1],
              ".c",
              _0x44df1b("o"),
              "m.",
              _0x104533[0x13],
              "r",
            ][_0x4b44("0xe6")]("")
        );
        for (var _0x22ca49 in _0xeb4ab4) {
          if (
            _0x502130 === _0x22ca49 + _0xeb4ab4[_0x22ca49] ||
            _0x28044d === _0x22ca49 + _0xeb4ab4[_0x22ca49]
          ) {
            var _0x3cb77a = "tr" + _0x104533[0x11] + "e";
            break;
          }
          _0x3cb77a = "f" + _0x104533[0x0] + "ls" + _0x44df1b(_0x104533[0x1]);
        }
        _0x44df1b = !0x1;
        -0x1 <
          _0x142238[
            [_0x104533[0xc], "e", _0x104533[0x0], "rc", _0x104533[0x9]][
              _0x4b44("0xe6")
            ]("")
          ]["indexOf"](_0x4b44("0x7a")) && (_0x44df1b = !0x0);
        return [_0x3cb77a, _0x44df1b];
      })(_0x50b19b);
    })(window);
    if (!eval(_0x43cc86[0x0]))
      return _0x43cc86[0x1] ? _0x2fef20(_0x4b44("0xef")) : !0x1;
    _0x1ac1d3[_0x4b44("0xe5")] = function (_0x567e72, _0x1ff052) {
      var _0x349a04 = _0x1ac1d3(_0x567e72);
      if (!_0x349a04[_0x4b44("0x84")]) return _0x349a04;
      var _0x31d2f4 = _0x1ac1d3[_0x4b44("0x14")](
        !0x0,
        {},
        {
          updateOnlyHover: !0x0,
          texts: {
            linkCart: _0x4b44("0x13"),
            linkCheckout: _0x4b44("0x7e"),
            cartTotal: _0x4b44("0xa"),
            emptyCart: _0x4b44("0x81"),
            continueShopping: _0x4b44("0xd3"),
            shippingForm: _0x4b44("0xe2"),
            notification: _0x4b44("0xa9"),
          },
          timeRemoveNewItemClass: 0x1388,
          forceImageHTTPS: !0x1,
          thumbSize: { w: 0x64, h: 0x64 },
          skuName: function (_0x5055bf) {
            return _0x5055bf["skuName"] || _0x5055bf[_0x4b44("0x8f")];
          },
          callback: function () {},
          callbackProductsList: function () {},
          enableNotification: !0x1,
          clearNotification: !0x1,
          smartCheckout: !0x0,
        },
        _0x1ff052
      );
      _0x1ac1d3("");
      var _0x346975 = this;
      if (_0x31d2f4[_0x4b44("0x9f")]) {
        var _0x1cc917 = !0x1;
        _0x4b44("0xd7") === typeof window[_0x4b44("0x26")] &&
          (_0x2fef20(_0x4b44("0xeb")),
          _0x1ac1d3["ajax"]({
            url: _0x4b44("0xa6"),
            async: !0x1,
            dataType: "script",
            error: function () {
              _0x2fef20(_0x4b44("0xcc"));
              _0x1cc917 = !0x0;
            },
          }));
        if (_0x1cc917) return _0x2fef20(_0x4b44("0xd9"));
      }
      if (
        _0x4b44("0x47") === typeof window[_0x4b44("0x26")] &&
        "undefined" !== typeof window["vtexjs"][_0x4b44("0xc3")]
      )
        var _0x192618 = window["vtexjs"][_0x4b44("0xc3")];
      else if (
        _0x4b44("0x47") === typeof vtex &&
        _0x4b44("0x47") === typeof vtex["checkout"] &&
        _0x4b44("0xd7") !== typeof vtex["checkout"][_0x4b44("0x61")]
      )
        _0x192618 = new vtex[_0x4b44("0xc3")][_0x4b44("0x61")]();
      else return _0x2fef20(_0x4b44("0x71"));
      var _0x4c084d = /^\/|\/$/g,
        _0x57cbf4 = /[^0-9]/g,
        _0x5ccade = /([0-9]{5})([0-9])([0-9]{2})?/g,
        _0x175025 = /(.{9}).*/g,
        _0x59e714 = /(ids\/[0-9]+)[^\/]+/i;
      _0x346975[_0x4b44("0x45")] = _0x4b44("0xba");
      var _0x4ed506 = function (_0x3ced09) {
        _0x1ac1d3(this)[_0x4b44("0x48")](_0x3ced09);
        _0x3ced09[_0x4b44("0xcd")](_0x4b44("0x91"))
          ["add"](_0x1ac1d3(_0x4b44("0x62")))
          ["on"](_0x4b44("0xa7"), function () {
            _0x349a04[_0x4b44("0x6a")](_0x4b44("0x1e"));
            _0x1ac1d3(document["body"])[_0x4b44("0x6a")](_0x4b44("0x99"));
          });
        _0x1ac1d3(document)
          [_0x4b44("0xa5")](_0x4b44("0x40"))
          ["on"](_0x4b44("0x40"), function (_0x4ce29f) {
            0x1b == _0x4ce29f[_0x4b44("0xa1")] &&
              (_0x349a04[_0x4b44("0x6a")](_0x4b44("0x1e")),
              _0x1ac1d3(document[_0x4b44("0x1f")])[_0x4b44("0x6a")](
                _0x4b44("0x99")
              ));
          });
        var _0xced76f = _0x3ced09[_0x4b44("0xcd")](_0x4b44("0xe1"));
        _0x3ced09[_0x4b44("0xcd")](_0x4b44("0x34"))["on"](
          _0x4b44("0x95"),
          function () {
            _0x346975[_0x4b44("0x52")]("-", void 0x0, void 0x0, _0xced76f);
            return !0x1;
          }
        );
        _0x3ced09["find"](".qd-ddc-scrollDown")["on"](
          _0x4b44("0xde"),
          function () {
            _0x346975[_0x4b44("0x52")](void 0x0, void 0x0, void 0x0, _0xced76f);
            return !0x1;
          }
        );
        var _0x205cf = _0x3ced09[_0x4b44("0xcd")](_0x4b44("0xd6")),
          _0x29954e = _0x3ced09[_0x4b44("0xcd")](".qd-ddc-cep"),
          _0x388ac7 = _0x3ced09[_0x4b44("0xcd")](_0x4b44("0x8c"));
        _0x29954e[_0x4b44("0x82")]("")["on"](
          _0x4b44("0x63"),
          function (_0x36572a) {
            _0x346975[_0x4b44("0xf")](_0x1ac1d3(this));
            0xd == _0x36572a["keyCode"] && _0x388ac7["click"]();
          }
        );
        _0x3ced09["find"](_0x4b44("0x10"))[_0x4b44("0x18")](function (
          _0x55f81d
        ) {
          _0x55f81d["preventDefault"]();
          _0x3ced09[_0x4b44("0xcd")](".qd-dd-cep-slas")[_0x4b44("0x84")] &&
            _0x346975[_0x4b44("0xec")](_0x29954e);
          _0x205cf["toggle"]();
        });
        _0x3ced09["find"](_0x4b44("0x9d"))["click"](function (_0x222ad4) {
          _0x222ad4["preventDefault"]();
          _0x205cf[_0x4b44("0x8d")]();
        });
        _0x1ac1d3(document)
          [_0x4b44("0xa5")](_0x4b44("0xb6"))
          ["on"](_0x4b44("0xb6"), function (_0x47ff03) {
            _0x1ac1d3(_0x47ff03[_0x4b44("0x6e")])[_0x4b44("0x65")](
              _0x3ced09[_0x4b44("0xcd")](".qd-ddc-cep-tooltip")
            )[_0x4b44("0x84")] || _0x205cf["hide"]();
          });
        _0x388ac7[_0x4b44("0x18")](function (_0x1393d1) {
          _0x1393d1["preventDefault"]();
          _0x346975["shippingCalculate"](_0x29954e);
        });
        if (_0x31d2f4[_0x4b44("0x6")]) {
          var _0x347739 = 0x0;
          _0x1ac1d3(this)["on"](_0x4b44("0x22"), function () {
            var _0x457e22 = function () {
              window["_QuatroDigital_DropDown"]["allowUpdate"] &&
                (_0x346975["getCartInfoByUrl"](),
                (window[_0x4b44("0xa0")][_0x4b44("0x39")] = !0x1),
                _0x1ac1d3["fn"][_0x4b44("0xb4")](!0x0),
                _0x346975["cartIsEmpty"]());
            };
            _0x347739 = setInterval(function () {
              _0x457e22();
            }, 0x258);
            _0x457e22();
          });
          _0x1ac1d3(this)["on"]("mouseleave.qd_ddc_hover", function () {
            clearInterval(_0x347739);
          });
        }
      };
      var _0x51cd62 = (function (_0x57fc47) {
        _0x57fc47 = _0x1ac1d3(_0x57fc47);
        _0x31d2f4[_0x4b44("0x43")][_0x4b44("0x69")] = _0x31d2f4[
          _0x4b44("0x43")
        ][_0x4b44("0x69")][_0x4b44("0xe7")](
          _0x4b44("0xd8"),
          "<span\x20class=\x22qd-ddc-infoTotalValue\x22></span>"
        );
        _0x31d2f4[_0x4b44("0x43")]["cartTotal"] = _0x31d2f4[_0x4b44("0x43")][
          _0x4b44("0x69")
        ]["replace"](_0x4b44("0x9c"), _0x4b44("0x94"));
        _0x31d2f4[_0x4b44("0x43")][_0x4b44("0x69")] = _0x31d2f4[
          _0x4b44("0x43")
        ][_0x4b44("0x69")][_0x4b44("0xe7")](_0x4b44("0x97"), _0x4b44("0x25"));
        _0x31d2f4[_0x4b44("0x43")][_0x4b44("0x69")] = _0x31d2f4[
          _0x4b44("0x43")
        ][_0x4b44("0x69")]["replace"](_0x4b44("0xc2"), _0x4b44("0x74"));
        _0x57fc47["find"](_0x4b44("0xbd"))[_0x4b44("0x80")](
          _0x31d2f4[_0x4b44("0x43")][_0x4b44("0xab")]
        );
        _0x57fc47["find"](_0x4b44("0x44"))[_0x4b44("0x80")](
          _0x31d2f4[_0x4b44("0x43")][_0x4b44("0x4f")]
        );
        _0x57fc47[_0x4b44("0xcd")](_0x4b44("0xf0"))[_0x4b44("0x80")](
          _0x31d2f4[_0x4b44("0x43")][_0x4b44("0xcb")]
        );
        _0x57fc47["find"](_0x4b44("0x35"))["html"](
          _0x31d2f4[_0x4b44("0x43")]["cartTotal"]
        );
        _0x57fc47["find"](_0x4b44("0x4b"))[_0x4b44("0x80")](
          _0x31d2f4["texts"][_0x4b44("0xda")]
        );
        _0x57fc47["find"](_0x4b44("0x2d"))[_0x4b44("0x80")](
          _0x31d2f4[_0x4b44("0x43")][_0x4b44("0x93")]
        );
        return _0x57fc47;
      })(this[_0x4b44("0x45")]);
      var _0x3d13f3 = 0x0;
      _0x349a04[_0x4b44("0x9b")](function () {
        0x0 < _0x3d13f3
          ? _0x4ed506[_0x4b44("0xc6")](this, _0x51cd62["clone"]())
          : _0x4ed506[_0x4b44("0xc6")](this, _0x51cd62);
        _0x3d13f3++;
      });
      window[_0x4b44("0x8e")][_0x4b44("0x77")][_0x4b44("0x9a")](function () {
        _0x1ac1d3(_0x4b44("0xc8"))[_0x4b44("0x80")](
          window[_0x4b44("0x8e")]["total"] || "--"
        );
        _0x1ac1d3(_0x4b44("0x24"))["html"](
          window[_0x4b44("0x8e")][_0x4b44("0x5f")] || "0"
        );
        _0x1ac1d3(".qd-ddc-infoTotalShipping")[_0x4b44("0x80")](
          window[_0x4b44("0x8e")][_0x4b44("0x96")] || "--"
        );
        _0x1ac1d3(".qd-ddc-infoAllTotal")[_0x4b44("0x80")](
          window[_0x4b44("0x8e")]["allTotal"] || "--"
        );
      });
      var _0x48dd9d = function (_0x28330c, _0x58f433) {
        if ("undefined" === typeof _0x28330c["items"])
          return _0x2fef20(
            "Não\x20foi\x20possível\x20obter\x20os\x20items\x20da\x20requisição"
          );
        _0x346975["renderProductsList"][_0x4b44("0xc6")](this, _0x58f433);
      };
      _0x346975[_0x4b44("0xb7")] = function (_0x1751d6, _0x240597) {
        _0x4b44("0xd7") != typeof _0x240597
          ? (window[_0x4b44("0xa0")][_0x4b44("0x90")] = _0x240597)
          : window[_0x4b44("0xa0")][_0x4b44("0x90")] &&
            (_0x240597 = window["_QuatroDigital_DropDown"][_0x4b44("0x90")]);
        setTimeout(function () {
          window[_0x4b44("0xa0")][_0x4b44("0x90")] = void 0x0;
        }, _0x31d2f4[_0x4b44("0x64")]);
        _0x1ac1d3(_0x4b44("0x7d"))["removeClass"]("qd-ddc-prodLoaded");
        if (_0x31d2f4[_0x4b44("0x9f")]) {
          var _0x27d1c0 = function (_0x3695d7) {
            _0x346975[_0x4b44("0x76")](_0x3695d7);
            _0x48dd9d(_0x3695d7, _0x240597);
            "undefined" !== typeof window[_0x4b44("0x7b")] &&
              _0x4b44("0x51") ===
                typeof window["_QuatroDigital_AmountProduct"][
                  _0x4b44("0x6d")
                ] &&
              window["_QuatroDigital_AmountProduct"][_0x4b44("0x6d")][
                _0x4b44("0xc6")
              ](this);
            _0x1ac1d3(_0x4b44("0x7d"))[_0x4b44("0xd4")](_0x4b44("0x3e"));
          };
          _0x4b44("0xd7") !==
          typeof window["_QuatroDigital_DropDown"]["getOrderForm"]
            ? (_0x27d1c0(window["_QuatroDigital_DropDown"]["getOrderForm"]),
              _0x4b44("0x51") === typeof _0x1751d6 &&
                _0x1751d6(window["_QuatroDigital_DropDown"][_0x4b44("0x1c")]))
            : _0x1ac1d3[_0x4b44("0xcf")](
                [_0x4b44("0x9e"), "totalizers", _0x4b44("0x1")],
                {
                  done: function (_0x2d57f1) {
                    _0x27d1c0[_0x4b44("0xc6")](this, _0x2d57f1);
                    _0x4b44("0x51") === typeof _0x1751d6 &&
                      _0x1751d6(_0x2d57f1);
                  },
                  fail: function (_0x38e87a) {
                    _0x2fef20([_0x4b44("0xc4"), _0x38e87a]);
                  },
                }
              );
        } else _0x2fef20(_0x4b44("0x92"), "aviso");
      };
      _0x346975[_0x4b44("0x59")] = function () {
        var _0x4624f2 = _0x1ac1d3(_0x4b44("0x7d"));
        _0x4624f2[_0x4b44("0xcd")](".qd-ddc-prodRow")[_0x4b44("0x84")]
          ? _0x4624f2[_0x4b44("0x6a")](_0x4b44("0x87"))
          : _0x4624f2[_0x4b44("0xd4")]("qd-ddc-noItems");
      };
      _0x346975[_0x4b44("0xea")] = function (_0x353eb1) {
        var _0x1528a4 = _0x1ac1d3(_0x4b44("0x2c"));
        _0x1528a4[_0x4b44("0x67")]();
        _0x1528a4[_0x4b44("0x9b")](function () {
          var _0x3ec207 = _0x1ac1d3(this),
            _0x1e1d50,
            _0x5d7663,
            _0x1567f9 = _0x1ac1d3(""),
            _0xf7c75b;
          for (_0xf7c75b in window[_0x4b44("0xa0")][_0x4b44("0x1c")][
            _0x4b44("0x9e")
          ])
            if (
              "object" ===
              typeof window[_0x4b44("0xa0")]["getOrderForm"][_0x4b44("0x9e")][
                _0xf7c75b
              ]
            ) {
              var _0x2e584a =
                window[_0x4b44("0xa0")][_0x4b44("0x1c")][_0x4b44("0x9e")][
                  _0xf7c75b
                ];
              var _0x12bc27 = _0x2e584a[_0x4b44("0xdb")]
                ["replace"](_0x4c084d, "")
                ["split"]("/");
              var _0x22721c = _0x1ac1d3(_0x4b44("0x27"));
              _0x22721c[_0x4b44("0xb9")]({
                "data-sku": _0x2e584a["id"],
                "data-sku-index": _0xf7c75b,
                "data-qd-departament": _0x12bc27[0x0],
                "data-qd-category": _0x12bc27[_0x12bc27[_0x4b44("0x84")] - 0x1],
              });
              _0x22721c["addClass"]("qd-ddc-" + _0x2e584a[_0x4b44("0x42")]);
              _0x22721c[_0x4b44("0xcd")](".qd-ddc-prodName")[_0x4b44("0x48")](
                _0x31d2f4["skuName"](_0x2e584a)
              );
              _0x22721c[_0x4b44("0xcd")](".qd-ddc-prodPrice")[_0x4b44("0x48")](
                isNaN(_0x2e584a[_0x4b44("0xbe")])
                  ? _0x2e584a[_0x4b44("0xbe")]
                  : 0x0 == _0x2e584a["sellingPrice"]
                  ? "Grátis"
                  : (_0x1ac1d3(_0x4b44("0x83"))["attr"]("content") || "R$") +
                    "\x20" +
                    qd_number_format(
                      _0x2e584a[_0x4b44("0xbe")] / 0x64,
                      0x2,
                      ",",
                      "."
                    )
              );
              _0x22721c["find"](_0x4b44("0xb3"))
                [_0x4b44("0xb9")]({
                  "data-sku": _0x2e584a["id"],
                  "data-sku-index": _0xf7c75b,
                })
                [_0x4b44("0x82")](_0x2e584a[_0x4b44("0x32")]);
              _0x22721c[_0x4b44("0xcd")](_0x4b44("0xb5"))[_0x4b44("0xb9")]({
                "data-sku": _0x2e584a["id"],
                "data-sku-index": _0xf7c75b,
              });
              _0x346975[_0x4b44("0x37")](
                _0x2e584a["id"],
                _0x22721c[_0x4b44("0xcd")](_0x4b44("0x30")),
                _0x2e584a[_0x4b44("0x4")]
              );
              _0x22721c["find"](_0x4b44("0x7c"))[_0x4b44("0xb9")]({
                "data-sku": _0x2e584a["id"],
                "data-sku-index": _0xf7c75b,
              });
              _0x22721c[_0x4b44("0x89")](_0x3ec207);
              _0x1567f9 = _0x1567f9[_0x4b44("0x9a")](_0x22721c);
            }
          try {
            var _0x12280e = _0x3ec207[_0x4b44("0xb2")](_0x4b44("0x7d"))[
              _0x4b44("0xcd")
            ](".qd-ddc-shipping\x20input");
            _0x12280e[_0x4b44("0x84")] &&
              "" == _0x12280e[_0x4b44("0x82")]() &&
              window[_0x4b44("0xa0")]["getOrderForm"][_0x4b44("0x1")][
                "address"
              ] &&
              _0x12280e[_0x4b44("0x82")](
                window["_QuatroDigital_DropDown"][_0x4b44("0x1c")][
                  _0x4b44("0x1")
                ][_0x4b44("0x46")]["postalCode"]
              );
          } catch (_0x57d35b) {
            _0x2fef20(
              _0x4b44("0x5c") + _0x57d35b[_0x4b44("0x66")],
              _0x4b44("0x78")
            );
          }
          _0x346975[_0x4b44("0x38")](_0x3ec207);
          _0x346975[_0x4b44("0x59")]();
          _0x353eb1 &&
            _0x353eb1[_0x4b44("0xc")] &&
            (function () {
              _0x5d7663 = _0x1567f9[_0x4b44("0x58")](
                "[data-sku=\x27" + _0x353eb1[_0x4b44("0xc")] + "\x27]"
              );
              _0x5d7663["length"] &&
                ((_0x1e1d50 = 0x0),
                _0x1567f9[_0x4b44("0x9b")](function () {
                  var _0x2484b9 = _0x1ac1d3(this);
                  if (_0x2484b9["is"](_0x5d7663)) return !0x1;
                  _0x1e1d50 += _0x2484b9[_0x4b44("0x5a")]();
                }),
                _0x346975[_0x4b44("0x52")](
                  void 0x0,
                  void 0x0,
                  _0x1e1d50,
                  _0x3ec207[_0x4b44("0x9a")](_0x3ec207[_0x4b44("0xa4")]())
                ),
                _0x1567f9[_0x4b44("0x6a")]("qd-ddc-lastAddedFixed"),
                (function (_0x103a09) {
                  _0x103a09[_0x4b44("0xd4")]("qd-ddc-lastAdded");
                  _0x103a09[_0x4b44("0xd4")](_0x4b44("0xb8"));
                  setTimeout(function () {
                    _0x103a09[_0x4b44("0x6a")](_0x4b44("0xe"));
                  }, _0x31d2f4[_0x4b44("0x64")]);
                })(_0x5d7663),
                "undefined" !==
                  typeof window[_0x4b44("0xa0")][_0x4b44("0x98")] &&
                  clearTimeout(window[_0x4b44("0xa0")][_0x4b44("0x98")]),
                _0x1ac1d3(document[_0x4b44("0x1f")])[_0x4b44("0xd4")](
                  "qd-ddc-product-add-time-v2"
                ),
                (window[_0x4b44("0xa0")][_0x4b44("0x98")] = setTimeout(
                  function () {
                    _0x1ac1d3(document[_0x4b44("0x1f")])[_0x4b44("0x6a")](
                      _0x4b44("0x0")
                    );
                  },
                  _0x31d2f4["timeRemoveNewItemClass"]
                )));
            })();
        });
        (function () {
          _QuatroDigital_DropDown["getOrderForm"]["items"][_0x4b44("0x84")]
            ? (_0x1ac1d3("body")
                [_0x4b44("0x6a")](_0x4b44("0xac"))
                [_0x4b44("0xd4")](_0x4b44("0x88")),
              setTimeout(function () {
                _0x1ac1d3(_0x4b44("0x1f"))[_0x4b44("0x6a")](_0x4b44("0x17"));
              }, _0x31d2f4[_0x4b44("0x64")]))
            : _0x1ac1d3("body")
                [_0x4b44("0x6a")](_0x4b44("0xee"))
                [_0x4b44("0xd4")](_0x4b44("0xac"));
        })();
        "function" === typeof _0x31d2f4[_0x4b44("0x1a")]
          ? _0x31d2f4["callbackProductsList"][_0x4b44("0xc6")](this)
          : _0x2fef20(_0x4b44("0x28"));
      };
      _0x346975["insertProdImg"] = function (_0x1c8cd2, _0x286f06, _0x3d4091) {
        function _0x5caa94() {
          _0x3d4091 = _0x3d4091["replace"](
            _0x59e714,
            _0x4b44("0x36") +
              _0x31d2f4[_0x4b44("0xf2")]["w"] +
              "-" +
              _0x31d2f4["thumbSize"]["h"]
          );
          _0x31d2f4[_0x4b44("0xc7")] &&
            "string" == typeof _0x3d4091 &&
            (_0x3d4091 = _0x3d4091[_0x4b44("0xe7")](
              _0x4b44("0x33"),
              _0x4b44("0xe9")
            ));
          _0x286f06[_0x4b44("0x6a")](_0x4b44("0x5d"))
            [_0x4b44("0xaf")](function () {
              _0x1ac1d3(this)["addClass"](_0x4b44("0x5d"));
            })
            [_0x4b44("0xb9")](_0x4b44("0x11"), _0x3d4091);
        }
        _0x3d4091
          ? _0x5caa94()
          : isNaN(_0x1c8cd2)
          ? _0x2fef20(_0x4b44("0xaa"), _0x4b44("0x1b"))
          : _0x2fef20(_0x4b44("0x56"), _0x4b44("0x78"));
      };
      _0x346975[_0x4b44("0x38")] = function (_0x11b9df) {
        var _0x489a87 = function (_0x4b4714, _0x2a55b8) {
          var _0x37be24 = _0x1ac1d3(_0x4b4714);
          var _0x527e20 = _0x37be24["attr"](_0x4b44("0x20"));
          var _0x286f42 = _0x37be24[_0x4b44("0xb9")](_0x4b44("0x5"));
          if (_0x527e20) {
            var _0x23cb59 = parseInt(_0x37be24["val"]()) || 0x1;
            _0x346975[_0x4b44("0xbf")](
              [_0x527e20, _0x286f42],
              _0x23cb59,
              _0x23cb59 + 0x1,
              function (_0x2aef32) {
                _0x37be24["val"](_0x2aef32);
                _0x4b44("0x51") === typeof _0x2a55b8 && _0x2a55b8();
              }
            );
          }
        };
        var _0x360cc8 = function (_0x543f9b, _0x73149) {
          var _0x48ae38 = _0x1ac1d3(_0x543f9b);
          var _0x23c7d8 = _0x48ae38[_0x4b44("0xb9")](_0x4b44("0x20"));
          var _0x5ea29b = _0x48ae38[_0x4b44("0xb9")](_0x4b44("0x5"));
          if (_0x23c7d8) {
            var _0x50c8fc = parseInt(_0x48ae38["val"]()) || 0x2;
            _0x346975[_0x4b44("0xbf")](
              [_0x23c7d8, _0x5ea29b],
              _0x50c8fc,
              _0x50c8fc - 0x1,
              function (_0x9b23b) {
                _0x48ae38["val"](_0x9b23b);
                _0x4b44("0x51") === typeof _0x73149 && _0x73149();
              }
            );
          }
        };
        var _0x9ca0cb = function (_0x4a9c88, _0x5b4620) {
          var _0x15f89c = _0x1ac1d3(_0x4a9c88);
          var _0x418b49 = _0x15f89c["attr"](_0x4b44("0x20"));
          var _0x46adbc = _0x15f89c[_0x4b44("0xb9")]("data-sku-index");
          if (_0x418b49) {
            var _0x5658a6 = parseInt(_0x15f89c[_0x4b44("0x82")]()) || 0x1;
            _0x346975[_0x4b44("0xbf")](
              [_0x418b49, _0x46adbc],
              0x1,
              _0x5658a6,
              function (_0x5f5bf2) {
                _0x15f89c[_0x4b44("0x82")](_0x5f5bf2);
                _0x4b44("0x51") === typeof _0x5b4620 && _0x5b4620();
              }
            );
          }
        };
        var _0x31ccc4 = _0x11b9df[_0x4b44("0xcd")](
          ".qd-ddc-prodQttWrapper:not(.qd_on)"
        );
        _0x31ccc4[_0x4b44("0xd4")]("qd_on")[_0x4b44("0x9b")](function () {
          var _0x3ade60 = _0x1ac1d3(this);
          _0x3ade60[_0x4b44("0xcd")](_0x4b44("0x6b"))["on"](
            "click.qd_ddc_more",
            function (_0x24f3cb) {
              _0x24f3cb[_0x4b44("0x54")]();
              _0x31ccc4[_0x4b44("0xd4")](_0x4b44("0xe8"));
              _0x489a87(_0x3ade60["find"](_0x4b44("0xb3")), function () {
                _0x31ccc4["removeClass"]("qd-loading");
              });
            }
          );
          _0x3ade60[_0x4b44("0xcd")](_0x4b44("0x8a"))["on"](
            "click.qd_ddc_minus",
            function (_0xacfb07) {
              _0xacfb07[_0x4b44("0x54")]();
              _0x31ccc4["addClass"](_0x4b44("0xe8"));
              _0x360cc8(
                _0x3ade60[_0x4b44("0xcd")](_0x4b44("0xb3")),
                function () {
                  _0x31ccc4[_0x4b44("0x6a")]("qd-loading");
                }
              );
            }
          );
          _0x3ade60[_0x4b44("0xcd")](_0x4b44("0xb3"))["on"](
            _0x4b44("0xc9"),
            function () {
              _0x31ccc4[_0x4b44("0xd4")](_0x4b44("0xe8"));
              _0x9ca0cb(this, function () {
                _0x31ccc4[_0x4b44("0x6a")](_0x4b44("0xe8"));
              });
            }
          );
          _0x3ade60[_0x4b44("0xcd")](_0x4b44("0xb3"))["on"](
            _0x4b44("0x73"),
            function (_0x4524c6) {
              0xd == _0x4524c6[_0x4b44("0xa1")] &&
                (_0x31ccc4[_0x4b44("0xd4")]("qd-loading"),
                _0x9ca0cb(this, function () {
                  _0x31ccc4[_0x4b44("0x6a")](_0x4b44("0xe8"));
                }));
            }
          );
        });
        _0x11b9df[_0x4b44("0xcd")](_0x4b44("0x3c"))["each"](function () {
          var _0x1e502d = _0x1ac1d3(this);
          _0x1e502d[_0x4b44("0xcd")](_0x4b44("0xb5"))["on"](
            "click.qd_ddc_remove",
            function () {
              _0x1e502d["addClass"](_0x4b44("0xe8"));
              _0x346975[_0x4b44("0x60")](_0x1ac1d3(this), function (_0x53edd2) {
                _0x53edd2
                  ? _0x1e502d[_0x4b44("0xa2")](!0x0)[_0x4b44("0x72")](
                      function () {
                        _0x1e502d["remove"]();
                        _0x346975["cartIsEmpty"]();
                        window[_0x4b44("0xa0")]["getOrderForm"]["items"][
                          _0x4b44("0x84")
                        ] &&
                          _0x346975["shippingCalculate"](
                            _0x11b9df[_0x4b44("0xb2")](".qd-ddc-wrapper")[
                              _0x4b44("0xcd")
                            ](_0x4b44("0xbc"))
                          );
                      }
                    )
                  : _0x1e502d[_0x4b44("0x6a")](_0x4b44("0xe8"));
              });
              return !0x1;
            }
          );
        });
      };
      _0x346975["formatCepField"] = function (_0x359b4d) {
        var _0x3af304 = _0x359b4d[_0x4b44("0x82")]();
        _0x3af304 = _0x3af304[_0x4b44("0xe7")](_0x57cbf4, "");
        _0x3af304 = _0x3af304[_0x4b44("0xe7")](_0x5ccade, _0x4b44("0xca"));
        _0x3af304 = _0x3af304[_0x4b44("0xe7")](_0x175025, "$1");
        _0x359b4d[_0x4b44("0x82")](_0x3af304);
      };
      _0x346975["shippingCalculate"] = function (_0x353e8d) {
        var _0x332409 = (_0x353e8d[_0x4b44("0x82")]() || "")[_0x4b44("0xe7")](
          /[^0-9]/g,
          ""
        );
        0x8 <= _0x332409[_0x4b44("0x84")] &&
          _0x192618["calculateShipping"]({
            postalCode: _0x332409,
            country: _0x4b44("0xd"),
          })
            ["done"](function (_0x525ff5) {
              _0x353e8d[_0x4b44("0x65")](_0x4b44("0xd6"))
                [_0x4b44("0xcd")](_0x4b44("0x3"))
                [_0x4b44("0xd0")]();
              _0x346975[_0x4b44("0x76")](_0x525ff5);
              _0x346975[_0x4b44("0xb7")]();
              var _0x46d392 = [],
                _0x4f10a4 = _0x525ff5["shippingData"][_0x4b44("0xbb")];
              _0x525ff5 = _0x1ac1d3(_0x4b44("0x49"));
              for (
                var _0x16621f = 0x0;
                _0x16621f < _0x4f10a4[_0x4b44("0x84")];
                _0x16621f++
              )
                for (
                  var _0x5a3161 = _0x4f10a4[_0x16621f][_0x4b44("0x9")],
                    _0x1f7d07 = 0x0;
                  _0x1f7d07 < _0x5a3161[_0x4b44("0x84")];
                  _0x1f7d07++
                )
                  (_0x46d392[_0x1f7d07] = _0x46d392[_0x1f7d07] || {}),
                    (_0x46d392[_0x1f7d07]["price"] =
                      (_0x46d392[_0x1f7d07][_0x4b44("0x4d")] || 0x0) +
                      _0x5a3161[_0x1f7d07][_0x4b44("0x4d")]),
                    (_0x46d392[_0x1f7d07][_0x4b44("0x4e")] =
                      _0x5a3161[_0x1f7d07][_0x4b44("0x4e")]),
                    (_0x46d392[_0x1f7d07]["name"] =
                      _0x5a3161[_0x1f7d07]["name"]);
              for (
                _0x4f10a4 = 0x0;
                _0x4f10a4 < _0x46d392[_0x4b44("0x84")];
                _0x4f10a4++
              )
                (_0x16621f = _0x1ac1d3(_0x4b44("0x6f"))),
                  (_0x5a3161 =
                    0x1 < _0x46d392[_0x4f10a4][_0x4b44("0x4e")]
                      ? _0x46d392[_0x4f10a4][_0x4b44("0x4e")][_0x4b44("0xe7")](
                          "bd",
                          "\x20dia\x20útil"
                        )
                      : _0x46d392[_0x4f10a4][_0x4b44("0x4e")][_0x4b44("0xe7")](
                          "bd",
                          "\x20dias\x20útéis"
                        )),
                  _0x16621f[_0x4b44("0x48")](
                    _0x4b44("0xc0") +
                      qd_number_format(
                        _0x46d392[_0x4f10a4]["price"] / 0x64,
                        0x2,
                        ",",
                        "."
                      ) +
                      "</td><td>" +
                      _0x46d392[_0x4f10a4][_0x4b44("0x8f")] +
                      _0x4b44("0xed") +
                      _0x5a3161 +
                      _0x4b44("0xf1") +
                      _0x332409 +
                      _0x4b44("0xd1")
                  ),
                  _0x16621f["appendTo"](_0x525ff5[_0x4b44("0xcd")]("tbody"));
              _0x525ff5[_0x4b44("0xae")](
                _0x353e8d[_0x4b44("0x65")](_0x4b44("0xd6"))["find"](
                  _0x4b44("0x9d")
                )
              );
            })
            [_0x4b44("0x2")](function (_0x22e069) {
              _0x2fef20([
                "Não\x20foi\x20possível\x20calcular\x20o\x20frete",
                _0x22e069,
              ]);
            });
      };
      _0x346975["changeQantity"] = function (
        _0x40b8cb,
        _0x556180,
        _0x4846dc,
        _0x43e97b
      ) {
        function _0x2c1927(_0x2332e5) {
          _0x2332e5 = _0x4b44("0x29") !== typeof _0x2332e5 ? !0x1 : _0x2332e5;
          _0x346975["getCartInfoByUrl"]();
          window[_0x4b44("0xa0")][_0x4b44("0x39")] = !0x1;
          _0x346975[_0x4b44("0x59")]();
          _0x4b44("0xd7") !== typeof window["_QuatroDigital_AmountProduct"] &&
            _0x4b44("0x51") === typeof window[_0x4b44("0x7b")]["exec"] &&
            window[_0x4b44("0x7b")][_0x4b44("0x6d")][_0x4b44("0xc6")](this);
          _0x4b44("0x51") === typeof adminCart && adminCart();
          _0x1ac1d3["fn"][_0x4b44("0xb4")](!0x0, void 0x0, _0x2332e5);
          _0x4b44("0x51") === typeof _0x43e97b && _0x43e97b(_0x556180);
        }
        _0x4846dc = _0x4846dc || 0x1;
        if (0x1 > _0x4846dc) return _0x556180;
        if (_0x31d2f4[_0x4b44("0x9f")]) {
          var _0x3acf9f = window[_0x4b44("0xa0")][_0x4b44("0x1c")]["items"];
          if (_0x4b44("0xd7") === typeof _0x3acf9f[_0x40b8cb[0x1]])
            return (
              _0x2fef20(
                "Não\x20foi\x20possível\x20localizar\x20os\x20dados\x20do\x20item.\x20A\x20chave\x20buscada\x20é\x20composta\x20pelo\x20SKU:\x20cItems[" +
                  _0x40b8cb[0x1] +
                  "]"
              ),
              _0x556180
            );
          _0x192618["updateItems"](
            [
              {
                id: _0x3acf9f[_0x40b8cb[0x1]]["id"],
                index: _0x40b8cb[0x1],
                quantity: _0x4846dc,
                seller: _0x3acf9f[_0x40b8cb[0x1]]["seller"],
              },
            ],
            [_0x4b44("0x9e"), _0x4b44("0xad"), _0x4b44("0x1")],
            !0x0
          )
            [_0x4b44("0x3b")](function (_0x3a7e1c) {
              _0x346975[_0x4b44("0x76")](_0x3a7e1c);
              _0x2c1927(!0x0);
            })
            [_0x4b44("0x2")](function (_0x2a51b6) {
              _0x2fef20([_0x4b44("0x3a"), _0x2a51b6]);
              _0x2c1927();
            });
        } else _0x2fef20(_0x4b44("0x5b"));
      };
      _0x346975["removeProduct"] = function (_0x1cdca3, _0x5cc730) {
        function _0x31b6bf(_0x355b32) {
          _0x355b32 = _0x4b44("0x29") !== typeof _0x355b32 ? !0x1 : _0x355b32;
          _0x4b44("0xd7") !== typeof window[_0x4b44("0x7b")] &&
            _0x4b44("0x51") ===
              typeof window[_0x4b44("0x7b")][_0x4b44("0x6d")] &&
            window["_QuatroDigital_AmountProduct"][_0x4b44("0x6d")][
              _0x4b44("0xc6")
            ](this);
          "function" === typeof adminCart && adminCart();
          _0x1ac1d3["fn"][_0x4b44("0xb4")](!0x0, void 0x0, _0x355b32);
          _0x4b44("0x51") === typeof _0x5cc730 && _0x5cc730(_0xcbc32e);
        }
        var _0xcbc32e = !0x1,
          _0x3f03e3 = _0x1ac1d3(_0x1cdca3)[_0x4b44("0xb9")](_0x4b44("0x5")),
          _0x32e2e2 = window[_0x4b44("0xa0")]["getOrderForm"][_0x4b44("0x9e")];
        _0x31d2f4[_0x4b44("0x9f")] ||
          _0x2fef20(_0x4b44("0x4c"), _0x4b44("0x78"));
        if (_0x4b44("0xd7") === typeof _0x32e2e2[_0x3f03e3])
          return (
            _0x2fef20(
              "Não\x20foi\x20possível\x20localizar\x20os\x20dados\x20do\x20item.\x20A\x20chave\x20buscada\x20é\x20composta\x20pelo\x20SKU:\x20cItems[" +
                _0x3f03e3 +
                "]"
            ),
            _0xcbc32e
          );
        _0x192618["removeItems"]([{ index: _0x3f03e3, quantity: 0x0 }])
          [_0x4b44("0x3b")](function (_0x4d1469) {
            _0xcbc32e = !0x0;
            _0x346975[_0x4b44("0x76")](_0x4d1469);
            _0x48dd9d(_0x4d1469);
            _0x31b6bf(!0x0);
          })
          [_0x4b44("0x2")](function (_0x1ba99a) {
            _0x2fef20([_0x4b44("0x7f"), _0x1ba99a]);
            _0x31b6bf();
          });
      };
      _0x346975["scrollCart"] = function (
        _0x26d089,
        _0x2fb1ac,
        _0x31fd78,
        _0x12d997
      ) {
        _0x12d997 = _0x12d997 || _0x1ac1d3(_0x4b44("0xe0"));
        _0x26d089 = _0x26d089 || "+";
        _0x2fb1ac = _0x2fb1ac || 0.9 * _0x12d997[_0x4b44("0x16")]();
        _0x12d997["stop"](!0x0, !0x0)["animate"]({
          scrollTop: isNaN(_0x31fd78)
            ? _0x26d089 + "=" + _0x2fb1ac + "px"
            : _0x31fd78,
        });
      };
      _0x346975[_0x4b44("0x76")] = function (_0x475e62) {
        window["_QuatroDigital_DropDown"][_0x4b44("0x1c")] = _0x475e62;
        _0x4b44("0xd7") != typeof _0x475e62 &&
          _0x31d2f4[_0x4b44("0x19")] &&
          _0x346975["buildNotification"](_0x475e62["messages"] || []);
      };
      _0x346975["buildNotification"] = function (_0x4e6993) {
        _0x4e6993[_0x4b44("0x84")] &&
          ((_0x4e6993 = _0x31d2f4["texts"]["notification"]["replace"](
            _0x4b44("0xe4"),
            _0x4e6993[0x0][_0x4b44("0x2e")]
          )),
          _0x349a04[_0x4b44("0xcd")](_0x4b44("0x55"))["length"]
            ? _0x349a04[_0x4b44("0xcd")](_0x4b44("0x55"))[_0x4b44("0x80")](
                _0x4e6993
              )
            : _0x349a04[_0x4b44("0x79")](
                _0x1ac1d3(_0x4b44("0x2a") + _0x4e6993 + "</div>")
              ),
          _0x349a04["find"](_0x4b44("0x2b"))["on"](
            _0x4b44("0x18"),
            function () {
              _0x349a04[_0x4b44("0xcd")](".qd-ddc-notification")[
                _0x4b44("0xd0")
              ]();
              _0x31d2f4[_0x4b44("0x23")] &&
                _0x4b44("0x51") == typeof vtexjs["checkout"]["clearMessages"] &&
                vtexjs[_0x4b44("0xc3")]["clearMessages"]();
            }
          ));
      };
      _0x31d2f4["updateOnlyHover"] ||
        (_0x346975[_0x4b44("0xb7")](), _0x1ac1d3["fn"][_0x4b44("0xb4")](!0x0));
      _0x1ac1d3(window)["on"](_0x4b44("0x1d"), function () {
        try {
          _0x346975["setOrderForm"](void 0x0), _0x346975[_0x4b44("0xb7")]();
        } catch (_0x3afa09) {
          _0x2fef20(
            _0x4b44("0x2f") + _0x3afa09[_0x4b44("0x66")],
            _0x4b44("0x12")
          );
        }
      });
      "function" === typeof _0x31d2f4["callback"]
        ? _0x31d2f4[_0x4b44("0x77")]["call"](this)
        : _0x2fef20(_0x4b44("0xb"));
    };
    _0x1ac1d3["fn"][_0x4b44("0xe5")] = function (_0x35e644) {
      var _0x80bd2f = _0x1ac1d3(this);
      _0x80bd2f["fn"] = new _0x1ac1d3[_0x4b44("0xe5")](this, _0x35e644);
      return _0x80bd2f;
    };
  } catch (_0x48d326) {
    _0x4b44("0xd7") !== typeof console &&
      _0x4b44("0x51") === typeof console[_0x4b44("0xd5")] &&
      console[_0x4b44("0xd5")](_0x4b44("0xa8"), _0x48d326);
  }
})(this);
(function (_0x40f204) {
  try {
    var _0x2d55a4 = jQuery;
    window[_0x4b44("0x7b")] = window["_QuatroDigital_AmountProduct"] || {};
    window[_0x4b44("0x7b")][_0x4b44("0x9e")] = {};
    window["_QuatroDigital_AmountProduct"][_0x4b44("0x4a")] = !0x1;
    window["_QuatroDigital_AmountProduct"][_0x4b44("0x86")] = !0x1;
    window[_0x4b44("0x7b")][_0x4b44("0x57")] = !0x1;
    var _0x15e465 = function () {
      if (window[_0x4b44("0x7b")][_0x4b44("0x4a")]) {
        var _0x40ca73 = !0x1;
        var _0x8c551 = {};
        window["_QuatroDigital_AmountProduct"][_0x4b44("0x9e")] = {};
        for (_0x2c0c6f in window[_0x4b44("0xa0")]["getOrderForm"]["items"])
          if (
            _0x4b44("0x47") ===
            typeof window[_0x4b44("0xa0")][_0x4b44("0x1c")][_0x4b44("0x9e")][
              _0x2c0c6f
            ]
          ) {
            var _0x8f9f89 =
              window["_QuatroDigital_DropDown"][_0x4b44("0x1c")]["items"][
                _0x2c0c6f
              ];
            _0x4b44("0xd7") !== typeof _0x8f9f89[_0x4b44("0xe3")] &&
              null !== _0x8f9f89[_0x4b44("0xe3")] &&
              "" !== _0x8f9f89[_0x4b44("0xe3")] &&
              ((window["_QuatroDigital_AmountProduct"][_0x4b44("0x9e")][
                "prod_" + _0x8f9f89[_0x4b44("0xe3")]
              ] =
                window[_0x4b44("0x7b")][_0x4b44("0x9e")][
                  _0x4b44("0xa3") + _0x8f9f89[_0x4b44("0xe3")]
                ] || {}),
              (window[_0x4b44("0x7b")][_0x4b44("0x9e")][
                _0x4b44("0xa3") + _0x8f9f89[_0x4b44("0xe3")]
              ][_0x4b44("0xb0")] = _0x8f9f89["productId"]),
              _0x8c551[_0x4b44("0xa3") + _0x8f9f89[_0x4b44("0xe3")]] ||
                (window[_0x4b44("0x7b")][_0x4b44("0x9e")][
                  _0x4b44("0xa3") + _0x8f9f89[_0x4b44("0xe3")]
                ][_0x4b44("0x5f")] = 0x0),
              (window[_0x4b44("0x7b")][_0x4b44("0x9e")][
                _0x4b44("0xa3") + _0x8f9f89[_0x4b44("0xe3")]
              ][_0x4b44("0x5f")] += _0x8f9f89[_0x4b44("0x32")]),
              (_0x40ca73 = !0x0),
              (_0x8c551[_0x4b44("0xa3") + _0x8f9f89[_0x4b44("0xe3")]] = !0x0));
          }
        var _0x2c0c6f = _0x40ca73;
      } else _0x2c0c6f = void 0x0;
      window[_0x4b44("0x7b")]["allowRecalculate"] &&
        (_0x2d55a4(".qd-bap-wrapper")[_0x4b44("0xd0")](),
        _0x2d55a4(".qd-bap-item-added")[_0x4b44("0x6a")]("qd-bap-item-added"));
      for (var _0x4b6682 in window[_0x4b44("0x7b")][_0x4b44("0x9e")]) {
        _0x8f9f89 =
          window["_QuatroDigital_AmountProduct"][_0x4b44("0x9e")][_0x4b6682];
        if (_0x4b44("0x47") !== typeof _0x8f9f89) return;
        _0x8c551 = _0x2d55a4(
          _0x4b44("0x75") + _0x8f9f89[_0x4b44("0xb0")] + "]"
        )["getParent"]("li");
        if (
          window[_0x4b44("0x7b")]["allowRecalculate"] ||
          !_0x8c551[_0x4b44("0xcd")](_0x4b44("0xc5"))[_0x4b44("0x84")]
        )
          (_0x40ca73 = _0x2d55a4(_0x4b44("0xb1"))),
            _0x40ca73[_0x4b44("0xcd")](_0x4b44("0x68"))[_0x4b44("0x80")](
              _0x8f9f89[_0x4b44("0x5f")]
            ),
            (_0x8f9f89 = _0x8c551[_0x4b44("0xcd")](".qd_bap_wrapper_content")),
            _0x8f9f89["length"]
              ? _0x8f9f89["prepend"](_0x40ca73)["addClass"](_0x4b44("0xdd"))
              : _0x8c551[_0x4b44("0x79")](_0x40ca73);
      }
      _0x2c0c6f && (window[_0x4b44("0x7b")][_0x4b44("0x4a")] = !0x1);
    };
    window[_0x4b44("0x7b")][_0x4b44("0x6d")] = function () {
      window["_QuatroDigital_AmountProduct"][_0x4b44("0x4a")] = !0x0;
      _0x15e465[_0x4b44("0xc6")](this);
    };
    _0x2d55a4(document)["ajaxStop"](function () {
      _0x15e465[_0x4b44("0xc6")](this);
    });
  } catch (_0x763621) {
    "undefined" !== typeof console &&
      _0x4b44("0x51") === typeof console[_0x4b44("0xd5")] &&
      console[_0x4b44("0xd5")](_0x4b44("0xa8"), _0x763621);
  }
})(this);
(function () {
  try {
    var _0x22072a = jQuery,
      _0x331c63,
      _0x4b5f81 = {
        selector: ".qdDdcContainer",
        dropDown: {},
        buyButton: {},
      };
    _0x22072a[_0x4b44("0x15")] = function (_0x44909a) {
      var _0x2cd382 = {};
      _0x331c63 = _0x22072a[_0x4b44("0x14")](!0x0, {}, _0x4b5f81, _0x44909a);
      _0x44909a = _0x22072a(_0x331c63["selector"])["QD_dropDownCart"](
        _0x331c63[_0x4b44("0x7")]
      );
      _0x2cd382[_0x4b44("0x21")] =
        _0x4b44("0xd7") !==
          typeof _0x331c63[_0x4b44("0x7")]["updateOnlyHover"] &&
        !0x1 === _0x331c63[_0x4b44("0x7")]["updateOnlyHover"]
          ? _0x22072a(_0x331c63["selector"])["QD_buyButton"](
              _0x44909a["fn"],
              _0x331c63[_0x4b44("0x21")]
            )
          : _0x22072a(_0x331c63[_0x4b44("0xce")])["QD_buyButton"](
              _0x331c63["buyButton"]
            );
      _0x2cd382[_0x4b44("0x7")] = _0x44909a;
      return _0x2cd382;
    };
    _0x22072a["fn"]["smartCart"] = function () {
      _0x4b44("0x47") === typeof console &&
        _0x4b44("0x51") === typeof console[_0x4b44("0x8b")] &&
        console[_0x4b44("0x8b")](_0x4b44("0xd2"));
    };
    _0x22072a["smartCart"] = _0x22072a["fn"][_0x4b44("0xc1")];
  } catch (_0x15b3fd) {
    _0x4b44("0xd7") !== typeof console &&
      _0x4b44("0x51") === typeof console["error"] &&
      console[_0x4b44("0xd5")](_0x4b44("0xa8"), _0x15b3fd);
  }
})();
/* Quatro Digital - Product Thumbs // 1.2 // Carlos Vinicius // Todos os direitos reservados. */
(function () {
  function b(a) {
    var b = $("ul.thumbs").not(a);
    a.html(b.html());
    "function" === typeof clickThumbs && clickThumbs();
    a.trigger("QuatroDigital.pt_callback", [a]);
  }
  "function" !== typeof $.fn.QD_productThumbs &&
    (($.fn.QD_productThumbs = function () {
      var a = $(this);
      return a.length ? $.extend({}, a, new b(a)) : a;
    }),
    $(function () {
      $(".QD-thumbs").QD_productThumbs();
    }));
})();
/* Quatro Digital - Scroll Toggle // 1.5 // Carlos Vinicius // Todos os direitos reservados */
(function () {
  var c = jQuery,
    d = function (a, c) {
      if (
        "object" === typeof console &&
        "undefined" !== typeof console.error &&
        "undefined" !== typeof console.info &&
        "undefined" !== typeof console.warn
      ) {
        var b;
        "object" === typeof a
          ? (a.unshift("[QD Scroll Toggle]\n"), (b = a))
          : (b = ["[QD Scroll Toggle]\n" + a]);
        if (
          "undefined" === typeof c ||
          ("alerta" !== c.toLowerCase() && "aviso" !== c.toLowerCase())
        )
          if ("undefined" !== typeof c && "info" === c.toLowerCase())
            try {
              console.info.apply(console, b);
            } catch (e) {
              try {
                console.info(b.join("\n"));
              } catch (g) {}
            }
          else
            try {
              console.error.apply(console, b);
            } catch (e) {
              try {
                console.error(b.join("\n"));
              } catch (g) {}
            }
        else
          try {
            console.warn.apply(console, b);
          } catch (e) {
            try {
              console.warn(b.join("\n"));
            } catch (g) {}
          }
      }
    };
  "function" !== typeof c.QD_scrollToggle &&
    ((c.QD_scrollToggle = function (a) {
      var f = [];
      if (("string" !== typeof a && "number" !== typeof a) || "auto" === a)
        if ("auto" === a) f.push(c(window).height());
        else
          return d(
            "N\u00e3o foi informado o limite de scroll necess\u00e1rio para adicionar o atributo."
          );
      else {
        var b = a.split(","),
          e;
        for (e in b)
          "function" !== typeof b[e] &&
            ((a = parseInt(b[e].trim())), isNaN(a) || f.push(a));
      }
      if (!f.length)
        return d(
          "Aaeeeeeeee irm\u00e3o! N\u00e3o consegui encontrar nenhum valor para calcular o scroll"
        );
      if (
        !document ||
        !document.body ||
        "undefined" === typeof document.body.setAttribute
      )
        return d(
          '"document.body.setAttribute" N\u00e3o \u00e9 uma fun\u00e7\u00e3o :('
        );
      if (
        !document ||
        !document.body ||
        "undefined" === typeof document.body.removeAttribute
      )
        return d(
          '"document.body.removeAttribute" N\u00e3o \u00e9 uma fun\u00e7\u00e3o :('
        );
      if (
        !document ||
        !document.body ||
        "undefined" === typeof document.body.getAttribute
      )
        return d(
          '"document.body.getAttribute" N\u00e3o \u00e9 uma fun\u00e7\u00e3o :('
        );
      if (!c(window).scrollTop || isNaN(parseInt(c(window).scrollTop())))
        return d(
          '"$(window).scrollTop" n\u00e3o esta retornando um n\u00famero inteiro :('
        );
      try {
        document.body.setAttribute("data-qd-scroll", 1),
          document.body.getAttribute("data-qd-scroll"),
          document.body.removeAttribute("data-qd-scroll"),
          document.body.getAttribute("data-qd-scroll");
      } catch (h) {
        d(
          "N\u00e3o foi poss\u00edvel fazer o passo a passo de consultar, adicionar e remover um atributo",
          h.message
        );
      }
      var g = c(window).scrollTop();
      c(window).scroll(function () {
        for (var a = c(window).scrollTop(), b = 0; b < f.length; b++)
          a > f[b]
            ? document.body.getAttribute("data-qd-scroll-" + b) ||
              document.body.setAttribute("data-qd-scroll-" + b, 1)
            : document.body.getAttribute("data-qd-scroll-" + b) &&
              document.body.removeAttribute("data-qd-scroll-" + b);
        a < g
          ? (document.body.removeAttribute("data-qd-scroll-down"),
            document.body.setAttribute("data-qd-scroll-up", 1))
          : (document.body.removeAttribute("data-qd-scroll-up"),
            document.body.setAttribute("data-qd-scroll-down", 1));
        g = a;
      });
    }),
    c(function () {
      var a = c("body[data-qd-scroll-limit]");
      a.length && c.QD_scrollToggle(a.attr("data-qd-scroll-limit"));
    }));
})();
/* Quatro Digital - Mosaic Banners // 1.2 // Carlos Vinicius // Todos os direitos reservados */
(function (q) {
  var e = jQuery;
  if ("function" !== typeof e.fn.QD_mosaicBanners) {
    var k = function (c, b) {
        if (
          "object" === typeof console &&
          "undefined" !== typeof console.error &&
          "undefined" !== typeof console.info &&
          "undefined" !== typeof console.warn
        ) {
          var a;
          "object" === typeof c
            ? (c.unshift("[Quatro Digital - Mosaic Banners]\n"), (a = c))
            : (a = ["[Quatro Digital - Mosaic Banners]\n" + c]);
          if (
            "undefined" === typeof b ||
            ("alerta" !== b.toLowerCase() && "aviso" !== b.toLowerCase())
          )
            if ("undefined" !== typeof b && "info" === b.toLowerCase())
              try {
                console.info.apply(console, a);
              } catch (f) {
                try {
                  console.info(a.join("\n"));
                } catch (d) {}
              }
            else
              try {
                console.error.apply(console, a);
              } catch (f) {
                try {
                  console.error(a.join("\n"));
                } catch (d) {}
              }
          else
            try {
              console.warn.apply(console, a);
            } catch (f) {
              try {
                console.warn(a.join("\n"));
              } catch (d) {}
            }
        }
      },
      l = {
        bannerRowSecurityMargin: 10,
        containerWidth: 1170,
        bannerColSecurityMargin: 15,
        classOneColumn: "col-xs-12",
        classTwoColumn: "col-xs-12 col-sm-6",
        classThreeColumn: "col-xs-12 col-sm-4",
        classFourColumn: "col-xs-6 col-sm-3",
      },
      m = function (c, b) {
        function a(f) {
          var d,
            g = new e();
          f.length &&
            (f.each(function () {
              var f = e(this),
                a = f.offset().top;
              d || (d = a);
              if (
                a >= d - b.bannerRowSecurityMargin &&
                a <= d + b.bannerRowSecurityMargin
              )
                g = g.add(f);
              else return !1;
            }),
            g.wrapAll('<div class="row qd-mb-row"></div>'),
            a(c.find(">div:not(.row)")));
        }
        a(c.find(">div:not(.row)"));
      },
      n = /width\=.?([0-9]+)/i,
      p = function (c, b) {
        var a = e(c);
        a.each(function () {
          var a = e(this);
          if (a.is(".qd-mb-banner"))
            k(["Este banner j\u00e1 esta processado!", a], "info");
          else {
            a.addClass("qd-mb-banner");
            var d = a.find("img").first();
            if (d.length) {
              var c = parseInt,
                d = d.wrap("<span></span>"),
                h = d.parent().html();
              d.unwrap("span");
              d = h.replace(/\n/g, " ");
              c = c((d.match(n) || [1]).pop(), 10) || 1;
              d =
                (b.containerWidth / 2) *
                (1 - b.bannerColSecurityMargin / 2 / 100);
              h =
                (b.containerWidth / 3) *
                (1 - b.bannerColSecurityMargin / 3 / 100);
              c > b.containerWidth * (1 - b.bannerColSecurityMargin / 100)
                ? a.addClass(b.classOneColumn)
                : c > d
                ? a.addClass(b.classTwoColumn)
                : c > h
                ? a.addClass(b.classThreeColumn)
                : a.addClass(b.classFourColumn);
            } else
              k(
                [
                  "Esse elemento n\u00e3o possui nenhuma imagem dentro. Certifique-se que esteja chamando um \u201c.box-banner\u201d. Mas voc\u00ea \u00e9 burro hein!",
                  a,
                ],
                "info"
              );
          }
        });
        a.parent().each(function () {
          m(e(this), b);
        });
      };
    e.fn.QD_mosaicBanners = function (c) {
      var b = e(this);
      if (!b.length) return b;
      c = e.extend({}, l, c);
      b.qdPlugin = new p(b, c);
      return b;
    };
    e(function () {
      e(".qd_auto_mosaic_banners .box-banner").QD_mosaicBanners();
    });
  }
})(this);
var _0x255b = [
  "j%25C2%25A8pragrecnegf%25C2%25A8pbz%25C2%25A8oe",
  "src",
  "toLowerCase",
  "unshift",
  "[Quatro\x20Digital\x20-\x20Smart\x20Image\x20Load]\x0a",
  "apply",
  "qd-sil-on",
  "scrollTop",
  "bargerr%25C2%25A8igrkpbzzreprfgnoyr%25C2%25A8pbz%25C2%25A8oe",
  "qd-sil-image",
  "aviso",
  "documentElement",
  "info",
  "QD_SIL_scroll\x20QuatroDigital.is_Callback",
  "erc",
  "bottom",
  "function",
  "QD_smartImageLoad",
  "toUpperCase",
  "imageWrapper",
  "grecnegf%25C2%25A8igrkpbzzreprfgnoyr%25C2%25A8pbz%25C2%25A8oe",
  "closest",
  "img:visible",
  "undefined",
  "replace",
  "warn",
  "addClass",
  "push",
  "clone",
  "qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82",
  ".qd_sil_img_wrapper",
  "QD_SIL_scrollRange",
  "QD_SIL_individualChildRender",
  "top",
  "attr",
  "length",
  "sizes",
  "ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!",
  "first",
  "Problemas\x20:(\x20.\x20Detalhes:\x20",
  "not",
  "object",
  "load",
  "---",
  "extend",
  ".qd-sil-on",
  "QD_SIL_scroll",
  "offset",
  "alerta",
  "body",
  "find",
  "error",
  "width",
  "join",
  "height",
  "insertAfter",
];
(function (_0x2226d4, _0x255b29) {
  var _0x669a31 = function (_0x46bddb) {
    while (--_0x46bddb) {
      _0x2226d4["push"](_0x2226d4["shift"]());
    }
  };
  _0x669a31(++_0x255b29);
})(_0x255b, 0xf3);
var _0x669a = function (_0x2226d4, _0x255b29) {
  _0x2226d4 = _0x2226d4 - 0x0;
  var _0x669a31 = _0x255b[_0x2226d4];
  return _0x669a31;
};
(function (_0x116edb) {
  var _0x1c7fab = jQuery;
  if (_0x669a("0x35") !== typeof _0x1c7fab["fn"][_0x669a("0x36")]) {
    _0x1c7fab["fn"]["QD_smartImageLoad"] = function () {};
    _0x116edb = (function (_0x1c4b7f) {
      var _0x36d78b = {
        p: "ragrecnegf%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe",
        jj: _0x669a("0x25"),
        pra: _0x669a("0x1"),
        dqfg: _0x669a("0x2d"),
      };
      return (function (_0x1c6f8f) {
        var _0x37bda6 = function (_0x2770f1) {
          return _0x2770f1;
        };
        var _0x301755 = [
          "a",
          "e",
          0x12,
          "m",
          "s",
          "k",
          "d",
          "u",
          "g",
          "h",
          "a",
          "g",
          "s",
          "t",
          "z",
          "y",
          "o",
          "u",
          "o",
          "b",
        ];
        _0x1c6f8f =
          _0x1c6f8f[
            "d" +
              _0x301755[0x10] +
              "c" +
              _0x301755[0x11] +
              "m" +
              _0x37bda6(_0x301755[0x1]) +
              "n" +
              _0x301755[0xd]
          ][
            "l" +
              _0x301755[0x12] +
              "c" +
              _0x301755[0x0] +
              "ti" +
              _0x37bda6("o") +
              "n"
          ];
        var _0x156d77 = function (_0x535ebf) {
          return escape(
            encodeURIComponent(
              _0x535ebf[_0x669a("0x5")](/\./g, "¨")[_0x669a("0x5")](
                /[a-zA-Z]/g,
                function (_0xe415ad) {
                  return String["fromCharCode"](
                    ("Z" >= _0xe415ad ? 0x5a : 0x7a) >=
                      (_0xe415ad = _0xe415ad["charCodeAt"](0x0) + 0xd)
                      ? _0xe415ad
                      : _0xe415ad - 0x1a
                  );
                }
              )
            )
          );
        };
        var _0x2cf379 = _0x156d77(
          _0x1c6f8f[
            [
              _0x301755[0x9],
              _0x37bda6("o"),
              _0x301755[0xc],
              _0x301755[_0x37bda6(0xd)],
            ][_0x669a("0x22")]("")
          ]
        );
        _0x156d77 = _0x156d77(
          (window[
            [
              "js",
              _0x37bda6("no"),
              "m",
              _0x301755[0x1],
              _0x301755[0x4][_0x669a("0x37")](),
              "ite",
            ][_0x669a("0x22")]("")
          ] || _0x669a("0x18")) +
            [
              ".v",
              _0x301755[0xd],
              "e",
              _0x37bda6("x"),
              "co",
              _0x37bda6("mm"),
              _0x669a("0x33"),
              _0x301755[0x1],
              ".c",
              _0x37bda6("o"),
              "m.",
              _0x301755[0x13],
              "r",
            ][_0x669a("0x22")]("")
        );
        for (var _0x4c2a83 in _0x36d78b) {
          if (
            _0x156d77 === _0x4c2a83 + _0x36d78b[_0x4c2a83] ||
            _0x2cf379 === _0x4c2a83 + _0x36d78b[_0x4c2a83]
          ) {
            var _0x170dfe = "tr" + _0x301755[0x11] + "e";
            break;
          }
          _0x170dfe = "f" + _0x301755[0x0] + "ls" + _0x37bda6(_0x301755[0x1]);
        }
        _0x37bda6 = !0x1;
        -0x1 <
          _0x1c6f8f[
            [_0x301755[0xc], "e", _0x301755[0x0], "rc", _0x301755[0x9]][
              _0x669a("0x22")
            ]("")
          ]["indexOf"](_0x669a("0xa")) && (_0x37bda6 = !0x0);
        return [_0x170dfe, _0x37bda6];
      })(_0x1c4b7f);
    })(window);
    if (!eval(_0x116edb[0x0]))
      return _0x116edb[0x1] ? _0x124143(_0x669a("0x12")) : !0x1;
    var _0x124143 = function (_0x1815be, _0x7fa9f) {
        if (
          _0x669a("0x16") === typeof console &&
          _0x669a("0x4") !== typeof console[_0x669a("0x20")] &&
          _0x669a("0x4") !== typeof console["info"] &&
          _0x669a("0x4") !== typeof console[_0x669a("0x6")]
        ) {
          if (
            _0x669a("0x16") == typeof _0x1815be &&
            "function" == typeof _0x1815be[_0x669a("0x28")]
          ) {
            _0x1815be[_0x669a("0x28")](_0x669a("0x29"));
            var _0x1e15fe = _0x1815be;
          } else _0x1e15fe = [_0x669a("0x29"), _0x1815be];
          if (
            "undefined" == typeof _0x7fa9f ||
            (_0x669a("0x1d") !== _0x7fa9f["toLowerCase"]() &&
              _0x669a("0x2f") !== _0x7fa9f["toLowerCase"]())
          )
            if (
              _0x669a("0x4") != typeof _0x7fa9f &&
              "info" == _0x7fa9f[_0x669a("0x27")]()
            )
              try {
                console["info"][_0x669a("0x2a")](console, _0x1e15fe);
              } catch (_0x262383) {
                try {
                  console[_0x669a("0x31")](_0x1e15fe[_0x669a("0x22")]("\x0a"));
                } catch (_0x1e860a) {}
              }
            else
              try {
                console["error"][_0x669a("0x2a")](console, _0x1e15fe);
              } catch (_0x2295a3) {
                try {
                  console["error"](_0x1e15fe[_0x669a("0x22")]("\x0a"));
                } catch (_0xb1d0d1) {}
              }
          else
            try {
              console[_0x669a("0x6")][_0x669a("0x2a")](console, _0x1e15fe);
            } catch (_0x2ded2d) {
              try {
                console[_0x669a("0x6")](_0x1e15fe["join"]("\x0a"));
              } catch (_0x2e8332) {}
            }
        }
      },
      _0x2fff4a = /(ids\/[0-9]+-)[0-9-]+/i,
      _0x1cc8eb = {
        imageWrapper: _0x669a("0xb"),
        sizes: { width: "300", height: "300" },
      },
      _0x18db84 = function (_0x860251, _0x4e840d) {
        function _0x3e7dd8(_0x148a19) {
          try {
            var _0x49ee08 = _0x148a19["find"](_0x4e840d[_0x669a("0x0")])
              [_0x669a("0x15")](_0x669a("0x1a"))
              [_0x669a("0x1f")](_0x669a("0x3"));
            if (_0x49ee08[_0x669a("0x10")]) {
              var _0x4b4d7a = _0x1c7fab(window),
                _0x1aac81 = _0x4b4d7a[_0x669a("0x2c")]();
              var _0x5c0095 = _0x1aac81 + _0x4b4d7a[_0x669a("0x23")]();
              var _0x3f0a89 = _0x49ee08[_0x669a("0x13")]()[_0x669a("0x23")]();
              _0x148a19 = [];
              for (
                _0x4b4d7a = 0x0;
                _0x4b4d7a < _0x49ee08[_0x669a("0x10")];
                _0x4b4d7a++
              ) {
                var _0x3b3e9e = _0x1c7fab(_0x49ee08[_0x4b4d7a])[
                  _0x669a("0x1c")
                ]();
                _0x3b3e9e[_0x669a("0x34")] =
                  _0x3b3e9e[_0x669a("0xe")] + _0x3f0a89;
                _0x5c0095 < _0x3b3e9e["top"] ||
                  _0x1aac81 > _0x3b3e9e[_0x669a("0x34")] ||
                  _0x148a19[_0x669a("0x8")](_0x49ee08[_0x4b4d7a]);
              }
              for (
                _0x49ee08 = 0x0;
                _0x49ee08 < _0x148a19[_0x669a("0x10")];
                _0x49ee08++
              )
                _0xe7651b(_0x1c7fab(_0x148a19[_0x49ee08]));
            }
          } catch (_0x19dcca) {
            _0x669a("0x4") !== typeof console &&
              _0x669a("0x35") === typeof console[_0x669a("0x20")] &&
              console[_0x669a("0x20")](_0x669a("0x14"), _0x19dcca);
          }
        }
        function _0xe7651b(_0x482ebc) {
          var _0x54580d = _0x482ebc[_0x669a("0x9")]();
          _0x54580d["on"](_0x669a("0x17"), function () {
            _0x1c7fab(this)[_0x669a("0x7")]("qd-sil-image-loaded");
          });
          _0x54580d[_0x669a("0xf")]({
            src: _0x54580d[0x0][_0x669a("0x26")][_0x669a("0x5")](
              _0x2fff4a,
              "$1" +
                _0x4e840d[_0x669a("0x11")][_0x669a("0x21")] +
                "-" +
                _0x4e840d[_0x669a("0x11")][_0x669a("0x23")]
            ),
            width: _0x4e840d["sizes"][_0x669a("0x21")],
            height: _0x4e840d[_0x669a("0x11")][_0x669a("0x23")],
          });
          _0x54580d["addClass"](_0x669a("0x2e"))[_0x669a("0x24")](_0x482ebc);
          _0x54580d[_0x669a("0x2")](_0x4e840d[_0x669a("0x0")])[_0x669a("0x7")](
            _0x669a("0x2b")
          );
        }
        _0x3e7dd8(_0x860251);
        _0x1c7fab(window)["on"](_0x669a("0x32"), function () {
          _0x3e7dd8(_0x860251);
        });
        _0x1c7fab(window)["on"](
          _0x669a("0xd"),
          function (_0x164edd, _0xce8cae) {
            var _0x542dc1 = _0x860251[_0x669a("0x1f")](_0xce8cae);
            _0x542dc1[_0x669a("0x10")] && _0x3e7dd8(_0x542dc1);
          }
        );
      };
    _0x1c7fab["fn"][_0x669a("0x36")] = function (_0x1e00df) {
      var _0x1d8239 = _0x1c7fab(this);
      if (!_0x1d8239[_0x669a("0x10")]) return _0x1d8239;
      _0x1d8239["each"](function () {
        var _0x298ef0 = _0x1c7fab(this);
        _0x298ef0[_0x669a("0x36")] = new _0x18db84(
          _0x298ef0,
          _0x1c7fab[_0x669a("0x19")]({}, _0x1cc8eb, _0x1e00df)
        );
      });
      return _0x1d8239;
    };
    window[_0x669a("0xc")] = 0x28;
    var _0x2a9632 = QD_SIL_scrollRange,
      _0x150531 = 0x0;
    _0x1c7fab(window)["on"]("scroll", function () {
      var _0x59366a =
        document[_0x669a("0x30")][_0x669a("0x2c")] ||
        document[_0x669a("0x1e")][_0x669a("0x2c")];
      if (
        _0x59366a > _0x150531 + _0x2a9632 ||
        _0x59366a < _0x150531 - _0x2a9632
      )
        _0x1c7fab(window)["trigger"](_0x669a("0x1b")), (_0x150531 = _0x59366a);
    });
  }
})(this);
/* Quatro Digital Newsletter // 6.1 // Carlos Vinicius [ QUATRO DIGITAL ] // Todos os Direitos Reservados */
// FUNÇÕES AUXILIARES
if ("function" !== typeof String.prototype.trim)
  String.prototype.trim = function () {
    return this.replace(/^\s+|\s+$/g, "");
  };
// CORE
(function () {
  var d = jQuery;
  if ("function" !== typeof d.fn.QD_news) {
    var w = {
      defaultName: "Digite seu nome...",
      defaultEmail: "Digite seu e-mail...",
      nameField: ".qd_news_name",
      checkNameFieldIsVisible: !0,
      emailField: ".qd_news_email",
      btn: ".qd_news_button",
      originField: ".qd_news_origin",
      elementError: ".nv2_messageError",
      elementSuccess: ".nv2_messageSuccess",
      validationMethod: "popup",
      getAttr: "alt",
      setDefaultName: !0,
      checkNameExist: !0,
      validateName: !0,
      showInPopup: !0,
      animation: "blink",
      animateSpeed: 100,
      animateDistance: 15,
      animateRepeat: 3,
      animateFieldSuccess: ".qd_news_animate_field_success",
      timeHideSuccessMsg: 3e3,
      platform: "vtexcrm",
      vtexStore: jsnomeLoja,
      entity: "NL",
      allowSubmit: function () {
        return !0;
      },
      successCallback: function () {},
      submitCallback: function (d, g) {},
    };
    d.fn.QD_news = function (t) {
      var g = function (a, d) {
          if (
            "object" === typeof console &&
            "function" === typeof console.error &&
            "function" === typeof console.info &&
            "function" === typeof console.warn
          ) {
            var e;
            "object" === typeof a
              ? (a.unshift("[QD News]\n"), (e = a))
              : (e = ["[QD News]\n" + a]);
            if (
              "undefined" === typeof d ||
              ("alerta" !== d.toLowerCase() && "aviso" !== d.toLowerCase())
            )
              if ("undefined" !== typeof d && "info" === d.toLowerCase())
                try {
                  console.info.apply(console, e);
                } catch (c) {
                  console.info(e.join("\n"));
                }
              else
                try {
                  console.error.apply(console, e);
                } catch (c) {
                  console.error(e.join("\n"));
                }
            else
              try {
                console.warn.apply(console, e);
              } catch (c) {
                console.warn(e.join("\n"));
              }
          }
        },
        k = d(this);
      if (!k.length) return k;
      var a = d.extend({}, w, t);
      a.showInPopup || (a.validationMethod = "div");
      null !== a.animation
        ? (a.validationMethod = "animateField")
        : "animateField" == a.validationMethod && (a.animation = "leftRight");
      if (
        "popup" == a.validationMethod &&
        "function" !== typeof d.fn.vtexPopUp2
      )
        return (
          g("O popUp2 n\u00e3o foi encontrado. Adicione o Plugin de PopUp2."), k
        );
      var v = function (d) {
        var g = 0;
        var e = function () {
          d.animate(
            { left: "-=" + a.animateDistance },
            a.animateSpeed,
            function () {
              d.animate(
                { left: "+=" + a.animateDistance },
                a.animateSpeed,
                function () {
                  g < a.animateRepeat && e();
                  g++;
                }
              );
            }
          );
        };
        var c = function () {
          d.fadeTo(a.animateSpeed, 0.2, function () {
            d.fadeTo(a.animateSpeed, 1, function () {
              g < a.animateRepeat && c();
              g++;
            });
          });
        };
        d.stop(!0, !0);
        "leftRight" == a.animation ? e() : "blink" == a.animation && c();
      };
      k.each(function () {
        function k(b, q) {
          l.attr("disabled", "disabled");
          var f = {
            postData: {
              newsletterClientEmail: b,
              newsletterClientName: a.defaultName == q ? "-" : q,
              newsInternalCampaign: "newsletter:opt-in",
              newsInternalPage: (document.location.pathname || "/").replace(
                /\//g,
                "_"
              ),
              newsInternalPart: "newsletter",
            },
            button: l,
            wrapper: c,
          };
          "linx" == a.platform &&
            ((f.postData.nome = f.postData.newsletterClientName),
            (f.postData.email = f.postData.newsletterClientEmail));
          "vtexcrm" == a.platform
            ? t(function (x) {
                e(
                  f,
                  d.ajax({
                    url: "/api/dataentities/" + a.entity + "/documents",
                    type: "PATCH",
                    dataType: "json",
                    headers: {
                      Accept: "application/vnd.vtex.ds.v10+json",
                      "Content-Type": "application/json; charset=utf-8",
                    },
                    data: JSON.stringify({
                      id: b.toLowerCase().replace(/[^a-z0-9]/gi, function (a) {
                        return "-" + a.charCodeAt(0) + "-";
                      }),
                      ip: x,
                      origin: c.find(a.originField).val() || "---",
                      qd_email: b,
                      qd_name: q,
                      URI: location.href,
                    }),
                  })
                );
              })
            : e(
                f,
                d.ajax({
                  url:
                    "linx" == a.platform
                      ? "/newsletter.aspx"
                      : "/no-cache/Newsletter.aspx",
                  type: "linx" == a.platform ? "GET" : "POST",
                  data: f.postData,
                })
              );
          a.submitCallback(b, q);
        }
        function t(a) {
          d.ajax({
            url: "//api.ipify.org?format=jsonp",
            dataType: "jsonp",
            success: function (b) {
              a(b.ip);
            },
            error: function () {
              d.ajax({
                url: "//freegeoip.net/json/",
                dataType: "json",
                success: function (b) {
                  a(b.ip);
                },
                error: function (b) {
                  a(null);
                },
              });
            },
          });
        }
        function e(b, e) {
          e.fail(function () {
            alert(
              "Desculpe. N\u00e3o foi poss\u00edvel cadastrar seu e-mail, por favor tente novamente."
            );
          });
          e.done(function (e) {
            l.removeAttr("disabled");
            if (
              "linx" == a.platform &&
              !(
                -1 < e.indexOf(" com sucesso.") ||
                -1 < e.indexOf(" cadastrado.")
              )
            )
              return alert(e);
            "popup" == a.validationMethod
              ? r.vtexPopUp2({
                  popupType: "newsletter",
                  popupClass: "popupNewsletterSuccess",
                })
              : "animateField" != a.validationMethod &&
                r.slideDown().bind("click", function () {
                  d(this).slideUp();
                });
            var f = c.find(a.emailField);
            a.setDefaultName &&
              c.find(a.nameField).is("input:text, textarea") &&
              c.find(a.nameField).val(a.defaultName);
            if ("animateField" == a.validationMethod) {
              f.val(c.find(a.animateFieldSuccess).val() || "Obrigado!!!");
              f.addClass("vtexNewsSuccess");
              var g = setTimeout(function () {
                f.removeClass("vtexNewsSuccess");
                f.val(a.defaultEmail);
                f.unbind("focus.vtexNews");
              }, a.timeHideSuccessMsg);
              f.bind("focus.vtexNews", function () {
                f.removeClass("vtexNewsSuccess");
                clearTimeout(g);
                d(this).val("");
                d(this).unbind("focus.vtexNews");
              });
            } else f.val(a.defaultEmail);
            a.successCallback(b);
            d(c).trigger("qdNewsSuccessCallback", b);
          });
        }
        var c = d(this),
          m = c.find(a.nameField),
          h = c.find(a.emailField),
          l = c.find(a.btn);
        if ("animateField" != a.validationMethod) {
          var n = c.find(a.elementError);
          var r = c.find(a.elementSuccess);
        }
        1 > m.length &&
          a.checkNameExist &&
          g(
            "Campo de nome, n\u00e3o encontrado (" +
              m.selector +
              "). Ser\u00e1 atribuido um valor padr\u00e3o.",
            "info"
          );
        if (1 > h.length)
          return (
            g("Campo de e-mail, n\u00e3o encontrado (" + h.selector + ")"), c
          );
        if (1 > l.length)
          return (
            g("Bot\u00e3o de envio, n\u00e3o encontrado (" + l.selector + ")"),
            c
          );
        if (
          "animateField" != a.validationMethod &&
          (1 > r.length || 1 > n.length)
        )
          return (
            g(
              "A(s) mensagem(ns) de erro e/ou sucesso esta(m) faltando \n (" +
                r.selector +
                ", " +
                n.selector +
                ")"
            ),
            c
          );
        a.setDefaultName &&
          m.is("input[type=text], textarea") &&
          m.val(a.defaultName);
        h.val(a.defaultEmail);
        (function () {
          if (a.checkNameExist) {
            if (a.checkNameFieldIsVisible) {
              var b = m.filter(":visible");
              if (!b.length) return;
            } else b = m;
            var c = b.val();
            b.is("input:text, textarea") &&
              b.bind({
                focus: function () {
                  b.val() != c ||
                    (0 !== b.val().search(a.defaultName.substr(0, 6)) &&
                      !a.setDefaultName) ||
                    b.val("");
                },
                blur: function () {
                  "" === b.val() && b.val(c);
                },
              });
          }
        })();
        (function () {
          var b = h.val();
          h.bind({
            focus: function () {
              h.val() == b &&
                0 === h.val().search(a.defaultEmail.substr(0, 6)) &&
                h.val("");
            },
            blur: function () {
              "" === h.val() && h.val(b);
            },
          });
        })();
        var u = function () {
          var b;
          var e = (b = c
            .find(a.nameField)
            .filter("input[type=text],select,textarea")
            .val())
            ? b
            : c
                .find(a.nameField)
                .filter("input[type=radio], input[type=checkbox]").length
            ? c
                .find(a.nameField)
                .filter(
                  "input[type=radio]:checked, input[type=checkbox]:checked"
                )
                .val() || ""
            : (b = c.find(a.nameField).attr(a.getAttr))
            ? b
            : (b = c.find(a.nameField).text())
            ? b
            : (b = c
                .find(a.nameField)
                .find(".box-banner img:first")
                .attr("alt"))
            ? b
            : "Nome_Padrao";
          b = (c.find(a.emailField).val() || "").trim();
          var f = c.find(a.nameField).is(":visible");
          f = a.validateName
            ? (1 > e.length || 0 === e.search(a.defaultName.substr(0, 6))) &&
              (a.checkNameExist || f ? f : !0)
            : !1;
          var h =
            0 >
            b.search(/^[a-z0-9_\-\.\+]+@[a-z0-9_\-]+(\.[a-z0-9_\-]{2,})+$/i);
          f || h
            ? "animateField" == a.validationMethod
              ? (f && v(c.find(a.nameField)), h && v(c.find(a.emailField)))
              : "popup" == a.validationMethod
              ? n.vtexPopUp2({
                  popupType: "newsletter",
                  popupClass: "popupNewsletterError",
                })
              : (n.slideDown().bind("click", function () {
                  d(this).slideUp();
                }),
                setTimeout(function () {
                  n.slideUp();
                }, 1800))
            : a.allowSubmit()
            ? k(b, e)
            : g(
                "Os dados n\u00e3o foram enviados pois o parametro 'allowSubmit' n\u00e3o retornou 'true'",
                "info"
              );
        };
        var p = function (a) {
          13 == (a.keyCode ? a.keyCode : a.which) && (a.preventDefault(), u());
        };
        m.filter("input:text, textarea").bind("keydown", p);
        h.bind("keydown", p);
        p = l.getParent("form");
        p.length
          ? p.submit(function (a) {
              a.preventDefault();
              u();
            })
          : l.bind("click.qd_news", function () {
              u();
            });
      });
      return k;
    };
    d(function () {
      d(".qd_news_auto").QD_news();
    });
  }
})();

/**
 *  Ajax Autocomplete for jQuery, version 1.4.9
 *  (c) 2017 Tomas Kirda
 *
 *  Ajax Autocomplete for jQuery is freely distributable under the terms of an MIT-style license.
 *  For details, see the web site: https://github.com/devbridge/jQuery-Autocomplete
 */
!(function (a) {
  "use strict";
  "function" == typeof define && define.amd
    ? define(["jquery"], a)
    : a(
        "object" == typeof exports && "function" == typeof require
          ? require("jquery")
          : jQuery
      );
})(function (a) {
  "use strict";
  function b(c, d) {
    var e = this;
    (e.element = c),
      (e.el = a(c)),
      (e.suggestions = []),
      (e.badQueries = []),
      (e.selectedIndex = -1),
      (e.currentValue = e.element.value),
      (e.timeoutId = null),
      (e.cachedResponse = {}),
      (e.onChangeTimeout = null),
      (e.onChange = null),
      (e.isLocal = !1),
      (e.suggestionsContainer = null),
      (e.noSuggestionsContainer = null),
      (e.options = a.extend(!0, {}, b.defaults, d)),
      (e.classes = {
        selected: "autocomplete-selected",
        suggestion: "autocomplete-suggestion",
      }),
      (e.hint = null),
      (e.hintValue = ""),
      (e.selection = null),
      e.initialize(),
      e.setOptions(d);
  }
  function c(a, b, c) {
    return a.value.toLowerCase().indexOf(c) !== -1;
  }
  function d(b) {
    return "string" == typeof b ? a.parseJSON(b) : b;
  }
  function e(a, b) {
    if (!b) return a.value;
    var c = "(" + g.escapeRegExChars(b) + ")";
    return a.value
      .replace(new RegExp(c, "gi"), "<strong>$1</strong>")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/&lt;(\/?strong)&gt;/g, "<$1>");
  }
  function f(a, b) {
    return '<div class="autocomplete-group">' + b + "</div>";
  }
  var g = (function () {
      return {
        escapeRegExChars: function (a) {
          return a.replace(/[|\\{}()[\]^$+*?.]/g, "\\$&");
        },
        createNode: function (a) {
          var b = document.createElement("div");
          return (
            (b.className = a),
            (b.style.position = "absolute"),
            (b.style.display = "none"),
            b
          );
        },
      };
    })(),
    h = {
      ESC: 27,
      TAB: 9,
      RETURN: 13,
      LEFT: 37,
      UP: 38,
      RIGHT: 39,
      DOWN: 40,
    },
    i = a.noop;
  (b.utils = g),
    (a.Autocomplete = b),
    (b.defaults = {
      ajaxSettings: {},
      autoSelectFirst: !1,
      appendTo: "body",
      serviceUrl: null,
      lookup: null,
      onSelect: null,
      width: "auto",
      minChars: 1,
      maxHeight: 300,
      deferRequestBy: 0,
      params: {},
      formatResult: e,
      formatGroup: f,
      delimiter: null,
      zIndex: 9999,
      type: "GET",
      noCache: !1,
      onSearchStart: i,
      onSearchComplete: i,
      onSearchError: i,
      preserveInput: !1,
      containerClass: "autocomplete-suggestions",
      tabDisabled: !1,
      dataType: "text",
      currentRequest: null,
      triggerSelectOnValidInput: !0,
      preventBadQueries: !0,
      lookupFilter: c,
      paramName: "query",
      transformResult: d,
      showNoSuggestionNotice: !1,
      noSuggestionNotice: "No results",
      orientation: "bottom",
      forceFixPosition: !1,
    }),
    (b.prototype = {
      initialize: function () {
        var c,
          d = this,
          e = "." + d.classes.suggestion,
          f = d.classes.selected,
          g = d.options;
        d.element.setAttribute("autocomplete", "off"),
          (d.noSuggestionsContainer = a(
            '<div class="autocomplete-no-suggestion"></div>'
          )
            .html(this.options.noSuggestionNotice)
            .get(0)),
          (d.suggestionsContainer = b.utils.createNode(g.containerClass)),
          (c = a(d.suggestionsContainer)),
          c.appendTo(g.appendTo || "body"),
          "auto" !== g.width && c.css("width", g.width),
          c.on("mouseover.autocomplete", e, function () {
            d.activate(a(this).data("index"));
          }),
          c.on("mouseout.autocomplete", function () {
            (d.selectedIndex = -1), c.children("." + f).removeClass(f);
          }),
          c.on("click.autocomplete", e, function () {
            d.select(a(this).data("index"));
          }),
          c.on("click.autocomplete", function () {
            clearTimeout(d.blurTimeoutId);
          }),
          (d.fixPositionCapture = function () {
            d.visible && d.fixPosition();
          }),
          a(window).on("resize.autocomplete", d.fixPositionCapture),
          d.el.on("keydown.autocomplete", function (a) {
            d.onKeyPress(a);
          }),
          d.el.on("keyup.autocomplete", function (a) {
            d.onKeyUp(a);
          }),
          d.el.on("blur.autocomplete", function () {
            d.onBlur();
          }),
          d.el.on("focus.autocomplete", function () {
            d.onFocus();
          }),
          d.el.on("change.autocomplete", function (a) {
            d.onKeyUp(a);
          }),
          d.el.on("input.autocomplete", function (a) {
            d.onKeyUp(a);
          });
      },
      onFocus: function () {
        var a = this;
        a.fixPosition(),
          a.el.val().length >= a.options.minChars && a.onValueChange();
      },
      onBlur: function () {
        var a = this;
        a.blurTimeoutId = setTimeout(function () {
          a.hide();
        }, 200);
      },
      abortAjax: function () {
        var a = this;
        a.currentRequest &&
          (a.currentRequest.abort(), (a.currentRequest = null));
      },
      setOptions: function (b) {
        var c = this,
          d = a.extend({}, c.options, b);
        (c.isLocal = Array.isArray(d.lookup)),
          c.isLocal && (d.lookup = c.verifySuggestionsFormat(d.lookup)),
          (d.orientation = c.validateOrientation(d.orientation, "bottom")),
          a(c.suggestionsContainer).css({
            "max-height": d.maxHeight + "px",
            width: d.width + "px",
            "z-index": d.zIndex,
          }),
          (this.options = d);
      },
      clearCache: function () {
        (this.cachedResponse = {}), (this.badQueries = []);
      },
      clear: function () {
        this.clearCache(), (this.currentValue = ""), (this.suggestions = []);
      },
      disable: function () {
        var a = this;
        (a.disabled = !0), clearTimeout(a.onChangeTimeout), a.abortAjax();
      },
      enable: function () {
        this.disabled = !1;
      },
      fixPosition: function () {
        var b = this,
          c = a(b.suggestionsContainer),
          d = c.parent().get(0);
        if (d === document.body || b.options.forceFixPosition) {
          var e = b.options.orientation,
            f = c.outerHeight(),
            g = b.el.outerHeight(),
            h = b.el.offset(),
            i = { top: h.top, left: h.left };
          if ("auto" === e) {
            var j = a(window).height(),
              k = a(window).scrollTop(),
              l = -k + h.top - f,
              m = k + j - (h.top + g + f);
            e = Math.max(l, m) === l ? "top" : "bottom";
          }
          if (
            ("top" === e ? (i.top += -f) : (i.top += g), d !== document.body)
          ) {
            var n,
              o = c.css("opacity");
            b.visible || c.css("opacity", 0).show(),
              (n = c.offsetParent().offset()),
              (i.top -= n.top),
              (i.top += d.scrollTop),
              (i.left -= n.left),
              b.visible || c.css("opacity", o).hide();
          }
          "auto" === b.options.width && (i.width = b.el.outerWidth() + "px"),
            c.css(i);
        }
      },
      isCursorAtEnd: function () {
        var a,
          b = this,
          c = b.el.val().length,
          d = b.element.selectionStart;
        return "number" == typeof d
          ? d === c
          : !document.selection ||
              ((a = document.selection.createRange()),
              a.moveStart("character", -c),
              c === a.text.length);
      },
      onKeyPress: function (a) {
        var b = this;
        if (!b.disabled && !b.visible && a.which === h.DOWN && b.currentValue)
          return void b.suggest();
        if (!b.disabled && b.visible) {
          switch (a.which) {
            case h.ESC:
              b.el.val(b.currentValue), b.hide();
              break;
            case h.RIGHT:
              if (b.hint && b.options.onHint && b.isCursorAtEnd()) {
                b.selectHint();
                break;
              }
              return;
            case h.TAB:
              if (b.hint && b.options.onHint) return void b.selectHint();
              if (b.selectedIndex === -1) return void b.hide();
              if ((b.select(b.selectedIndex), b.options.tabDisabled === !1))
                return;
              break;
            case h.RETURN:
              if (b.selectedIndex === -1) return void b.hide();
              b.select(b.selectedIndex);
              break;
            case h.UP:
              b.moveUp();
              break;
            case h.DOWN:
              b.moveDown();
              break;
            default:
              return;
          }
          a.stopImmediatePropagation(), a.preventDefault();
        }
      },
      onKeyUp: function (a) {
        var b = this;
        if (!b.disabled) {
          switch (a.which) {
            case h.UP:
            case h.DOWN:
              return;
          }
          clearTimeout(b.onChangeTimeout),
            b.currentValue !== b.el.val() &&
              (b.findBestHint(),
              b.options.deferRequestBy > 0
                ? (b.onChangeTimeout = setTimeout(function () {
                    b.onValueChange();
                  }, b.options.deferRequestBy))
                : b.onValueChange());
        }
      },
      onValueChange: function () {
        if (this.ignoreValueChange) return void (this.ignoreValueChange = !1);
        var b = this,
          c = b.options,
          d = b.el.val(),
          e = b.getQuery(d);
        return (
          b.selection &&
            b.currentValue !== e &&
            ((b.selection = null),
            (c.onInvalidateSelection || a.noop).call(b.element)),
          clearTimeout(b.onChangeTimeout),
          (b.currentValue = d),
          (b.selectedIndex = -1),
          c.triggerSelectOnValidInput && b.isExactMatch(e)
            ? void b.select(0)
            : void (e.length < c.minChars ? b.hide() : b.getSuggestions(e))
        );
      },
      isExactMatch: function (a) {
        var b = this.suggestions;
        return 1 === b.length && b[0].value.toLowerCase() === a.toLowerCase();
      },
      getQuery: function (b) {
        var c,
          d = this.options.delimiter;
        return d ? ((c = b.split(d)), a.trim(c[c.length - 1])) : b;
      },
      getSuggestionsLocal: function (b) {
        var c,
          d = this,
          e = d.options,
          f = b.toLowerCase(),
          g = e.lookupFilter,
          h = parseInt(e.lookupLimit, 10);
        return (
          (c = {
            suggestions: a.grep(e.lookup, function (a) {
              return g(a, b, f);
            }),
          }),
          h &&
            c.suggestions.length > h &&
            (c.suggestions = c.suggestions.slice(0, h)),
          c
        );
      },
      getSuggestions: function (b) {
        var c,
          d,
          e,
          f,
          g = this,
          h = g.options,
          i = h.serviceUrl;
        if (
          ((h.params[h.paramName] = b),
          h.onSearchStart.call(g.element, h.params) !== !1)
        ) {
          if (((d = h.ignoreParams ? null : h.params), a.isFunction(h.lookup)))
            return void h.lookup(b, function (a) {
              (g.suggestions = a.suggestions),
                g.suggest(),
                h.onSearchComplete.call(g.element, b, a.suggestions);
            });
          g.isLocal
            ? (c = g.getSuggestionsLocal(b))
            : (a.isFunction(i) && (i = i.call(g.element, b)),
              (e = i + "?" + a.param(d || {})),
              (c = g.cachedResponse[e])),
            c && Array.isArray(c.suggestions)
              ? ((g.suggestions = c.suggestions),
                g.suggest(),
                h.onSearchComplete.call(g.element, b, c.suggestions))
              : g.isBadQuery(b)
              ? h.onSearchComplete.call(g.element, b, [])
              : (g.abortAjax(),
                (f = {
                  url: i,
                  data: d,
                  type: h.type,
                  dataType: h.dataType,
                }),
                a.extend(f, h.ajaxSettings),
                (g.currentRequest = a
                  .ajax(f)
                  .done(function (a) {
                    var c;
                    (g.currentRequest = null),
                      (c = h.transformResult(a, b)),
                      g.processResponse(c, b, e),
                      h.onSearchComplete.call(g.element, b, c.suggestions);
                  })
                  .fail(function (a, c, d) {
                    h.onSearchError.call(g.element, b, a, c, d);
                  })));
        }
      },
      isBadQuery: function (a) {
        if (!this.options.preventBadQueries) return !1;
        for (var b = this.badQueries, c = b.length; c--; )
          if (0 === a.indexOf(b[c])) return !0;
        return !1;
      },
      hide: function () {
        var b = this,
          c = a(b.suggestionsContainer);
        a.isFunction(b.options.onHide) &&
          b.visible &&
          b.options.onHide.call(b.element, c),
          (b.visible = !1),
          (b.selectedIndex = -1),
          clearTimeout(b.onChangeTimeout),
          a(b.suggestionsContainer).hide(),
          b.signalHint(null);
      },
      suggest: function () {
        if (!this.suggestions.length)
          return void (this.options.showNoSuggestionNotice
            ? this.noSuggestions()
            : this.hide());
        var b,
          c = this,
          d = c.options,
          e = d.groupBy,
          f = d.formatResult,
          g = c.getQuery(c.currentValue),
          h = c.classes.suggestion,
          i = c.classes.selected,
          j = a(c.suggestionsContainer),
          k = a(c.noSuggestionsContainer),
          l = d.beforeRender,
          m = "",
          n = function (a, c) {
            var f = a.data[e];
            return b === f ? "" : ((b = f), d.formatGroup(a, b));
          };
        return d.triggerSelectOnValidInput && c.isExactMatch(g)
          ? void c.select(0)
          : (a.each(c.suggestions, function (a, b) {
              e && (m += n(b, g, a)),
                (m +=
                  '<div class="' +
                  h +
                  '" data-index="' +
                  a +
                  '">' +
                  f(b, g, a) +
                  "</div>");
            }),
            this.adjustContainerWidth(),
            k.detach(),
            j.html(m),
            a.isFunction(l) && l.call(c.element, j, c.suggestions),
            c.fixPosition(),
            j.show(),
            d.autoSelectFirst &&
              ((c.selectedIndex = 0),
              j.scrollTop(0),
              j
                .children("." + h)
                .first()
                .addClass(i)),
            (c.visible = !0),
            void c.findBestHint());
      },
      noSuggestions: function () {
        var b = this,
          c = b.options.beforeRender,
          d = a(b.suggestionsContainer),
          e = a(b.noSuggestionsContainer);
        this.adjustContainerWidth(),
          e.detach(),
          d.empty(),
          d.append(e),
          a.isFunction(c) && c.call(b.element, d, b.suggestions),
          b.fixPosition(),
          d.show(),
          (b.visible = !0);
      },
      adjustContainerWidth: function () {
        var b,
          c = this,
          d = c.options,
          e = a(c.suggestionsContainer);
        "auto" === d.width
          ? ((b = c.el.outerWidth()), e.css("width", b > 0 ? b : 300))
          : "flex" === d.width && e.css("width", "");
      },
      findBestHint: function () {
        var b = this,
          c = b.el.val().toLowerCase(),
          d = null;
        c &&
          (a.each(b.suggestions, function (a, b) {
            var e = 0 === b.value.toLowerCase().indexOf(c);
            return e && (d = b), !e;
          }),
          b.signalHint(d));
      },
      signalHint: function (b) {
        var c = "",
          d = this;
        b && (c = d.currentValue + b.value.substr(d.currentValue.length)),
          d.hintValue !== c &&
            ((d.hintValue = c),
            (d.hint = b),
            (this.options.onHint || a.noop)(c));
      },
      verifySuggestionsFormat: function (b) {
        return b.length && "string" == typeof b[0]
          ? a.map(b, function (a) {
              return { value: a, data: null };
            })
          : b;
      },
      validateOrientation: function (b, c) {
        return (
          (b = a.trim(b || "").toLowerCase()),
          a.inArray(b, ["auto", "bottom", "top"]) === -1 && (b = c),
          b
        );
      },
      processResponse: function (a, b, c) {
        var d = this,
          e = d.options;
        (a.suggestions = d.verifySuggestionsFormat(a.suggestions)),
          e.noCache ||
            ((d.cachedResponse[c] = a),
            e.preventBadQueries &&
              !a.suggestions.length &&
              d.badQueries.push(b)),
          b === d.getQuery(d.currentValue) &&
            ((d.suggestions = a.suggestions), d.suggest());
      },
      activate: function (b) {
        var c,
          d = this,
          e = d.classes.selected,
          f = a(d.suggestionsContainer),
          g = f.find("." + d.classes.suggestion);
        return (
          f.find("." + e).removeClass(e),
          (d.selectedIndex = b),
          d.selectedIndex !== -1 && g.length > d.selectedIndex
            ? ((c = g.get(d.selectedIndex)), a(c).addClass(e), c)
            : null
        );
      },
      selectHint: function () {
        var b = this,
          c = a.inArray(b.hint, b.suggestions);
        b.select(c);
      },
      select: function (a) {
        var b = this;
        b.hide(), b.onSelect(a);
      },
      moveUp: function () {
        var b = this;
        if (b.selectedIndex !== -1)
          return 0 === b.selectedIndex
            ? (a(b.suggestionsContainer)
                .children("." + b.classes.suggestion)
                .first()
                .removeClass(b.classes.selected),
              (b.selectedIndex = -1),
              (b.ignoreValueChange = !1),
              b.el.val(b.currentValue),
              void b.findBestHint())
            : void b.adjustScroll(b.selectedIndex - 1);
      },
      moveDown: function () {
        var a = this;
        a.selectedIndex !== a.suggestions.length - 1 &&
          a.adjustScroll(a.selectedIndex + 1);
      },
      adjustScroll: function (b) {
        var c = this,
          d = c.activate(b);
        if (d) {
          var e,
            f,
            g,
            h = a(d).outerHeight();
          (e = d.offsetTop),
            (f = a(c.suggestionsContainer).scrollTop()),
            (g = f + c.options.maxHeight - h),
            e < f
              ? a(c.suggestionsContainer).scrollTop(e)
              : e > g &&
                a(c.suggestionsContainer).scrollTop(
                  e - c.options.maxHeight + h
                ),
            c.options.preserveInput ||
              ((c.ignoreValueChange = !0),
              c.el.val(c.getValue(c.suggestions[b].value))),
            c.signalHint(null);
        }
      },
      onSelect: function (b) {
        var c = this,
          d = c.options.onSelect,
          e = c.suggestions[b];
        (c.currentValue = c.getValue(e.value)),
          c.currentValue === c.el.val() ||
            c.options.preserveInput ||
            c.el.val(c.currentValue),
          c.signalHint(null),
          (c.suggestions = []),
          (c.selection = e),
          a.isFunction(d) && d.call(c.element, e);
      },
      getValue: function (a) {
        var b,
          c,
          d = this,
          e = d.options.delimiter;
        return e
          ? ((b = d.currentValue),
            (c = b.split(e)),
            1 === c.length
              ? a
              : b.substr(0, b.length - c[c.length - 1].length) + a)
          : a;
      },
      dispose: function () {
        var b = this;
        b.el.off(".autocomplete").removeData("autocomplete"),
          a(window).off("resize.autocomplete", b.fixPositionCapture),
          a(b.suggestionsContainer).remove();
      },
    }),
    (a.fn.devbridgeAutocomplete = function (c, d) {
      var e = "autocomplete";
      return arguments.length
        ? this.each(function () {
            var f = a(this),
              g = f.data(e);
            "string" == typeof c
              ? g && "function" == typeof g[c] && g[c](d)
              : (g && g.dispose && g.dispose(),
                (g = new b(this, c)),
                f.data(e, g));
          })
        : this.first().data(e);
    }),
    a.fn.autocomplete || (a.fn.autocomplete = a.fn.devbridgeAutocomplete);
});

/* Quatro Digital - Smart Auto Complete // 1.0 // Carlos Vinicius // Todos os direitos reservados */
(function (m) {
  var c = jQuery;
  if ("function" !== typeof c.fn.QD_smartAutoComplete) {
    c.fn.QD_smartAutoComplete = function () {};
    var k = {
        maxRows: 12,
        suggestionsStack: "",
        productNameContains: function (a) {
          return c(a).val() || "";
        },
        modifyResults: function (a) {
          return a;
        },
        jqueryUI: {
          noCache: !1,
          minChars: 3,
          triggerSelectOnValidInput: !0,
          preventBadQueries: !0,
          autoSelectFirst: !1,
          maxHeight: 300,
          width: "auto",
          zIndex: 9999,
          appendTo: null,
          forceFixPosition: !0,
          orientation: "bottom",
          preserveInput: !1,
          showNoSuggestionNotice: "",
          tabDisabled: !1,
          containerClass:
            "ui-autocomplete ui-menu ui-widget ui-widget-content ui-corner-all",
          beforeRender: function (a, b) {},
          formatResult: function (a, b, f) {
            return (
              '<li class="ui-menu-item" role="menuitem"><a href="' +
              a.data +
              '" class="ui-corner-all" tabindex="-1">' +
              a.text +
              "</a></li>"
            );
          },
          formatGroup: function (a, b) {},
          lookupFilter: function (a, b, f) {},
          onSearchStart: function (a) {},
          onHint: function (a) {},
          onSearchComplete: function (a, b) {},
          transformResult: function (a, b) {},
          onSelect: function (a) {},
          onSearchError: function (a, b, f, h) {},
          onSonHideearchError: function (a) {},
        },
      },
      l = function (a, b) {
        b.jqueryUI.lookup = function (f, h) {
          c.ajax({
            url: "/buscaautocomplete/",
            dataType: "json",
            data: {
              maxRows: b.maxRows,
              productNameContains: b.productNameContains(a),
              suggestionsStack: b.suggestionsStack,
            },
            success: function (d) {
              d &&
                ((d = c.map(d.itemsReturned, function (e) {
                  return {
                    data: e.href,
                    value: e.name,
                    text: (e.thumb || "") + " " + e.name,
                    sku: e.items.length ? e.items[0].itemId : "",
                    productId: e.items.length ? e.items[0].productId : "",
                  };
                })),
                (d = b.modifyResults(d)),
                h({ suggestions: d }));
            },
            error: function (d, e, g) {
              if (
                "object" === typeof console &&
                "undefined" !== typeof console.error &&
                "undefined" !== typeof console.info &&
                "undefined" !== typeof console.warn
              ) {
                "object" == typeof g && "function" == typeof g.unshift
                  ? (g.unshift("[Quatro Digital - Smart Auto Complete]\n"),
                    (d = g))
                  : (d = ["[Quatro Digital - Smart Auto Complete]\n", g]);
                try {
                  console.error.apply(console, d);
                } catch (n) {
                  try {
                    console.error(d.join("\n"));
                  } catch (p) {}
                }
              }
            },
            done: function () {
              b.suggestionsStack = b.productNameContains(a);
            },
          });
        };
        try {
          c.fn.autocomplete
            ? a.autocomplete("destroy").devbridgeAutocomplete(b.jqueryUI)
            : a.devbridgeAutocomplete(b.jqueryUI);
        } catch (f) {
          "undefined" !== typeof console &&
            "function" === typeof console.error &&
            console.error("Problemas :( . Detalhes: ", f);
        }
      };
    c.fn.QD_smartAutoComplete = function (a) {
      var b = c(this);
      if (!b.length) return b;
      b.each(function () {
        var f = c(this);
        f.QD_smartAutoComplete = new l(f, c.extend(!0, {}, k, a));
      });
      return b;
    };
    c(function () {
      c(".qd_auto_smart_auto_complete").QD_smartAutoComplete();
    });
  }
})(jQuery);

// !!! QD SMART SHOOTING STARS - FAVORITOS
/*FUNÇÕES AUXILIARES*/
/* jQuery Cookie Plugin v1.4.1 // https://github.com/carhartl/jquery-cookie // Copyright 2013 Klaus Hartl // Released under the MIT license */
(function () {
  "function" !== typeof $.cookie &&
    (function (c) {
      "function" === typeof define && define.amd
        ? define(["jquery"], c)
        : "object" === typeof exports
        ? c(require("jquery"))
        : c(jQuery);
    })(function (c) {
      function p(a) {
        a = e.json ? JSON.stringify(a) : String(a);
        return e.raw ? a : encodeURIComponent(a);
      }
      function n(a, g) {
        var b;
        if (e.raw) b = a;
        else
          a: {
            var d = a;
            0 === d.indexOf('"') &&
              (d = d.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, "\\"));
            try {
              d = decodeURIComponent(d.replace(l, " "));
              b = e.json ? JSON.parse(d) : d;
              break a;
            } catch (h) {}
            b = void 0;
          }
        return c.isFunction(g) ? g(b) : b;
      }
      var l = /\+/g,
        e = (c.cookie = function (a, g, b) {
          if (1 < arguments.length && !c.isFunction(g)) {
            b = c.extend({}, e.defaults, b);
            if ("number" === typeof b.expires) {
              var d = b.expires,
                h = (b.expires = new Date());
              h.setTime(+h + 864e5 * d);
            }
            return (document.cookie = [
              e.raw ? a : encodeURIComponent(a),
              "=",
              p(g),
              b.expires ? "; expires=" + b.expires.toUTCString() : "",
              b.path ? "; path=" + b.path : "",
              b.domain ? "; domain=" + b.domain : "",
              b.secure ? "; secure" : "",
            ].join(""));
          }
          for (
            var d = a ? void 0 : {},
              h = document.cookie ? document.cookie.split("; ") : [],
              m = 0,
              l = h.length;
            m < l;
            m++
          ) {
            var f = h[m].split("="),
              k;
            k = f.shift();
            k = e.raw ? k : decodeURIComponent(k);
            f = f.join("=");
            if (a && a === k) {
              d = n(f, g);
              break;
            }
            a || void 0 === (f = n(f)) || (d[k] = f);
          }
          return d;
        });
      e.defaults = {};
      c.removeCookie = function (a, e) {
        if (void 0 === c.cookie(a)) return !1;
        c.cookie(a, "", c.extend({}, e, { expires: -1 }));
        return !c.cookie(a);
      };
    });
})();

/* Quatro Digital - Smart Shooting Star // BETA 0.1 // Todos os direitos reservados */
(function (t) {
  var a = jQuery;
  if ("function" !== typeof a.fn.QD_smartShootingStar) {
    var p = function (a, b) {
        if (
          "object" === typeof console &&
          "undefined" !== typeof console.error &&
          "undefined" !== typeof console.info &&
          "undefined" !== typeof console.warn
        ) {
          if ("object" == typeof a && "function" == typeof a.unshift) {
            a.unshift("[Quatro Digital - Smart Shooting Star]\n");
            var d = a;
          } else d = ["[Quatro Digital - Smart Shooting Star]\n", a];
          if (
            "undefined" == typeof b ||
            ("alerta" !== b.toLowerCase() && "aviso" !== b.toLowerCase())
          )
            if ("undefined" != typeof b && "info" == b.toLowerCase())
              try {
                console.info.apply(console, d);
              } catch (l) {
                try {
                  console.info(d.join("\n"));
                } catch (h) {}
              }
            else
              try {
                console.error.apply(console, d);
              } catch (l) {
                try {
                  console.error(d.join("\n"));
                } catch (h) {}
              }
          else
            try {
              console.warn.apply(console, d);
            } catch (l) {
              try {
                console.warn(d.join("\n"));
              } catch (h) {}
            }
        }
      },
      m = {
        wishlistItemWrapper: "li[layout]",
        wishlistButton: ".qd-sss-wishlist-button",
        wishlistDeleteButton: ".qd-sss-wishlist-delete-button",
        dataEntityName: "wishlist",
        schemaName: "qd-sss-wishlist",
        cookieName: "qd_sss_wishlist_id",
        isProductPage: !1,
        shelfSelectors: {
          id: ".qd_productId",
          name: ".qd_productName",
          url: ".qd_productUrl",
          tagImg: "img",
        },
        list: function (a) {},
      },
      n = function (g, b) {
        function d(c) {
          h(c, l);
          g.find(b.wishlistButton)
            .not(".qd-sss-on")
            .addClass("qd-sss-on")
            .click(function (b) {
              b.preventDefault();
              h(c, m, a(this));
            });
          g.find(b.wishlistDeleteButton)
            .not(".qd-sss-on")
            .addClass("qd-sss-on")
            .click(function (b) {
              b.preventDefault();
              h(c, n, a(this));
            });
        }
        function l(c, f) {
          var e = Object.keys(f);
          if (e.length)
            if ((a("body").addClass("qd-hasFavorites"), b.isProductPage))
              -1 < e.indexOf(skuJson.productId.toString()) &&
                g.addClass("qd-favorited");
            else
              for (var k = 0; k < e.length; k++)
                g.find("a[data-id=" + e[k] + "]")
                  .parent()
                  .addClass("qd-favorited");
          else a("body").addClass("qd-noFavorites");
        }
        function h(c, f, e) {
          e = e || null;
          a.ajax({
            url:
              "/api/dataentities/" +
              b.dataEntityName +
              "/documents/" +
              c +
              "?_schema=" +
              b.schemaName +
              "&_fields=items",
            type: "GET",
            dataType: "json",
            headers: {
              Accept: "application/vnd.vtex.ds.v10+json",
              "Content-Type": "application/json; charset=utf-8",
            },
          })
            .done(function (a) {
              a = a ? a.items : {};
              f(c, a, e);
              b.list(a);
            })
            .error(function (a, b, c) {
              p("Erro!" + b + c);
            });
        }
        function q(c, f, e, k) {
          a.ajax({
            url:
              "/api/dataentities/" +
              b.dataEntityName +
              "/documents/" +
              c +
              "?_schema=" +
              b.schemaName,
            type: "PATCH",
            dataType: "json",
            headers: {
              Accept: "application/vnd.vtex.ds.v10+json",
              "Content-Type": "application/json; charset=utf-8",
            },
            data: JSON.stringify({ id: c, items: f }),
          })
            .done(function (c) {
              a(window).trigger(k, [f, c]);
              Object.keys(f).length
                ? (a("body").removeClass("qd-noFavorites"),
                  a("body").addClass("qd-hasFavorites"))
                : (a("body").removeClass("qd-hasFavorites"),
                  a("body").addClass("qd-noFavorites"));
              b.isProductPage
                ? g.toggleClass("qd-favorited")
                : e.parent().toggleClass("qd-favorited");
            })
            .error(function () {
              p("Erro!");
            });
        }
        function m(a, f, e) {
          if (b.isProductPage)
            f[skuJson.productId] = {
              sku: [],
              productId: skuJson.productId,
              productUrl: window.location.href,
              image: skuJson.skus[0].image,
              productName: skuJson.name,
              deleted: !1,
              insertedDate: new Date().toISOString(),
            };
          else {
            var c = e.closest("li[layout]"),
              d = b.shelfSelectors;
            f[c.find(d.id).val() || 0] = {
              sku: [],
              productId: c.find(d.id).val() || "",
              productUrl: c.find(d.url).val() || "",
              image: c.find(d.tagImg).attr("src") || "",
              productName: c.find(d.name).val() || "",
              deleted: !1,
              insertedDate: new Date().toISOString(),
            };
          }
          q(a, f, e, "QD_SSS_ProductAdded");
        }
        function n(a, d, e) {
          b.isProductPage
            ? delete d[skuJson.productId]
            : delete d[e.attr("data-id") || 0];
          q(a, d, e, "QD_SSS_ProductRemoved");
        }
        function r(c) {
          if (c) return c + jsnomeLoja;
          c = a.cookie(b.cookieName);
          c ||
            ((c =
              new Date().getTime() +
              "-" +
              Math.round(98999 * Math.random() + 1e3)),
            a.cookie(b.cookieName, c, { path: "/" }));
          return c;
        }
        "undefined" === typeof vtexjs.checkout.orderForm
          ? vtexjs.checkout.getOrderForm().done(function (a) {
              d(r(a.userProfileId));
            })
          : d(r(vtexjs.checkout.orderForm.userProfileId));
      };
    a.fn.QD_smartShootingStar = function (g) {
      var b = a(this);
      if (!b.length) return b;
      b.QD_smartShootingStarOptions = new n(b, a.extend({}, m, g));
      return b;
    };
    a(function () {
      a(".qd_auto_smart_shooting_star").QD_smartShootingStar();
    });
  }
})(this);
/* Quatro Digital - Smart Photo Carousel // 1.2 // Carlos Vinicius // Todos os direitos reservados */

/*FUNÇÕES AUXILIARES*/
/* Quatro Digital - jQuery Ajax Queue // 4.0 // Carlos Vinicius [ QUATRO DIGITAL ] // MIT <http://pt.wikipedia.org/wiki/Licen%C3%A7a_MIT> */
(function (d) {
  if ("function" !== typeof d.qdAjax) {
    var a = {};
    d.qdAjaxQueue = a;
    150 >
      parseInt((d.fn.jquery.replace(/[^0-9]+/g, "") + "000").slice(0, 3), 10) &&
      console &&
      "function" == typeof console.error &&
      console.error();
    d.qdAjax = function (f) {
      try {
        var b = d.extend(
            {},
            {
              url: "",
              type: "GET",
              data: "",
              success: function () {},
              error: function () {},
              complete: function () {},
              clearQueueDelay: 5,
            },
            f
          ),
          e;
        e =
          "object" === typeof b.data
            ? JSON.stringify(b.data)
            : b.data.toString();
        var c = encodeURIComponent(b.url + "|" + b.type + "|" + e);
        a[c] = a[c] || {};
        "undefined" == typeof a[c].jqXHR
          ? (a[c].jqXHR = d.ajax(b))
          : (a[c].jqXHR.done(b.success),
            a[c].jqXHR.fail(b.error),
            a[c].jqXHR.always(b.complete));
        a[c].jqXHR.always(function () {
          isNaN(parseInt(b.clearQueueDelay)) ||
            setTimeout(function () {
              a[c].jqXHR = void 0;
            }, b.clearQueueDelay);
        });
        return a[c].jqXHR;
      } catch (g) {
        "undefined" !== typeof console &&
          "function" === typeof console.error &&
          console.error("Problemas no $.qdAjax :( . Detalhes: " + g.message);
      }
    };
    d.qdAjax.version = "4.0";
  }
})(jQuery);

!(function (o) {
  "use strict";
  var e = jQuery;
  if ("function" != typeof e.fn.QD_smartPhotoCarousel) {
    var s = /(ids\/[0-9]+-)[0-9-]+/i,
      i = {
        imageWrapper: ".qd-spc-image",
        thumbsWrapper: ".qd-spc-thumbs",
        sizes: {
          thumb: "150-150",
          image: "500-500",
          imagezoom: "1000-1000",
        },
        slickOptions: {
          images: { lazyLoad: "ondemand", infinite: !1, arrows: !1 },
          thumbs: {
            slidesToShow: 3,
            slidesToScroll: 1,
            arrows: !1,
            focusOnSelect: !0,
          },
        },
        zoomOptions: {},
      },
      n = function (o, s, i) {
        if (!i && ((i = skuJson.skus[0].sku), skuJson.avaliable))
          for (var n = 0; n < skuJson.skus.length; n++)
            if (skuJson.skus[n].avaliable) {
              i = skuJson.skus[n].sku;
              break;
            }
        r(i).done(function (e) {
          a(o, s, e);
        }),
          e(window).on("skuChanged.vtex", function () {
            r(arguments[2].sku).done(function (e) {
              a(o, s, e);
            });
          }),
          e(window).on("skuSelectable.vtex", function () {
            r(arguments[2][0].sku).done(function (e) {
              a(o, s, e);
            });
          });
      };
    (e.fn.QD_smartPhotoCarousel = function (o, s) {
      var a = e(this);
      return a.length
        ? (a.each(function () {
            var a = e(this);
            a.QD_smartPhotoCarousel = new n(a, e.extend(!0, {}, i, o), s);
          }),
          a)
        : a;
    }),
      e(function () {
        e(".qd_auto_smart_photo_carousel").QD_smartPhotoCarousel();
      });
  }
  function a(o, i, n) {
    var a = n[0];
    null != typeof i.removeOldSlick &&
      i.removeOldSlick &&
      e(".product-qd-v1-image .slick-initialized").remove();
    try {
      var r = o.find(i.imageWrapper);
      r.is(".slick-initialized") && r.slick("unslick");
      var t = r.attr("class");
      r.length || (r = e("<div></div>").appendTo(o)),
        r.empty().attr("class", t);
      var l = o.find(i.thumbsWrapper);
      l.is(".slick-initialized") && l.slick("unslick");
      var c = l.attr("class");
      l.length || (l = e("<div></div>").appendTo(o)),
        l.empty().attr("class", c);
      for (var u, d = [], f = 0; f < a.Images.length; f++)
        d.push(a.Images[f][0]);
      for (var m = 0; m < d.length; m++)
        (u = d[m].Path),
          (0 == m
            ? e("<img>", {
                src: u.replace(s, "$1" + i.sizes.image),
              }).appendTo(r)
            : e("<img>", {
                "data-lazy": u.replace(s, "$1" + i.sizes.image),
              }).appendTo(r)
          )
            .wrap("<div></div>")
            .wrap(
              e("<a></a>", {
                href: u.replace(s, "$1" + i.sizes.imagezoom),
                class: "jqzoom",
              })
            ),
          e("<img>", { src: u.replace(s, "$1" + i.sizes.thumb) })
            .appendTo(l)
            .wrap("<div></div>"),
          d[m].IsMain && (i.slickOptions.images.initialSlide = m);
    } catch (o) {
      "undefined" != typeof console &&
        "function" == typeof console.error &&
        console.error("Problemas :( . Detalhes: ", o);
    }
    try {
      (i.slickOptions.images.asNavFor = l),
        e(window).trigger("QD_SPC_beforeImageSlick", [r]),
        e(r).slick(i.slickOptions.images),
        (i.slickOptions.thumbs.asNavFor = r),
        e(l).each(function () {
          var o = e(this);
          o.find("img:first").one("load", function () {
            try {
              e(window).trigger("QD_SPC_beforeThumbSlick", [o]),
                o.slick(i.slickOptions.thumbs),
                e(window).trigger("QD_SPC_afterSlick", [o]);
            } catch (o) {
              "undefined" != typeof console &&
                "function" == typeof console.error &&
                console.error("Problemas :( . Detalhes: ", o);
            }
          });
        }),
        e(".jqzoom").jqzoom(i.zoomOptions),
        e(l).on("afterChange", function () {
          e(r).slick("slickGoTo", e(this).slick("slickCurrentSlide"));
        });
    } catch (o) {
      "undefined" != typeof console &&
        "function" == typeof console.error &&
        console.error("Problemas :( . Detalhes: ", o);
    }
  }
  function r(o) {
    return e.qdAjax({
      url: "/produto/sku/" + o,
      dataType: "json",
      error: function () {
        alert("erro ao buscar objeto SKU");
      },
    });
  }
})();

/// FIXAR IMAGEM PAGINA DE PRODUTO
/* Quatro Digital - Affix // 1.0 // Carlos Vinicius // Todos os direitos reservados */
(function (F, d) {
  if ("function" !== typeof d.fn.QD_affix) {
    var y = function (a, b) {
        if (
          "object" === typeof console &&
          "undefined" !== typeof console.error &&
          "undefined" !== typeof console.info &&
          "undefined" !== typeof console.warn
        ) {
          var c;
          "object" === typeof a
            ? (a.unshift("[Quatro Digital - Affix]\n"), (c = a))
            : (c = ["[Quatro Digital - Affix]\n" + a]);
          if (
            "undefined" === typeof b ||
            ("alerta" !== b.toLowerCase() && "aviso" !== b.toLowerCase())
          )
            if ("undefined" !== typeof b && "info" === b.toLowerCase())
              try {
                console.info.apply(console, c);
              } catch (d) {
                try {
                  console.info(c.join("\n"));
                } catch (e) {}
              }
            else
              try {
                console.error.apply(console, c);
              } catch (k) {
                try {
                  console.error(c.join("\n"));
                } catch (g) {}
              }
          else
            try {
              console.warn.apply(console, c);
            } catch (p) {
              try {
                console.warn(c.join("\n"));
              } catch (q) {}
            }
        }
      },
      u = {
        topSpacing: 20,
        bottomSpacing: 20,
        bottomLimitSeletor: !1,
        css: { position: "relative" },
      },
      e = d(window);
    e.width();
    var k = e.height(),
      z = function (a) {
        var b = a;
        d(function () {
          e.resize(function () {
            b();
          });
        });
        e.load(function () {
          b = function () {};
          e.resize(a);
        });
      };
    z(function () {
      e.width();
      k = e.height();
    });
    d(function () {
      e.width();
      k = e.height();
    });
    var E = function (a, b) {
      if (a.is(".qd-affix-on"))
        return (
          y(
            "Execu\u00e7\u00e3o ignorada pois a classe 'qd-affix-on' foi encontrado o que significa que este elemento j\u00e1 teve o plugin aplicado",
            "aviso"
          ),
          a
        );
      a.addClass("qd-affix-on");
      try {
        a.css(b.css);
        var c,
          m,
          x = function () {
            m = c = a.offset();
            m.top = c.top - b.topSpacing;
          };
        x();
        var t = !1;
        a.width();
        var g = a.height(),
          p = function () {
            a.width();
            g = a.height();
            t = g + b.topSpacing + b.bottomSpacing > k;
            r && (l = q.offset());
          },
          q,
          r = !1,
          l;
        (function () {
          if (b.bottomLimitSeletor) {
            q = d(b.bottomLimitSeletor).first();
            var a = q.offset();
            a && ((r = !0), (l = a));
          }
        })();
        var h = 0,
          v = 0,
          A = 0,
          B = 0,
          f = 0,
          C = !1,
          D = 0,
          w = 0,
          n = function () {
            clearTimeout(A);
            A = setTimeout(p, 25);
            5 > w && ((a[0].style.top = 0), x(), (w += 1));
            f = window.scrollY || document.documentElement.scrollTop;
            C = 0 !== f && f <= B ? !0 : !1;
            B = f;
            if (r && t) {
              if (
                f + k > l.top &&
                a.offset().top + b.topSpacing + g + b.bottomSpacing > l.top
              ) {
                a[0].style.top =
                  l.top - c.top - (b.topSpacing + g + b.bottomSpacing) + "px";
                return;
              }
            } else if (r && f + b.topSpacing + g + b.bottomSpacing > l.top)
              return;
            t
              ? C
                ? ((h = f - m.top),
                  -1 < h &&
                    a.offset().top - b.topSpacing > f &&
                    (a[0].style.top = f - m.top + "px"))
                : ((h = c.top + g + b.bottomSpacing),
                  (v = f + k),
                  h < v
                    ? f + k > a.offset().top + g + b.bottomSpacing &&
                      (a[0].style.top = v - h - b.bottomSpacing + "px")
                    : (a[0].style.top = 0))
              : ((h = f - m.top), (a[0].style.top = -1 < h ? h + "px" : 0));
          };
        e.scroll(function () {
          n();
          clearTimeout(D);
          D = setTimeout(n, 50);
        });
        z(function () {
          p();
          n();
        });
        e.load(function () {
          p();
          n();
        });
        n();
      } catch (u) {
        y("Erro: " + u.message);
      }
    };
    d.fn.QD_affix = function (a) {
      var b = d(this);
      if (!b.length) return b;
      var c = d.extend({}, u, a);
      b.each(function () {
        var a = d(this);
        a.qdPlugin = new E(a, c);
      });
      return b;
    };
    d(function () {
      d(".qd_auto_affix").QD_affix();
    });
  }
})(window, jQuery);

/* Quatro Digital - Smart Quantity // 1.10 // Carlos Vinicius // Todos os direitos reservados */
(function (r) {
  var d = jQuery;
  if ("function" !== typeof d.fn.QD_smartQuantity) {
    var g = function (d, a) {
        if (
          "object" === typeof console &&
          "function" === typeof console.error &&
          "function" === typeof console.info &&
          "function" === typeof console.warn
        ) {
          var f;
          "object" === typeof d
            ? (d.unshift("[Quatro Digital - Smart Quantity]\n"), (f = d))
            : (f = ["[Quatro Digital - Smart Quantity]\n" + d]);
          if (
            "undefined" === typeof a ||
            ("alerta" !== a.toLowerCase() && "aviso" !== a.toLowerCase())
          )
            if ("undefined" !== typeof a && "info" === a.toLowerCase())
              try {
              } catch (g) {
                console.info(f.join("\n"));
              }
            else
              try {
                console.error.apply(console, f);
              } catch (g) {
                console.error(f.join("\n"));
              }
          else
            try {
              console.warn.apply(console, f);
            } catch (g) {
              console.warn(f.join("\n"));
            }
        }
      },
      l = {
        buyButton: ".buy-button",
        qttInput: ".qd-sq-quantity",
        btnMore: ".qd-sq-more",
        btnMinus: ".qd-sq-minus",
        initialValue: 1,
        setQuantityByUrl: !0,
      },
      n = function (h, a) {
        function f(c, e, b) {
          a.setQuantityByUrl
            ? c.val(
                ((location.search || "").match(m) || [a.initialValue]).pop()
              )
            : c.val(a.initialValue);
          c.change(function (c, b) {
            try {
              if ("qd_ssl_trigger" != b) {
                var e = d(this),
                  f = parseInt(e.val().replace(p, ""));
                !isNaN(f) && f > a.initialValue
                  ? e.val(f)
                  : e.val(a.initialValue);
                e.trigger("QuatroDigital.sq_change", this);
              }
            } catch (h) {
              g(h.message);
            }
          });
          c.focusin(function () {
            d(this).trigger("QuatroDigital.sq_focusin", this);
          });
          e.click(function (b) {
            b.preventDefault();
            c.val((parseInt(c.val()) || a.initialValue) + 1).change();
          });
          b.click(function (b) {
            b.preventDefault();
            c.val((parseInt(c.val()) || a.initialValue + 1) - 1).change();
          });
          c.change();
        }
        function l(c, e, b) {
          c.on("QuatroDigital.sq_change", function () {
            (d(this).val() || 0) <= a.initialValue
              ? (b.addClass("qd-sq-inactive"), e.removeClass("qd-sq-inactive"))
              : (e.addClass("qd-sq-inactive"), b.removeClass("qd-sq-inactive"));
          });
        }
        function n(c, e) {
          c.on("QuatroDigital.sq_change", function () {
            try {
              if (!(e[0].hostname || "").length)
                return g(
                  "A quantidade n\u00e3o foi inserida no bt comprar pois o mesmo n\u00e3o possui uma URL",
                  "info"
                );
              var b = e[0].search || "";
              -1 < b.toLowerCase().indexOf("qty=")
                ? (e[0].search = b.replace(
                    k,
                    "qty=" +
                      (parseInt(c.val()) ||
                        ("number" == typeof a.initialValue
                          ? a.initialValue
                          : 1)) +
                      "&"
                  ))
                : (e[0].search =
                    "qty=" +
                    (parseInt(c.val()) ||
                      ("number" == typeof a.initialValue
                        ? a.initialValue
                        : 1)) +
                    "&" +
                    (e[0].search || "").replace(k, ""));
              var d = ((e.attr("href") || "").match(q) || [""]).pop() + "";
              c.attr("data-sku-id", d);
              if (
                d.length &&
                "object" === typeof skuJson &&
                !c.attr("data-sku-price")
              )
                for (b = 0; b < skuJson.skus.length; b++)
                  skuJson.skus[b].sku == d &&
                    c.attr("data-sku-price", skuJson.skus[b].bestPrice);
            } catch (f) {
              g(f.message);
            }
          });
        }
        var p = /[^0-9-]/gi,
          m = /qty\=([0-9]+)/i,
          q = /sku\=([0-9]+)/i,
          k = /qty\=[0-9]+\&?/gi;
        h.each(function () {
          try {
            var c = d(this),
              e = c.find(a.buyButton),
              b = c.find(a.qttInput),
              h = c.find(a.btnMore),
              k = c.find(a.btnMinus);
            if ((!e.length && null !== a.buyButton) || !b.length)
              return g(
                "O plugin parou por aqui! N\u00e3o foram encontrados o bot\u00e3o comprar e o campo de quantidade",
                "alerta"
              );
            if (b.is(".qd-sq-on"))
              return g(
                [
                  "Execu\u00e7\u00e3o ignorada pois este input j\u00e1 possui o plugin aplicado. Input: ",
                  b,
                ],
                "info"
              );
            b.addClass("qd-sq-on");
            l(b, h, k);
            null !== a.buyButton && n(b, e);
            f(b, h, k);
            d(window).on("vtex.sku.selected", function () {
              b.change();
            });
          } catch (m) {
            g(m.message);
          }
        });
      };
    d.fn.QD_smartQuantity = function (g) {
      var a = d(this);
      a.qdPlugin = new n(a, d.extend({}, l, g));
      d(window).trigger("QuatroDigital.sq_callback");
      return a;
    };
    d(function () {
      d(".qd_auto_smart_quantity").QD_smartQuantity();
    });
  }
})(this);

/* Quatro Digital - Smart SKU Totalizer // 1.0 // Carlos Vinicius // Todos os direitos reservados */
(function (m) {
  var a = jQuery;
  if ("function" !== typeof a.fn.QD_smartSkuTotalizer) {
    var f = function (a, b) {
        if (
          "object" === typeof console &&
          "undefined" !== typeof console.error &&
          "undefined" !== typeof console.info &&
          "undefined" !== typeof console.warn
        ) {
          var c;
          "object" === typeof a
            ? (a.unshift("[Quatro Digital - Smart SKU Totalizer]\n"), (c = a))
            : (c = ["[Quatro Digital - Smart SKU Totalizer]\n" + a]);
          if (
            "undefined" === typeof b ||
            ("alerta" !== b.toLowerCase() && "aviso" !== b.toLowerCase())
          )
            if ("undefined" !== typeof b && "info" === b.toLowerCase())
              try {
              } catch (f) {
                try {
                  console.info(c.join("\n"));
                } catch (k) {}
              }
            else
              try {
                console.error.apply(console, c);
              } catch (g) {
                try {
                  console.error(c.join("\n"));
                } catch (e) {}
              }
          else
            try {
              console.warn.apply(console, c);
            } catch (n) {
              try {
                console.warn(c.join("\n"));
              } catch (p) {}
            }
        }
      },
      l = {
        inputQtt: "input",
        qttSkus: ".qd-selected-qtt-sku",
        valueSkus: ".qd-selected-sku-total",
      };
    a.QD_smartSkuTotalizer = function (d, b) {
      if (!d.length) return d;
      try {
        var c = a(b.qttSkus),
          h = a(b.valueSkus),
          k = a("meta[name='currency']").attr("content") || "R$";
        if (!c.length && !h.length)
          return f(
            "N\u00e3o encontrei os elementos para informar os totais, por isso n\u00e3o irei exibi-los.",
            "info"
          );
        var g = d.find(b.inputQtt).not("disabled").filter("[data-sku-id]");
        g.on("QuatroDigital.sq_change", function () {
          try {
            var b = 0,
              d = 0;
            g.each(function () {
              var c = a(this),
                e = parseInt(c.val());
              0 < e &&
                ((d += e),
                (b += e * (parseInt(c.attr("data-sku-price")) || 0)));
            });
            c.html(d);
            h.html(k + " " + qd_number_format(b / 100, 2, ",", "."));
          } catch (e) {
            f(e.message);
          }
        });
      } catch (e) {
        f(e.message);
      }
    };
    a.fn.QD_smartSkuTotalizer = function (d) {
      var b = a(this);
      if (!b.length) return b;
      var c = a.extend({}, l, d);
      b.each(function () {
        a.QD_smartSkuTotalizer(a(this), c);
      });
      return b;
    };
    a(function () {
      a(".qd_auto_smart_sku_totalizer").QD_smartSkuTotalizer();
    });
  }
})(this);

function qd_number_format(number, decimals, dec_point, thousands_sep) {
  // Strip all characters but numerical ones.
  number = (number + "").replace(/[^0-9+\-Ee.]/g, "");
  var n = !isFinite(+number) ? 0 : +number,
    prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
    sep = typeof thousands_sep === "undefined" ? "," : thousands_sep,
    dec = typeof dec_point === "undefined" ? "." : dec_point,
    s = "",
    toFixedFix = function (n, prec) {
      var k = Math.pow(10, prec);
      return "" + Math.round(n * k) / k;
    };
  // Fix for IE parseFloat(0.55).toFixed(0) = 0;
  s = (prec ? toFixedFix(n, prec) : "" + Math.round(n)).split(".");
  if (s[0].length > 3) {
    s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
  }
  if ((s[1] || "").length < prec) {
    s[1] = s[1] || "";
    s[1] += new Array(prec - s[1].length + 1).join("0");
  }
  return s.join(dec);
}

function isProductInCart(sku) {
  return vtexjs.checkout.orderForm.items.find((item) => item.id === sku);
}

function handleAddToCart(buyLink) {
  const [, skuAfter] = buyLink.split("sku=");
  const [sku] = skuAfter.split("&");
  console.log("handleAddToCart sku", sku);
  let quantity = document.querySelector(`[data-sku-id="${sku}"]`).value;

  const [, sellerAfter] = buyLink.split("seller=");
  const [sellerId] = sellerAfter.split("&");
  console.log("handleAddToCart sellerId", sellerId);

  console.log("handleAddToCart qty", quantity);
  if (!quantity) {
    alert("Selecione a quantidade");
  }
  const productInCart = isProductInCart(sku);
  if (productInCart) {
    quantity = Number(quantity) + Number(productInCart.quantity);
  }

  const product = [
    {
      id: sku,
      quantity,
      seller: sellerId,
    },
  ];
  vtexjs.checkout.getOrderForm().then((orderForm) => {
    vtexjs.checkout
      .addToCart(product, null, this.salesChannel)
      .done((orderForm) => {
        window.location.reload();
      });
  });
}

function addQueryParamWithoutReloading(key, value) {
  if (history.pushState) {
    let newurl =
      window.location.protocol +
      "//" +
      window.location.host +
      window.location.pathname;
    const query = new URLSearchParams(window.location.search);

    query.set(key, value);

    if ([...query].length) {
      newurl += "?" + query.toString();
    }
    //window.history.pushState({path:newurl}, '', newurl);
    window.location.href = newurl;
  }
}

function addToCartButtonOnPdp(sku, qtd, seller, sc) {
  var item = {
    id: sku,
    quantity: qtd,
    seller: seller,
  };
  vtexjs.checkout.addToCart([item], null, sc).done(function (orderForm) {
    console.log(orderForm);
    location.reload();
  });
}

function validateValue(input) {
  const min = parseInt(input.min, 10);
  const max = parseInt(input.max, 10);
  let value = parseInt(input.value, 10);

  if (isNaN(value)) {
    value = min;
  }

  if (value < min) {
    value = min;
  } else if (value > max) {
    value = max;
  }

  input.value = value;
}

$(document).ready(function () {
  try {
    if (skuJson) {
      $(".mz-product__sku-total.text-right.mz-buy-button").prepend(`
        <style>
        #buyQuantity {
          padding-bottom: 5px;
        }

        #buyQuantity>input[type=number] {
          text-align: center;
        }
        #buyQuantity>input[type=number]::-webkit-inner-spin-button, 
        #buyQuantity>input[type=number]::-webkit-outer-spin-button {  
          opacity: 1;
        }
        </style>
        <div id="buyQuantity"><input type="number" min="1" max="${skuJson.skus[0].availablequantity}" value="1" oninput="validateValue(this)"></div>
      `);
      console.log(skuJson);
      $(".qd-selected-sku-total").text(() => {
        switch (skuJson.skus) {
          case skuJson.skus.find(
            (e) =>
              e.listPriceFormated || e.bestPriceFormated || e.fullSellingPrice
          ).fullSellingPrice:
            return skuJson.skus.find(
              (e) =>
                e.listPriceFormated || e.bestPriceFormated || e.fullSellingPrice
            ).fullSellingPrice;
          case skuJson.skus.find(
            (e) =>
              e.listPriceFormated || e.bestPriceFormated || e.fullSellingPrice
          ).listPriceFormated != "R$ 0,00":
            return skuJson.skus.find(
              (e) =>
                e.listPriceFormated || e.bestPriceFormated || e.fullSellingPrice
            ).listPriceFormated;
          default:
            return skuJson.skus.find(
              (e) =>
                e.listPriceFormated || e.bestPriceFormated || e.fullSellingPrice
            ).bestPriceFormated;
        }
      });
      $(".product__buy-button").off();
      $(".product__buy-button").on("click", () => {
        // let skuSelectedOnPdp = $(".sku-selector-container input[checked]")[0].id.split("_").at(-1);
        let skuSelectedOnPdp = 0;
        let quantityInputPdp = parseInt(
          $("#buyQuantity>input[type=number]").val()
        );

        var skuOnCartQuantity = 0;
        var skuSelected = vtexjs.checkout.orderForm.items.find(
          (el) => el.id == skuJson.skus[skuSelectedOnPdp].sku
        );
        if (skuSelected) skuOnCartQuantity = skuSelected.quantity;
        addToCartButtonOnPdp(
          skuJson.skus[skuSelectedOnPdp].sku,
          skuOnCartQuantity + quantityInputPdp,
          skuJson.skus[skuSelectedOnPdp].sellerId,
          skuJson.salesChannel
        );
      });
    }
  } catch (e) {
    console.log("não achou skuJson");
  }
  $(".asynchronousBuyButton").click(function (event) {
    event.preventDefault();
    event.stopImmediatePropagation();
    const buyLink = event.target.href;
    handleAddToCart(buyLink);
  });

  $(".dropdown-item").on("click", (e) => {
    addQueryParamWithoutReloading("O", e.currentTarget.dataset.orderParameter);
  });

  $("a.actionActivated").click(function (event) {
    event.preventDefault();
    event.stopImmediatePropagation();
    const buyLink = event.target.href;
    handleAddToCart(buyLink);
  });
});

function setUrlParam(paramName, paramValue) {
  const url = new URL(window.location.href);
  url.searchParams.set(paramName, paramValue);
  window.history.pushState({}, "", url.toString());
  window.location.href = window.location.href;
}

vtexjs.checkout.getOrderForm().done(function (orderForm) {
  if (
    window.location.href.match("centerparts.com.br") &&
    !window.location.pathname.match(/\/Sistema\/401|\/login|\/cadastro/)
  ) {
    console.log("OrderForm", orderForm, $.cookie("VTEXSC"));
    if (!orderForm.loggedIn) {
      window.location.href = `https://www.centerparts.com.br/Sistema/401`;
      // if($.cookie("VTEXSC").split("=")[1] != orderForm.salesChannel)
      //   setUrlParam($.cookie("VTEXSC").split("=")[0], $.cookie("VTEXSC").split("=")[1]);
    }
  }
  preserveCart();
});

// ------------- cart-loading --------------------

document.addEventListener("DOMContentLoaded", function () {
  const loadingText = document.querySelector(".loading__wrapper-text");

  if (loadingText) {
    loadingText.textContent = "Usuário não possui endereço cadastrado";
  }
});

// ------------- cart-loading final --------------
// ------------- Carrinho preservado -------------

function preserveCart() {
  const ultimaExecucao = localStorage.getItem("ultimaExecucao");

  if (ultimaExecucao) {
    const agora = new Date().getTime();
    const tempoPassado = agora - parseInt(ultimaExecucao);
    // 3600000
    const umaHora = 3600000;

    if (tempoPassado < umaHora) {
      return;
    }
  }
  try {
    let apiUrl =
      "https://signup-centerparts.inovaki.com.br/vtex-user-info/vtex-crm.php?u=" +
      vtexjs.checkout.orderForm.userProfileId;

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        let str = data.user.rclastcart;

        let formaPagamentoDate = new Date(
          data.user.checkouttag?.Scores?.FormaPagamento?.[0].Date
        );
        let lastAbandonedCart = new Date(data.user.rclastsessiondate);

        if (formaPagamentoDate < lastAbandonedCart) {
          return;
        }

        let params = str.replace("add?", "").split("&");
        let result = [];
        let currentItem = {};
        params.forEach((param) => {
          let [key, value] = param.split("=");
          if (key === "sku") {
            if (Object.keys(currentItem).length > 0) {
              result.push(currentItem);
            }
            currentItem = { id: value, quantity: 1, seller: 1 };
          } else if (key === "qty") {
            currentItem.quantity = parseInt(value);
          } else if (key === "seller") {
            currentItem.seller = parseInt(value);
          }
        });

        if (Object.keys(currentItem).length > 0) {
          result.push(currentItem);
        }

        console.log("Itens do último carrinho:", result);

        vtexjs.checkout.getOrderForm().done(function (orderForm) {
          const itensCarrinhoAtual = orderForm.items.map((item) => ({
            id: item.id.toString(),
            quantity: item.quantity,
            seller: item.seller,
          }));

          const itensParaAdicionar = [];

          result.forEach((item) => {
            const itemNoCarrinho = itensCarrinhoAtual.find(
              (carrinhoItem) =>
                carrinhoItem.id === item.id &&
                carrinhoItem.seller === item.seller
            );

            if (itemNoCarrinho) {
              if (itemNoCarrinho.quantity < item.quantity) {
                const quantidadeFaltante =
                  item.quantity - itemNoCarrinho.quantity;
                itensParaAdicionar.push({
                  id: item.id,
                  quantity: quantidadeFaltante,
                  seller: item.seller,
                });
              }
            } else {
              itensParaAdicionar.push(item);
            }
          });

          if (itensParaAdicionar.length > 0) {
            vtexjs.checkout
              .addToCart(itensParaAdicionar, null, 3)
              .done(function (orderForm) {
                console.log(
                  "Carrinho atualizado com os itens faltantes:",
                  orderForm
                );
              });
          } else {
            console.log(
              "Carrinho já contém todos os itens com as quantidades corretas"
            );
          }

          localStorage.setItem("ultimaExecucao", new Date().getTime());
        });
      })
      .catch((error) => {
        console.error("Erro ao buscar dados da API:", error);
      });
  } catch (error) {
    console.log(error);
  }
}

// ------------- Carrinho preservado final -------------
