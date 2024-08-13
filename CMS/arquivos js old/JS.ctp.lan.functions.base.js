/* LAPTOP-CN6FM2GO - 28/12/2021 16:55:29 GMT */
"function" !== typeof String.prototype.trim &&
  (String.prototype.trim = function () {
    return this.replace(/^\s+|\s+$/g, "");
  });
"function" !== typeof String.prototype.replaceSpecialChars &&
  (String.prototype.replaceSpecialChars = function () {
    var b = {
      ç: "c",
      æ: "ae",
      œ: "oe",
      á: "a",
      é: "e",
      í: "i",
      ó: "o",
      ú: "u",
      à: "a",
      è: "e",
      ì: "i",
      ò: "o",
      ù: "u",
      ä: "a",
      ë: "e",
      ï: "i",
      ö: "o",
      ü: "u",
      ÿ: "y",
      â: "a",
      ê: "e",
      î: "i",
      ô: "o",
      û: "u",
      å: "a",
      ã: "a",
      ø: "o",
      õ: "o",
      u: "u",
      Á: "A",
      É: "E",
      Í: "I",
      Ó: "O",
      Ú: "U",
      Ê: "E",
      Ô: "O",
      Ü: "U",
      Ã: "A",
      Õ: "O",
      À: "A",
      Ç: "C",
    };
    return this.replace(/[\u00e0-\u00fa]/gi, function (a) {
      return "undefined" != typeof b[a] ? b[a] : a;
    });
  });
try {
  var Common = {
    init: function () {
      Common.addBodyClass();
      Common.bannersCount();
      Common.showFloatinBar();
      Common.modalCallChange();
      Common.clickAmazingMenu();
      Common.callSmartCart();
      Common.buyInShelf();
      Common.userInfo();
      Common.expressPurchase();
      Common.qdGoogleTranslate();
      Common.saveCurrentCart();
      Common.loadCurrentCart();
    },
    ajaxStop: function () {
      Common.loginVerification();
    },
    windowOnload: function () {},
    qdGoogleTranslate: function () {
      $(".qd-google-translate a").click(function (evt) {
        evt.preventDefault();
        $(".goog-te-menu-frame:eq(0)")
          .contents()
          .find("span:contains('" + $(this).attr("data-qd-translate") + "')")
          .click();
      });
    },
    bannersCount: function () {
      $(".box-banner")
        .parent()
        .each(function () {
          var $t = $(this);
          $t.addClass("qdBannerCount-" + $t.find(".box-banner").length);
        });
    },
    addBodyClass: function () {
      $(document.body).addClass(location.hostname.replace(/\./g, "-"));
    },
    expressPurchase: function () {
      if (!$(document.body).is(".compra-express")) return;
      var table = $(".qd-products-table tbody");
      var textarea = $(".express-purchase-title-qd-v1 textarea");
      var purchaseShelf = $(".express-purchase-shelf-qd-v1");
      var purchaseContent = $(".express-purchase-content");
      var orderId = {};
      $(".qd-products-table thead").html(
        '<tr> <th class="id-table">ID</th> <th class="id-sku">Cod </th> <th class="product-name-table" colspan="3">PRODUTO</th> <th class="price-table">PREÇO</th> <th class="buy-table">ADICIONAR</th> </tr>'
      );
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
      var request = 0;
      var requestComplete = 0;
      function getItem(id, qty) {
        request++;
        purchaseContent.addClass("qd-loading");
        $.ajax({
          url: "/api/catalog_system/pub/products/search/" + id,
          dataType: "json",
          headers: {
            "REST-Range": "resources=0-99",
          },
          success: function (data) {
            var html, $html;
            if (!data.length) {
              table.append(
                '<tr class="qd-item-not-found" data-qd-id-table="' +
                  id +
                  '"><td>' +
                  id +
                  '</td><td class="not-found-item-table" colspan="4"><div class="shelf-not-found-item"><p>Item não encontrado</p></div></td></tr>'
              );
              return purchaseShelf.show();
            }
            for (var i = 0; i < data.length; i++)
              for (var l = 0; l < data[i].items.length; l++) {
                if (
                  purchaseShelf.find("#qd-sku-" + data[i].items[l].itemId)
                    .length
                )
                  continue;
                html =
                  '<tr id="qd-sku-' +
                  data[i].items[l].itemId +
                  '" data-qd-id-table="' +
                  id +
                  '">';
                html += '<td class="id-table">' + id + "</td>";
                html +=
                  '<td class="id-sku">' + data[i].items[l].itemId + "</td>";
                html +=
                  '<td class="image-table shelf-image"><img src="' +
                  data[i].items[l].images[0].imageUrl.replace(
                    /(ids\/[0-9]+)(\-[0-9]+\-[0-9]+)?/i,
                    "$1-60-60"
                  ) +
                  '" /></td>';
                html += '<td class="product-name-table">';
                html +=
                  '<h3 class="shelf-product-name"><a href="' +
                  data[i].link +
                  '" target="_blank">' +
                  data[i].items[l].nameComplete +
                  "</a></h3>";
                html += "</td>";
                if (
                  data[i].items[l].sellers[0].commertialOffer.AvailableQuantity
                ) {
                  html += '<td class="price-table">';
                  html +=
                    '<div class="shelf-price-best-price"><span class="best-price">R$ ' +
                    qd_number_format(
                      data[i].items[l].sellers[0].commertialOffer.Price,
                      2,
                      ",",
                      "."
                    ) +
                    "</span></div>";
                  html += "</td>";
                  html +=
                    '<td class="buy-table shelf-common-buy-button" data-qd-qty="' +
                    qty +
                    '">';
                  html += '<input type="text" class="quant qd-sq-quantity">';
                  html +=
                    '<a href="' +
                    data[i].items[l].sellers[0].addToCartLink +
                    '" class="buy-button qd-buy-button btn-add-buy-button-asynchronous remove-href">Comprar</a>';
                  html += "</td>";
                } else
                  html +=
                    '<td colspan="2" class="no-stock-table found-item-table"> <div class="shelf-no-stock"> <p>indisponível</p> </div> </td>';
                html += "</tr>";
                $html = $(html);
                table.append($html);
              }
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
    loginVerification: function () {
      $(".user-messenger #login").hide();
      $(".user-messenger #login:not('.qd-on')")
        .addClass("qd-on")
        .after('<a href="/login">Já é cadastrado?</a>');
    },
    clickAmazingMenu: function () {
      $(".main-amazing-menu ul[itemscope] > li").click(function (evt) {
        $(this).toggleClass("qd-active").siblings().removeClass("qd-active");
      });
      $(".main-amazing-menu ul[itemscope] > li > a").click(function (evt) {
        evt.preventDefault();
        $(this).toggleClass("qd-active").siblings().removeClass("qd-active");
      });
    },
    showFloatinBar: function () {
      $(document.body).attr("data-qd-scroll-limit", "180");
      var autocomplete = $(".ui-autocomplete");
      $(window).QD_scroll(function (scrollTop) {
        if (scrollTop > 150) {
          autocomplete.css("position", "fixed");
        } else {
          autocomplete.css("position", "relative");
        }
      });
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
        }).done(function () {
          console.log("Fim da request");
        });
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
          timeout: 3e3,
          success: function (data) {
            if (!data) return;
            if (data.status == "ERROR" || data.message) {
              alert("Erro! " + data.message);
              return;
            }
            var activitiesCodes = ["45.30-7-03", "45.30-7-01", "45.30-7-04"];
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
              form.find(".btn-continue").slideDown();
              form.find(".qdLoading").slideUp();
              window.QD_checkValidCnpj = false;
            }
          },
        });
      return window.QD_checkCnpjActivities_request;
    },
    modalCallChange: function () {
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
          '<a href="#" class="btn btn-block btn-large call-page-register">Fazer Cadastro</a>'
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
        $(".call-page-register").click(function (evt) {
          evt.preventDefault();
          $("body").addClass("form-register-open");
          $(".modal-base .modal-body, .modal-base .modal-footer").empty();
          $(".modal-base .modal-header .close").siblings().empty();
          $(".first-step").each(function () {
            $(".modal-base .modal-body").html(this.innerHTML);
          });
          $(".modal-base .modal-header").html(
            $(".first-step-content .text-header").addClass("header-first-step")
          );
          $(".modal-base")
            .removeClass("third-step")
            .removeClass("second-step")
            .addClass("pop-ups-identification first-step")
            .modal({
              backdrop: "static",
              keyboard: false,
            });
          Common.formCadastreMask();
          var $form = $(".form-first-step");
          var loading = $(
            '<div class="qdLoading qd-hide qd-padding-15 bg-warning col-xs-6 col-xs-offset-3">Carregando ... <img src="//centerparts.vteximg.com.br/arquivos/ajax-loader.gif" /></div>'
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
          var cepInputs = $form
            .find(
              "textarea[name=rua], input[name=numero], input[name=complemento], input[name=bairro], input[name=cidade], input[name=estado], input[name=pais]"
            )
            .attr("disabled", "disabled");
          var cep = $form.find("input[name=cep]");
          cep.keyup(function (e) {
            if ((cep.val() || "").length < 9) return;
            $form.find(".btn-continue").slideUp();
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
                $form.find(".btn-continue").slideDown();
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
                $form.find(".btn-continue").slideUp();
                loading.slideDown();
                var inputs = $form.find("input, textarea");
                Common.checkEmailExist(
                  inputs.filter("[name='e-mail']").val() || ""
                )
                  .always(function () {
                    loading.slideUp();
                  })
                  .done(function (data) {
                    loading.slideDown();
                    if (data.out.length) {
                      $form.find(".btn-continue").slideDown();
                      loading.slideUp();
                      return;
                    }
                    Common.checkCnpjExist(
                      inputs.filter("[name='cnpj']").val() || ""
                    )
                      .always(function () {
                        loading.slideUp();
                      })
                      .done(function () {
                        loading.slideDown();
                        if (data.out.length) {
                          $form.find(".btn-continue").slideDown();
                          loading.slideUp();
                          return;
                        }
                        Common.checkCnpjActivities(
                          inputs.filter("[name='cnpj']").val() || ""
                        )
                          .always(function () {
                            loading.slideUp();
                          })
                          .done(function () {
                            loading.slideDown();
                            if (!window.QD_checkValidCnpj) {
                              $form.find(".btn-continue").slideDown();
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
                                }),
                              },
                              success: function (data) {
                                $.ajax({
                                  url: "https://centerb2b.websiteseguro.com/vtex-user-sign-up/insert.php",
                                  type: "POST",
                                  dataType: "json",
                                  data: {
                                    e: "AD",
                                    data: JSON.stringify({
                                      addressName: "Principal",
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
                                    $(
                                      ".modal-base .modal-body, .modal-base .modal-footer"
                                    ).empty();
                                    $(".modal-base .modal-header .close")
                                      .siblings()
                                      .empty();
                                    $(".second-step").each(function () {
                                      $(".modal-base .modal-body").html(
                                        this.innerHTML
                                      );
                                    });
                                    $(".modal-base")
                                      .removeClass("first-step")
                                      .removeClass("third-step")
                                      .addClass("second-step")
                                      .modal({
                                        backdrop: "static",
                                        keyboard: false,
                                      });
                                    setTimeout(function () {
                                      window.location.href = "/login";
                                    }, 5e3);
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
          $(".btn-next-step").click(function () {
            $(".modal-base .modal-body, .modal-base .modal-footer").empty();
            $(".modal-base .modal-header .close").siblings().empty();
            $(".modal.pop-ups-identification").modal("hide");
            $("body").removeClass("form-register-open");
            $(".vtexIdUI").height($(".vtexIdUI-page-active").height());
          });
        });
        var register = (
          (location.search || "").match(/register=([^&]+)/i) || [""]
        ).pop();
        if (register) $(".call-page-register").click();
      });
    },
    callSmartCart: function () {
      var smartCart = $.QD_smartCart({
        selector: ".qd-sc-wrapper",
        dropDown: {
          texts: {
            linkCart: "IR ao Carrinho",
            linkCheckout: "",
            shippingForm: "",
          },
          updateOnlyHover: false,
          forceImageHTTPS: true,
          skuName: function (data) {
            return data.name;
          },
          callback: function () {
            $(".qd-ddc-wrapper3:not('.qd-on')")
              .addClass("qd-on")
              .prepend(
                '<div class="qd-cartTitle"><h3>Produtos no seu carrinho</h3></div>'
              );
          },
        },
        buyButton: {
          buyButton: ".product-buy-button .buy-button",
          buyQtt: ".product-buy-button .qd-sq-quantity",
          autoWatchBuyButton: false,
          productPageCallback: function (jqXHR, textStatus, prodLink) {
            if (!$("body").is(".productQuickView")) return;
            if (textStatus !== "success") {
              alert(
                "Ooops! Algo saiu errado ao tentar adicionar seu produto ao carrinho. \n Vou te redirecionar para o carrinho."
              );
              (typeof parent === "object" ? parent : document).location.href =
                prodLink;
            }
          },
          allowBuyClick: function () {
            return window.QD_smartCartAllowBuy;
          },
        },
      });
      window._QuatroDigital_prodBuyCallback = function (
        jqXHR,
        textStatus,
        prodLink,
        skus
      ) {
        $(".shelf-buy-button-modal").modal("hide");
        $(window).trigger("QuatroDigital.qd_bb_prod_add", [
          new $(),
          skus[0] || 0,
        ]);
      };
    },
    buyInShelf: function () {
      var fn = function () {
        $(".shelf-common-buy-button .buy-button:not('.qd-on-bb')")
          .addClass("show qd-on-bb")
          .click(function (e) {
            e.preventDefault();
            Common.buyInShelfOpenModal(
              ($(this).attr("href") || "").replace(
                "/qd-buy-button?idproduto=",
                ""
              )
            );
          });
      };
      fn();
      $(".modal").on("hidden.bs.modal", function () {
        $(this).removeClass("shelf-buy-button-modal");
      });
      $(window).on("QuatroDigital.is_Callback", function () {
        fn();
      });
    },
    buyInShelfOpenModal: function (productId) {
      var modal = $(".modal-base")
        .clone()
        .appendTo(document.body)
        .addClass("shelf-buy-button-modal")
        .removeClass("modal-base");
      var header = modal.find(".modal-header");
      header.children(":not(.close)").remove();
      header.append("<h3>Escolha a variação</h3>");
      var iframe = $(
        '<iframe src="/qd-buy-button?idproduto=' +
          productId +
          '" frameborder="0"></iframe>'
      );
      modal.find(".modal-body").empty().append(iframe);
      modal.modal();
      iframe.load(function () {
        try {
          var $t = $(this);
          $t.height($t.contents().find("body").outerHeight(true) + 5);
        } catch (e) {
          if (
            typeof console !== "undefined" &&
            typeof console.error === "function"
          )
            console.error(e.message);
        }
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
        try {
          html = '<div class="qd-user-info">';
          html +=
            '<p>Olá, <span class="user-name">' +
            (data.user.corporateName || data.user.firstName || "---") +
            ' <i class="fa fa-caret-down"></i></span> <a href="/no-cache/user/logout">Novo Usuário?</a></p>';
          html += '<div class="user-complete-info-wrapper">';
          html +=
            '<div class="row qd-user-title"><div class="col-xs-6"><p class="topo">' +
            (data.user.corporateName || "---") +
            '</p></div><div class="col-xs-6"><p class="topo">' +
            (data.user.corporateDocument || "---")
              .replace(/[^0-9]+/, "")
              .replace(
                /([0-9]{2})([0-9]{3})([0-9]{3})([0-9]{4})([0-9]{2})/,
                "$1.$2.$3/$4-$5"
              ) +
            "</p></div></div>";
          html +=
            '<div class="row"> <div class="col-xs-6"> <div class="row"><div class="linha">';
          html += '<div class="col-xs-3"><p class="titulo">Endereço:</p></div>';
          html +=
            '<div class="col-xs-9"><p>' +
            (data.address.street || "---") +
            "</p>" +
            "<p>" +
            (data.address.complement || "---") +
            "</p> <p>" +
            (data.address.neighborhood || "---") +
            "</p> <p>" +
            (data.address.city || "---") +
            "-" +
            (data.address.state || "---") +
            "</p> <p>" +
            (data.address.postalCode || "---") +
            "</p></div>";
          html += '</div> </div><div class="row"> <div class="linha">';
          html += '<div class="col-xs-3"><p class="titulo">Responsável:</div>';
          html +=
            '<div class="col-xs-9"><p>' +
            (data.user.firstName || "---") +
            " " +
            (data.user.lastName || "---") +
            "</p> <p>" +
            (data.user.email || "---") +
            "</p> <p>" +
            phoneFormat(data.user.homePhone || "---") +
            "</p></div>";
          html +=
            '</div> </div> </div> <div class="col-xs-6"> <div class="row"><div class="linha">';
          html +=
            '<div class="col-xs-3"><p class="titulo">Representantes:</p></div>';
          html += '<div class="col-xs-9"><div class="row">';
          html +=
            '<div class="col-xs-6"><p><i class="fa fa-info-circle"></i>' +
            (data.user.CodRep1 || "---") +
            '</p> <p><i class="fa fa-user"></i>' +
            (data.user.NomeRep1 || "---") +
            '</p> <p><i class="fa fa-phone"></i>' +
            phoneFormat(data.user.TelRep1 || "---") +
            '</p> <p><i class="fa fa-asterisk"></i>Linha Leve</p></div>';
          if (data.user.NomeRep2)
            html +=
              '<div class="col-xs-6"><p><i class="fa fa-info-circle"></i>' +
              (data.user.CodRep2 || "---") +
              '</p> <p><i class="fa fa-user"></i>' +
              (data.user.NomeRep2 || "---") +
              '</p> <p><i class="fa fa-phone"></i>' +
              phoneFormat(data.user.TelRep2 || "---") +
              '</p> <p><i class="fa fa-asterisk"></i>Linha Pesada</p></div>';
          html +=
            '</div> </div> </div> </div> <div class="row"> <div class="linha">';
          html += '<div class="col-xs-3"><p class="titulo">Apoios</p></div>';
          html += '<div class="col-xs-9"><div class="row">';
          html +=
            '<div class="col-xs-6"><p><i class="fa fa-info-circle"></i>' +
            (data.user.CodApoio1 || "---") +
            '</p> <p><i class="fa fa-user"></i>' +
            (data.user.NomeApoio1 || "---") +
            '</p> <p><i class="fa fa-phone"></i>' +
            phoneFormat(data.user.TelApoio1 || "---") +
            '</p> <p><i class="fa fa-asterisk"></i>Linha Leve</p></div>';
          if (data.user.CodApoio2)
            html +=
              '<div class="col-xs-6"><p><i class="fa fa-info-circle"></i>' +
              (data.user.CodApoio2 || "---") +
              '</p> <p><i class="fa fa-user"></i>' +
              (data.user.NomeApoio2 || "---") +
              '</p> <p><i class="fa fa-phone"></i>' +
              phoneFormat(data.user.TelApoio2 || "---") +
              '</p> <p><i class="fa fa-asterisk"></i></p>Linha Pesada</div>';
          html += "</div> </div> </div> </div> </div> </div>";
          html +=
            '<div class="row qd-user-footer"><div class="col-xs-12"><p class="rodape">Para atualizar as informações, ligue para 0800 - 020 - 1744<a href="/no-cache/user/logout" class="pull-right">Sair</a></p></div></div>';
          html += "</div></div>";
          var $html = $(html);
          $(".user-messenger .ajax-content-loader").before($html);
          $html.find(".user-name").click(function () {
            $html.toggleClass("qd-info-opened");
          });
          $(document.body).click(function (e) {
            var target = $(e.target);
            if (
              target.is(":not(.user-messenger)") &&
              target.getParent(".user-messenger").length < 1
            )
              $html.removeClass("qd-info-opened");
          });
          $(".user-complete-info-wrapper .linha p").each(function () {
            $t = $(this);
            if ($t.text() == "---") $t.addClass("qd-empty");
          });
        } catch (e) {
          if (
            typeof console !== "undefined" &&
            typeof console.error === "function"
          )
            console.error(e.message);
        }
      };
      $.qdAjax({
        url: "/no-cache/profileSystem/getProfile",
        dataType: "json",
        clearQueueDelay: null,
        success: function (data) {
          try {
            if (!data.UserId) {
              var html =
                '<div class="qd-user-info"><p>Olá visitante!</p></div>';
              $(".user-messenger .ajax-content-loader").before(html);
              return;
            }
            $.qdAjax({
              url:
                "https://centerb2b.websiteseguro.com/vtex-user-info/vtex-crm.php?u=" +
                data.UserId,
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
        },
      });
    },
    saveCurrentCart: function () {
      $(window).on("orderFormUpdated.vtex", function (e, orderForm) {
        if (!orderForm.userProfileId) return;
        var items = orderForm.items;
        if (items.length <= 0) return;
        var itemsJson = {
          items: [],
        };
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
        $.ajax({
          url: "/api/dataentities/SC/documents",
          type: "PATCH",
          dataType: "json",
          headers: {
            Accept: "application/vnd.vtex.ds.v10+json",
            "Content-Type": "application/json; charset=utf-8",
          },
          data: JSON.stringify({
            id: orderForm.orderFormId,
            profileId: userProfileId,
            data: JSON.stringify(itemsJson),
          }),
          success: function (data) {
            $.cookie("QD-SC-OFI", orderForm.orderFormId, {
              path: "/",
            });
          },
        });
      });
    },
    loadCurrentCart: function () {
      if ($.cookie("qd_current_cart_loaded")) return;
      vtexjs.checkout.getOrderForm().done(function (orderForm) {
        if (!orderForm.userProfileId) return;
        if (orderForm.items.length > 0) return;
        var userProfileId = orderForm.userProfileId
          .replace(/-/gi, "")
          .toLowerCase();
        $.ajax({
          url:
            "/api/dataentities/SC/search?_fields=data,status,createdIn&_sort=createdIn%20DESC&profileId=" +
            userProfileId,
          type: "GET",
          dataType: "json",
          cache: false,
          headers: {
            Accept: "application/vnd.vtex.ds.v10+json",
            "REST-Range": "resources=0-1",
          },
          success: function (cartData) {
            var latestCart = cartData[0];
            if (!latestCart) return;
            var latestCartItems = JSON.parse(latestCart.data);
            if (latestCart.status == "finished") return;
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
                $(window).trigger("productAddedToCart");
                $(window).trigger("cartProductAdded.vtex");
                $.cookie("qd_current_cart_loaded", 1, {
                  expires: 1,
                  path: "/",
                });
              });
          },
        });
      });
    },
  };
  var Home = {
    init: function () {
      Home.videoCarousel();
      Home.callVideoModal();
      Home.applyCarousel();
    },
    ajaxStop: function () {},
    windowOnload: function () {},
    videoCarousel: function () {
      $(".video-wrapper-qd-v1-carousel").slick({
        prevArrow:
          '<button type="button" class="slick-prev slick-arrow" title="Anterior"><i class="fa fa-chevron-left" aria-hidden="true"></i></button>',
        nextArrow:
          '<button type="button" class="slick-next slick-arrow" title="Próximo"><i class="fa fa-chevron-right" aria-hidden="true"></i></button>',
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
      });
    },
    callVideoModal: function () {
      var modal = $(".modal-base")
        .clone()
        .appendTo(document.body)
        .addClass("modal-qd-v1-video")
        .removeClass("modal-base");
      $(
        ".video-wrapper-qd-v1-carousel .box-banner a, .qdSideMenu .box-banner a"
      ).click(function (e) {
        e.preventDefault();
        var productField = $(this).attr("href");
        var url = productField.replace(/\;\s*/, ";").split(";");
        modal
          .find(".modal-body")
          .html(
            '<iframe src="http://www.youtube.com/embed/' +
              url[0].split("v=").pop().split(/[&#]/).shift() +
              '?wmode=transparent&rel=0&enablejsapi=1" frameborder="0" allowfullscreen></iframe>'
          );
        modal.modal();
      });
    },
    applyCarousel: function () {
      var wrapper = $(".shelf-qd-v1-carousel");
      wrapper.find(".prateleira").each(function () {
        var wrap = $(this);
        wrap.find("h2").insertBefore(wrap);
      });
      wrapper.find(".prateleira").owlCarousel({
        items: 4,
        navigation: true,
        pagination: false,
      });
    },
    popupAlert: function () {
      $("body").append(
        '<div class="alert-wrapper" style="position: fixed;background: rgba(255,255,255,0.5);width: 100vw;height: 100vh;top: 0;left: 0;display: flex;justify-content: center;align-items: center;"><div class="alert-inner" style="max-width:90vw;background:white;"><img src="/arquivos/aviso.png" style="width:100%;"></div></div>'
      );
      $(".alert-wrapper").click(function () {
        $(".alert-wrapper").remove();
      });
    },
  };
  var Departament = {
    init: function () {
      Departament.showDisclaimerBanners();
      Search.alternativePrices();
    },
    ajaxStop: function () {
      Search.alternativePrices();
    },
    windowOnload: function () {
      Search.tableOrList();
    },
    showDisclaimerBanners: function () {
      if ($(".disclaimer .box-banner").length) $(".disclaimer").show();
    },
  };
  var Search = {
    init: function () {
      Search.emptySearch();
      Search.alternativePrices();
      Search.addOrderBySelect();
    },
    ajaxStop: function () {
      Search.alternativePrices();
    },
    windowOnload: function () {
      Search.tableOrList();
    },
    emptySearch: function () {
      if ($(".busca-vazio").length > 0) {
        $(".no-search-result").show();
        $(".searchTitle").hide();
      }
    },
    addOrderBySelect: function () {
      $(".mz-search__order-Filters option").click(function (e) {
        e.preventDefault();
        var $t = $(this);
        var value = $t.attr("data-order-parameter");
        location.search = (
          location.search.replace(/O=[^&]+/g, "") +
          "&" +
          value
        )
          .replace("?&", "?")
          .replace(/&{2,}/g, "&");
      });
      var orderBy = (location.search.match(/O=[^&]+/g, "") || [""]).pop();
      if (!orderBy.length) return;
    },
    tableOrList: function () {
      var wrap = $(
          '<div class="shelfStyleButtons"><span class="shlelf-text">Exibir em:</span></div>'
        ),
        button = $(
          '<div class="alternativeCssSelector inList selected"> <span class="btnView listBtn"><i class="fa fa-reorder"></i> Lista</span> </div> <div class="alternativeCssSelector inTable"> <span class="btnView gridBtn"><i class="fa fa-th-large"></i> Grade</span> </div>'
        ),
        shelfWrap = $("body"),
        originalClass = shelfWrap.attr("class");
      shelfWrap.addClass("productsInList");
      $(".resultItemsWrapper").show();
      button.bind("click", function () {
        var $t = $(this);
        button.removeClass("selected");
        shelfWrap
          .attr("class", originalClass)
          .addClass(
            "productsIn" + $t.attr("class").split("in").pop().split(" ").shift()
          );
        $t.addClass("selected");
      });
      wrap.append(button);
      $(".resultado-busca-filtro:first").before(wrap);
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
  };
  var Product = {
    init: function () {
      Product.forceImageZoom();
      Product.setSkuExibition();
      Product.calcFreight();
      Product.productSmartQuantity();
      Product.productBuyButton();
      Product.productButtonViewPriceStore();
      Product.productListCallBuyButton();
      Product.productListSkuQuantity();
      Product.productListSetUnavailable();
      Product.selectSku();
      Product.uniqueBuyButton();
    },
    ajaxStop: function () {},
    windowOnload: function () {
      Product.giftListAddText();
    },
    giftListAddText: function () {
      $(".glis-popup-link").text("adicionar item acima às suas listas");
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
    uniqueBuyButton: function () {
      var wrapper = $(".product-sku-info-wrapper");
      var input = wrapper.find(".qd-sq-quantity");
      wrapper.find(".qd-ssg-buy-button").click(function () {
        var hasQty = false;
        input.each(function () {
          if (($(this).val() || 0) > 0) {
            hasQty = true;
            return false;
          }
        });
        if (!hasQty) alert("Por favoir, insira as quantidades desejadas");
        else wrapper.find(".skuList .buy-button").click();
      });
    },
    calcFreight: function () {
      var elem = $("#calculoFrete");
      $(".product-shipping .calc-freight").bind("click", function () {
        if (elem.children().length < 1) {
          ShippingValue();
          elem.fadeToggle("fast", "linear");
        } else elem.fadeToggle("fast", "linear");
      });
    },
    productSmartQuantity: function () {
      $(".product-sku-single-wrapper")
        .addClass("qd-smart-quantity-on")
        .QD_smartQuantity({
          buyButton: ".buy-button",
          qttInput: ".qd-sq-quantity",
          btnMore: ".qd-sq-more",
          btnMinus: ".qd-sq-minus",
        });
    },
    productBuyButton: function () {
      $(".qd_cart_auto").QD_buyButton({
        buyButton:
          ".product-sku-single-wrapper .buy-button, .product-sku-selection-wrapper .buy-button",
      });
    },
    setSkuExibition: function () {
      if (skuJson.skus.length == 1) {
        return $("body").addClass("qd-sku-single-layout");
      }
      $("body").addClass("qd-sku-grid-layout");
    },
    productButtonViewPriceStore: function () {
      $(".product-btn-see-price .btn-visualize").click(function (evt) {
        evt.preventDefault();
        window.location.host = window.location.host
          .replace("catalogo.centerb2b", "www.centerb2b")
          .replace("centerpartscatalogo.vtex", "centerparts.vtex");
      });
    },
    productListCallBuyButton: function () {
      $(".qd_cart_auto").QD_buyButton({
        buyButton: ".product-sku-rich-selection .skuList .buy-button",
      });
    },
    productListSkuQuantity: function () {
      var htmlSkuQuantity =
        '<div class="amount product-sku-single-wrapper"> <div class="qd-smart-quantity"> <a href="#" class="qd-add-btn qd-sq-minus qd-sq-inactive"> <i class="fa fa-minus-circle"></i> </a> <input type="tel" class="form-control input-type-text qd-sq-quantity" /> <a href="#" class="qd-add-btn qd-sq-more"> <i class="fa fa-plus-circle"></i> </a> </div> </div>';
      var options = {
        buyButton: ".buy-button",
        qttInput: ".qd-sq-quantity",
        btnMore: ".qd-sq-more",
        btnMinus: ".qd-sq-minus",
        initialValue: 0,
      };
      var skuWrapper = $(".product-sku-rich-selection .skuList");
      skuWrapper.find(".nomeSku").after(htmlSkuQuantity);
      skuWrapper.addClass("qd-smart-quantity-on").QD_smartQuantity(options);
      $(".product-sku-rich-selection").QD_smartSkuTotalizer(options);
      $(".qd-smart-quantity-on").each(function () {
        $t = $(this);
        $t.find(".preco").after('<div class="qd-buy"></div>');
        $(".qd-buy:not('.qd-on')")
          .addClass("qd-on")
          .append($t.find(".buy-button"));
      });
    },
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
    },
  };
  var List = {
    init: function () {
      List.searchHtmlFix();
    },
    ajaxStop: function () {},
    windowOnload: function () {},
    searchHtmlFix: function () {
      if (!$(document.body).is(".giftlist-home ")) return;
      $(".glsearch-result").appendTo(".qd-list-search-result");
    },
  };
  var Institutional = {
    init: function () {
      Institutional.sidebarMenuFontSizeFix();
      Institutional.videoCarousel401();
      Institutional.collapseFAQ();
      Home.callVideoModal();
      Institutional.contactForm();
      Institutional.getTabelaValues();
    },
    ajaxStop: function () {},
    windowOnload: function () {},
    getTabelaValues: function () {
      $.ajax({
        url: "/api/dataentities/BT/search?_fields=cod,installments,average,minValue",
        type: "GET",
        dataType: "json",
        cache: false,
        headers: {
          Accept: "application/vnd.vtex.ds.v10+json",
          "REST-Range": "resources=0-99",
        },
        success: function (data) {
          Institutional.tabelaDescontos(data);
        },
      });
    },
    tabelaDescontos: function (table) {
      var divCheck, divEmpty;
      (divCheck = '<td class="centralizax"> <p>X</p> </td>'),
        (divEmpty = "<td>&nbsp;</td>");
      table.sort(function (a, b) {
        return parseFloat(a.minValue) > parseFloat(b.minValue) ? 1 : -1;
      });
      table.map(function (item) {
        $("#cp-site-tebela-boletos tbody").append(
          "<tr>" +
            '<td class="center-bold">' +
            item.cod +
            "</td>" +
            "<td>" +
            item.installments +
            "</td>" +
            "<td>" +
            item.average +
            "</td>" +
            (parseFloat(item.minValue) >= 350 ? divCheck : divEmpty) +
            (parseFloat(item.minValue) > 500 ? divCheck : divEmpty) +
            (parseFloat(item.minValue) > 750 ? divCheck : divEmpty) +
            (parseFloat(item.minValue) > 1e3 ? divCheck : divEmpty) +
            (parseFloat(item.minValue) > 1350 ? divCheck : divEmpty) +
            (parseFloat(item.minValue) > 1700 ? divCheck : divEmpty) +
            (parseFloat(item.minValue) > 2800 ? divCheck : divEmpty) +
            (parseFloat(item.minValue) > 3500 ? divCheck : divEmpty) +
            (parseFloat(item.minValue) > 5e3 ? divCheck : divEmpty) +
            (parseFloat(item.minValue) > 8e3 ? divCheck : divEmpty) +
            (parseFloat(item.minValue) > 12e3 ? divCheck : divEmpty) +
            (parseFloat(item.minValue) > 15e3 ? divCheck : divEmpty) +
            "</tr>"
        );
      });
    },
    sidebarMenuFontSizeFix: function () {
      $(".institucionalSideMenu a, .institucionalSideMenu p").each(function () {
        $(this).text($(this).text().toLowerCase());
      });
    },
    videoCarousel401: function () {
      $(".video-wrapper-qd-v1-carousel").slick({
        prevArrow:
          '<button type="button" class="slick-prev slick-arrow" title="Anterior"><i class="fa fa-chevron-left" aria-hidden="true"></i></button>',
        nextArrow:
          '<button type="button" class="slick-next slick-arrow" title="Próximo"><i class="fa fa-chevron-right" aria-hidden="true"></i></button>',
        infinite: true,
        slidesToShow: 2,
        slidesToScroll: 1,
      });
    },
    collapseFAQ: function () {
      var title = $("h3");
      title.each(function () {
        $(this).click(function () {
          $(this).nextUntil(title).toggle("fast");
        });
      });
    },
    contactForm: function () {
      var form = $(".form-contact");
      form.find("#qd_form_phone").mask("(00) 0000-00009");
      form.validate({
        rules: {
          email: {
            email: true,
          },
        },
        submitHandler: function (form) {
          var $form = $(form);
          if (!$form.valid()) return;
          (function () {
            var submitWrapper = $form
              .find("[type=submit]")
              .parent()
              .addClass("qd-loading");
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
                  url: "/api/dataentities/AT/documents",
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
                    fullName: $form.find("#qd_form_name").val() || null,
                    message: ($form.find("#qd_form_msg").val() || "").replace(
                      /(?:\r\n|\r|\n)/g,
                      "<br />"
                    ),
                    subject: $form.find("#qd_form_subject").val() || null,
                  }),
                  success: function (data) {
                    $form.find(".form-succes").removeClass("hide");
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
  };
  var Orders = {
    init: function () {
      Orders.bootstrapCssFix();
      Orders.addInstitutionalClass();
    },
    ajaxStop: function () {},
    windowOnload: function () {},
    bootstrapCssFix: function () {
      var styleSheets = document.styleSheets;
      for (var i = 0; i < styleSheets.length; i++) {
        if (
          (styleSheets[i].href || "").indexOf(
            "io.vtex.com.br/front-libs/bootstrap/2.3.2/css/bootstrap.min.css"
          ) > -1
        ) {
          styleSheets[i].disabled = true;
          break;
        }
      }
    },
    addInstitutionalClass: function () {
      $("body").addClass("institucional");
    },
  };
  var Partners = {
    init: function () {},
    ajaxStop: function () {},
    windowOnload: function () {},
  };
} catch (err) {
  if (
    typeof console !== "undefined" &&
    typeof console.error === "function" &&
    typeof console.info === "function"
  ) {
    console.info("Houve um erro nos objetos, informações abaixo.");
    console.error(err);
  }
}
try {
  (function () {
    var body, ajaxStop, windowLoad;
    windowLoad = function () {
      Common.windowOnload();
      if (body.filter(".home").length > 0) Home.windowOnload();
      else if (body.filter(".departamento, .categoria").length > 0)
        Departament.windowOnload();
      else if (body.filter(".resultado-busca").length > 0)
        Search.windowOnload();
      else if (body.filter(".produto").length > 0) Product.windowOnload();
      else if (body.filter(".listas").length > 0) List.windowOnload();
      else if (body.filter(".institucional").length > 0)
        Institutional.windowOnload();
      else if (body.filter(".orders").length > 0) Orders.windowOnload();
      else if (body.filter(".partners").length > 0) Partners.windowOnload();
    };
    ajaxStop = function () {
      Common.ajaxStop();
      if (body.filter(".home").length > 0) Home.ajaxStop();
      else if (body.filter(".departamento, .categoria").length > 0)
        Departament.ajaxStop();
      else if (body.filter(".resultado-busca").length > 0) Search.ajaxStop();
      else if (body.filter(".produto").length > 0) Product.ajaxStop();
      else if (body.filter(".listas").length > 0) List.ajaxStop();
      else if (body.filter(".institucional").length > 0)
        Institutional.ajaxStop();
      else if (body.filter(".orders").length > 0) Orders.ajaxStop();
      else if (body.filter(".partners").length > 0) Partners.ajaxStop();
    };
    $(function () {
      body = $("body");
      Common.init();
      if (body.filter(".home").length > 0) Home.init();
      else if (body.filter(".departamento, .categoria").length > 0)
        Departament.init();
      else if (body.filter(".resultado-busca").length > 0) Search.init();
      else if (body.filter(".produto").length > 0) Product.init();
      else if (body.filter(".listas").length > 0) List.init();
      else if (body.filter(".institucional").length > 0) Institutional.init();
      else if (body.filter(".orders").length > 0) Orders.init();
      else if (body.filter(".partners").length > 0) Partners.init();
      $(document).ajaxStop(ajaxStop);
      $(window).load(windowLoad);
      body.addClass("jsFullLoaded");
    });
  })();
} catch (err) {
  if (
    typeof console !== "undefined" &&
    typeof console.error === "function" &&
    typeof console.info === "function"
  ) {
    $("body").addClass("jsFullLoaded jsFullLoadedError");
    console.info("Houve um erro ao iniciar os objetos, informações abaixo.");
    console.error(err);
  }
}
$(window).load(function () {
  var a = $(".fb-comments");
  a.length &&
    a.attr(
      "data-href",
      document.location.href.split("#").shift().split("?").shift()
    );
  $("#fb-root").length || $("body").append('<div id="fb-root"></div>');
  if (
    $("script[src*='connect.facebook.net/pt_BR/sdk.js']").filter(
      "[src*='sdk.js']"
    ).length
  )
    "undefined" !== typeof FB &&
      "undefined" !== typeof FB.XFBML &&
      FB.XFBML.parse();
  else {
    a = $("meta[property='fb:app_id']").attr("content") || !1;
    var b,
      c = document.getElementsByTagName("script")[0];
    document.getElementById("facebook-jssdk") ||
      ((b = document.createElement("script")),
      (b.id = "facebook-jssdk"),
      (b.src =
        "//connect.facebook.net/pt_BR/sdk.js#xfbml=1&version=v2.3" +
        (a ? "&appId=" + a : "")),
      c.parentNode.insertBefore(b, c));
  }
});
(function () {
  var b = jQuery;
  if ("function" !== typeof b.fn.simpleCart) {
    b(function () {
      var b = vtexjs.checkout.getOrderForm;
      vtexjs.checkout.getOrderForm = function () {
        return b.call();
      };
    });
    try {
      window.QuatroDigital_simpleCart = window.QuatroDigital_simpleCart || {};
      window.QuatroDigital_simpleCart.ajaxStopOn = !1;
      b.fn.simpleCart = function (c, n, h) {
        var d, k, g, f, l, p, q, r, m;
        k = function (a, b) {
          if ("object" === typeof console) {
            var e = "object" === typeof a;
            "undefined" !== typeof b && "alerta" === b.toLowerCase()
              ? e
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
              : "undefined" !== typeof b && "info" === b.toLowerCase()
              ? e
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
              : e
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
        d = b(this);
        "object" === typeof c
          ? (n = c)
          : ((c = c || !1), (d = d.add(b.QD_simpleCart.elements)));
        if (!d.length) return d;
        b.QD_simpleCart.elements = b.QD_simpleCart.elements.add(d);
        h = "undefined" === typeof h ? !1 : h;
        f = b.extend(
          {},
          {
            cartQtt: ".qd_cart_qtt",
            cartTotal: ".qd_cart_total",
            itemsText: ".qd_items_text",
            currencySymbol: "R$ ",
            showQuantityByItems: !0,
            smartCheckout: !0,
            callback: function () {},
          },
          n
        );
        g = b("");
        d.each(function () {
          var a = b(this);
          a.data("qd_simpleCartOpts") || a.data("qd_simpleCartOpts", f);
        });
        m = function (a) {
          window._QuatroDigital_CartData = window._QuatroDigital_CartData || {};
          for (var b = 0, e = 0, c = 0; c < a.totalizers.length; c++)
            "Shipping" == a.totalizers[c].id && (e += a.totalizers[c].value),
              (b += a.totalizers[c].value);
          window._QuatroDigital_CartData.total =
            f.currencySymbol + qd_number_format(b / 100, 2, ",", ".");
          window._QuatroDigital_CartData.shipping =
            f.currencySymbol + qd_number_format(e / 100, 2, ",", ".");
          window._QuatroDigital_CartData.allTotal =
            f.currencySymbol + qd_number_format((b + e) / 100, 2, ",", ".");
          window._QuatroDigital_CartData.qtt = 0;
          if (f.showQuantityByItems)
            for (c = 0; c < a.items.length; c++)
              window._QuatroDigital_CartData.qtt += a.items[c].quantity;
          else window._QuatroDigital_CartData.qtt = a.items.length || 0;
          try {
            window._QuatroDigital_CartData.callback &&
              window._QuatroDigital_CartData.callback.fire &&
              window._QuatroDigital_CartData.callback.fire();
          } catch (d) {
            k("Problemas com o callback do Smart Cart");
          }
          r(g);
        };
        l = function (a, b) {
          1 === a
            ? b.hide().filter(".singular").show()
            : b.hide().filter(".plural").show();
        };
        q = function (a) {
          1 > a ? d.addClass("qd-emptyCart") : d.removeClass("qd-emptyCart");
        };
        p = function (a, b) {
          var c;
          c = parseInt(window._QuatroDigital_CartData.qtt, 10);
          b.$this.show();
          isNaN(c) &&
            (k(
              "O valor obtido para calcular o plural/singular não é um número! O valor será definido para 0.",
              "alerta"
            ),
            (c = 0));
          b.cartTotalE.html(window._QuatroDigital_CartData.total);
          b.cartQttE.html(c);
          l(c, b.itemsTextE);
          q(c);
        };
        r = function (a) {
          d.each(function () {
            var d = {},
              e;
            e = b(this);
            c &&
              e.data("qd_simpleCartOpts") &&
              b.extend(f, e.data("qd_simpleCartOpts"));
            d.$this = e;
            d.cartQttE = e.find(f.cartQtt) || g;
            d.cartTotalE = e.find(f.cartTotal) || g;
            d.itemsTextE = e.find(f.itemsText) || g;
            d.emptyElem = e.find(f.emptyCart) || g;
            p(a, d);
            e.addClass("qd-sc-populated");
          });
        };
        (function () {
          if (f.smartCheckout) {
            window._QuatroDigital_DropDown =
              window._QuatroDigital_DropDown || {};
            if (
              "undefined" !==
                typeof window._QuatroDigital_DropDown.getOrderForm &&
              (h ? h : !c)
            )
              return m(window._QuatroDigital_DropDown.getOrderForm);
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
              else return k("Não foi encontrada a biblioteca VTEX.js");
            b.QD_checkoutQueue(["items", "totalizers", "shippingData"], {
              done: function (a) {
                m(a);
                window._QuatroDigital_DropDown.getOrderForm = a;
              },
              fail: function (a) {
                k(["Não foi possível obter os dados para o carrinho.", a]);
              },
            });
          } else alert("Esta é uma função descontinuada =/");
        })();
        f.callback();
        b(window).trigger("simpleCartCallback.quatro_digital");
        return d;
      };
      b.QD_simpleCart = {
        elements: b(""),
      };
      b(function () {
        var c;
        "function" === typeof window.ajaxRequestbuyButtonAsynchronous &&
          ((c = window.ajaxRequestbuyButtonAsynchronous),
          (window.ajaxRequestbuyButtonAsynchronous = function (l, h, d, k, g) {
            c.call(this, l, h, d, k, function () {
              "function" === typeof g && g();
              b.QD_simpleCart.elements.each(function () {
                var c;
                c = b(this);
                c.simpleCart(c.data("qd_simpleCartOpts"));
              });
            });
          }));
      });
      var l = window.ReloadItemsCart || void 0;
      window.ReloadItemsCart = function (c) {
        b.fn.simpleCart(!0);
        "function" === typeof l ? l.call(this, c) : alert(c);
      };
      b(function () {
        var c = b(".qd_cart_auto");
        c.length && c.simpleCart();
      });
      b(function () {
        b(window).bind(
          "productAddedToCart minicartUpdated.vtex cartProductAdded.vtex",
          function () {
            b.fn.simpleCart(!0);
          }
        );
      });
    } catch (c) {
      "undefined" !== typeof console &&
        "function" === typeof console.error &&
        console.error("Oooops! ", c);
    }
  }
})();
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
          "Não foi encontrada a biblioteca VTEX.js. Este componente para por aqui, a força não esta mais contigo neste jornada! Para resolver isto inclua a biblioteca VTEX.js"
        );
    var d = $.extend(
        {
          done: function () {},
          fail: function () {},
        },
        c
      ),
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
(function (a) {
  "function" !== typeof a.fn.QD_scroll &&
    (a.fn.QD_scroll = function (d, b) {
      var c;
      b = b || 100;
      window.QuatroDigital_scroll = window.QuatroDigital_scroll || {};
      window.QuatroDigital_scroll.scrollTop = null;
      window.QuatroDigital_scroll.lastScrollTop = null;
      a(this).scroll(function () {
        c = this;
        window.QuatroDigital_scroll.scrollTop = a(window).scrollTop();
      });
      (function () {
        window.QuatroDigital_scroll.interval = setInterval(function () {
          window.QuatroDigital_scroll.lastScrollTop !==
            window.QuatroDigital_scroll.scrollTop &&
            (null !== window.QuatroDigital_scroll.scrollTop &&
              d.call(c, window.QuatroDigital_scroll.scrollTop),
            (window.QuatroDigital_scroll.lastScrollTop =
              window.QuatroDigital_scroll.scrollTop));
        }, b);
      })();
    });
})(jQuery);
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
    c.cookie(
      a,
      "",
      c.extend({}, e, {
        expires: -1,
      })
    );
    return !c.cookie(a);
  };
});
(function () {
  var a, h, g;
  a = jQuery;
  g = {
    cookieName: "Nome_Padrao",
    closeLimit: 2,
    expireDays: 365,
    path: "/",
    close: "[class*=close]",
    show: function (a) {
      a.slideDown();
    },
    hide: function (a) {
      a.slideUp();
    },
    callback: function () {},
    exceededLimitCallback: function () {},
    closeCallback: function () {},
  };
  var k = function (a, c) {
    if ("object" === typeof console) {
      var e;
      "object" === typeof a
        ? (a.unshift("[Cookie Functions]\n"), (e = a))
        : (e = ["[Cookie Functions]\n" + a]);
      "undefined" === typeof c ||
      ("alerta" !== c.toLowerCase() && "aviso" !== c.toLowerCase())
        ? "undefined" !== typeof c && "info" === c.toLowerCase()
          ? console.info.apply(console, e)
          : console.error.apply(console, e)
        : console.warn.apply(console, e);
    }
  };
  a.QD_cookieFn = function (f) {
    if ("function" !== typeof a.cookie)
      return k(
        "Aeeeee irmãããooooo!\nEsta faltando o plugin $.cookie mew. Chama ele na página, vlw!"
      );
    var c = function (d, b) {
        var c = a.cookie("qdCookieFn_" + b.cookieName);
        if ("undefined" !== typeof c && c >= b.closeLimit)
          return b.exceededLimitCallback();
        b.show(d);
        d.trigger("QuatroDigital.cf_show");
        a(window).on("qdNewsSuccessCallback", function (a, c) {
          d.trigger("QuatroDigital.qdcf_applyLimit");
          b.show(d);
          d.trigger("QuatroDigital.cf_hide");
        });
        b.callback();
        d.trigger("QuatroDigital.cf_callback");
      },
      e = function (a, b) {
        a.find(b.close)
          .not(".qd-cookie-on")
          .addClass("qd-cookie-on")
          .bind("click", function () {
            a.trigger("QuatroDigital.cf_close");
            a.slideUp(function () {
              b.closeCallback();
            });
          });
      },
      g = function (c, b) {
        c.bind("QuatroDigital.cf_close", function () {
          "undefined" === typeof a.cookie("qdCookieFn_" + b.cookieName)
            ? a.cookie("qdCookieFn_" + b.cookieName, 1, {
                expires: b.expireDays,
                path: b.path,
              })
            : a.cookie(
                "qdCookieFn_" + b.cookieName,
                (parseInt(a.cookie("qdCookieFn_" + b.cookieName), 10) || 0) + 1,
                {
                  expires: b.expireDays,
                  path: b.path,
                }
              );
        });
        c.bind("QuatroDigital.qdcf_applyLimit", function () {
          a.cookie("qdCookieFn_" + b.cookieName, b.closeLimit, {
            expires: b.expireDays,
            path: b.path,
          });
        });
      };
    f.each(function () {
      var d = a(this),
        b;
      try {
        if ((b = d.attr("data-qd-cookie"))) var f = a.parseJSON("{" + b + "}");
      } catch (l) {
        k(
          [
            'Aeee irmãooo!\nNão consegui converter as suas opções do atributo [data-qd-cookie], verifique se você escreveu no formato esperado que é (respeitando-se todas as aspas simples e duplas):\n<div data-qd-cookie=\'"chave":"valor","chave2":"valor2"\' />.',
            "\n\nDetalhes do erro: " + l.message,
          ],
          "alerta"
        ),
          (f = {});
      }
      b = a.extend({}, h, f);
      g(d, b);
      c(d, b);
      e(d, b);
    });
  };
  a.fn.QD_cookieFn = function (f) {
    var c = a(this);
    h = a.extend(!0, {}, g, f);
    c.QD_cookieFn = new a.QD_cookieFn(c);
    return c;
  };
  a(function () {
    a("[data-qd-cookie]").QD_cookieFn();
  });
})();
(function () {
  var f = jQuery;
  if ("function" !== typeof f.fn.QD_news) {
    var t = {
      defaultName: "Digite seu nome...",
      defaultEmail: "Digite seu e-mail...",
      nameField: ".qd_news_name",
      checkNameFieldIsVisible: !0,
      emailField: ".qd_news_email",
      btn: ".qd_news_button",
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
      platform: "VTEX",
      allowSubmit: function () {
        return !0;
      },
      successCallback: function () {},
      submitCallback: function (f, l) {},
    };
    f.fn.QD_news = function (r) {
      var l = function (a, d) {
          if (
            "object" === typeof console &&
            "function" === typeof console.error &&
            "function" === typeof console.info &&
            "function" === typeof console.warn
          ) {
            var g;
            "object" === typeof a
              ? (a.unshift("[QD News]\n"), (g = a))
              : (g = ["[QD News]\n" + a]);
            if (
              "undefined" === typeof d ||
              ("alerta" !== d.toLowerCase() && "aviso" !== d.toLowerCase())
            )
              if ("undefined" !== typeof d && "info" === d.toLowerCase())
                try {
                  console.info.apply(console, g);
                } catch (b) {
                  console.info(g.join("\n"));
                }
              else
                try {
                  console.error.apply(console, g);
                } catch (f) {
                  console.error(g.join("\n"));
                }
            else
              try {
                console.warn.apply(console, g);
              } catch (e) {
                console.warn(g.join("\n"));
              }
          }
        },
        h = f(this);
      if (!h.length) return h;
      var a = f.extend({}, t, r);
      a.showInPopup || (a.validationMethod = "div");
      null !== a.animation
        ? (a.validationMethod = "animateField")
        : "animateField" == a.validationMethod && (a.animation = "leftRight");
      if (
        "popup" == a.validationMethod &&
        "function" !== typeof f.fn.vtexPopUp2
      )
        return (
          l("O popUp2 não foi encontrado. Adicione o Plugin de PopUp2."), h
        );
      var q = function (f) {
        var d, g, b;
        g = 0;
        d = function () {
          f.animate(
            {
              left: "-=" + a.animateDistance,
            },
            a.animateSpeed,
            function () {
              f.animate(
                {
                  left: "+=" + a.animateDistance,
                },
                a.animateSpeed,
                function () {
                  g < a.animateRepeat && d();
                  g++;
                }
              );
            }
          );
        };
        b = function () {
          f.fadeTo(a.animateSpeed, 0.2, function () {
            f.fadeTo(a.animateSpeed, 1, function () {
              g < a.animateRepeat && b();
              g++;
            });
          });
        };
        f.stop(!0, !0);
        "leftRight" == a.animation ? d() : "blink" == a.animation && b();
      };
      h.each(function () {
        var h,
          d,
          g,
          b = f(this),
          k = b.find(a.nameField),
          e = b.find(a.emailField),
          m = b.find(a.btn);
        "animateField" != a.validationMethod &&
          ((d = b.find(a.elementError)), (g = b.find(a.elementSuccess)));
        1 > k.length &&
          a.checkNameExist &&
          l(
            "Campo de nome, não encontrado (" +
              k.selector +
              "). Será atribuido um valor padrão.",
            "info"
          );
        if (1 > e.length)
          return l("Campo de e-mail, não encontrado (" + e.selector + ")"), b;
        if (1 > m.length)
          return l("Botão de envio, não encontrado (" + m.selector + ")"), b;
        if (
          "animateField" != a.validationMethod &&
          (1 > g.length || 1 > d.length)
        )
          return (
            l(
              "A(s) mensagem(ns) de erro e/ou sucesso esta(m) faltando \n (" +
                g.selector +
                ", " +
                d.selector +
                ")"
            ),
            b
          );
        a.setDefaultName &&
          k.is("input[type=text], textarea") &&
          k.val(a.defaultName);
        e.val(a.defaultEmail);
        (function () {
          if (a.checkNameExist) {
            if (a.checkNameFieldIsVisible) {
              var c = k.filter(":visible");
              if (!c.length) return;
            } else c = k;
            var b = c.val();
            c.is("input:text, textarea") &&
              c.bind({
                focus: function () {
                  c.val() != b ||
                    (0 !== c.val().search(a.defaultName.substr(0, 6)) &&
                      !a.setDefaultName) ||
                    c.val("");
                },
                blur: function () {
                  "" === c.val() && c.val(b);
                },
              });
          }
        })();
        (function () {
          var c;
          c = e.val();
          e.bind({
            focus: function () {
              e.val() == c &&
                0 === e.val().search(a.defaultEmail.substr(0, 6)) &&
                e.val("");
            },
            blur: function () {
              "" === e.val() && e.val(c);
            },
          });
        })();
        h = function () {
          var c, e, h, k;
          e = (c = b
            .find(a.nameField)
            .filter("input[type=text],select,textarea")
            .val())
            ? c
            : b
                .find(a.nameField)
                .filter("input[type=radio], input[type=checkbox]").length
            ? b
                .find(a.nameField)
                .filter(
                  "input[type=radio]:checked, input[type=checkbox]:checked"
                )
                .val() || ""
            : (c = b.find(a.nameField).attr(a.getAttr))
            ? c
            : (c = b.find(a.nameField).text())
            ? c
            : (c = b
                .find(a.nameField)
                .find(".box-banner img:first")
                .attr("alt"))
            ? c
            : "Nome_Padrao";
          c = (b.find(a.emailField).val() || "").trim();
          h = b.find(a.nameField).is(":visible");
          h = a.validateName
            ? (1 > e.length || 0 === e.search(a.defaultName.substr(0, 6))) &&
              (a.checkNameExist || h ? h : !0)
            : !1;
          k =
            0 >
            c.search(/^[a-z0-9\_\-\.\+]+@[a-z0-9\_\-]+(\.[a-z0-9\_\-]{2,})+$/i);
          if (h || k)
            "animateField" == a.validationMethod
              ? (h && q(b.find(a.nameField)), k && q(b.find(a.emailField)))
              : "popup" == a.validationMethod
              ? d.vtexPopUp2({
                  popupType: "newsletter",
                  popupClass: "popupNewsletterError",
                })
              : (d.slideDown().bind("click", function () {
                  f(this).slideUp();
                }),
                setTimeout(function () {
                  d.slideUp();
                }, 1800));
          else if (a.allowSubmit()) {
            m.attr("disabled", "disabled");
            var n = {
              postData: {
                newsletterClientEmail: c,
                newsletterClientName: a.defaultName == e ? "-" : e,
                newsInternalCampaign: "newsletter:opt-in",
                newsInternalPage: (document.location.pathname || "/").replace(
                  /\//g,
                  "_"
                ),
                newsInternalPart: "newsletter",
              },
              button: m,
              wrapper: b,
            };
            "linx" === a.platform &&
              ((n.postData.nome = n.postData.newsletterClientName),
              (n.postData.email = n.postData.newsletterClientEmail));
            f.ajax({
              url:
                "linx" === a.platform
                  ? "/newsletter.aspx"
                  : "/no-cache/Newsletter.aspx",
              type: "linx" === a.platform ? "GET" : "POST",
              data: n.postData,
              success: function (c) {
                var e, h, d;
                m.removeAttr("disabled");
                if (
                  "linx" === a.platform &&
                  !(
                    -1 < c.indexOf(" com sucesso.") ||
                    -1 < c.indexOf(" cadastrado.")
                  )
                )
                  return alert(c);
                "popup" == a.validationMethod
                  ? g.vtexPopUp2({
                      popupType: "newsletter",
                      popupClass: "popupNewsletterSuccess",
                    })
                  : "animateField" != a.validationMethod &&
                    g.slideDown().bind("click", function () {
                      f(this).slideUp();
                    });
                d = b.find(a.emailField);
                a.setDefaultName &&
                  b.find(a.nameField).is("input:text, textarea") &&
                  b.find(a.nameField).val(a.defaultName);
                e = function () {
                  d.val(a.defaultEmail);
                };
                "animateField" == a.validationMethod
                  ? (d.val(
                      b.find(a.animateFieldSuccess).val() || "Obrigado!!!"
                    ),
                    d.addClass("vtexNewsSuccess"),
                    (h = setTimeout(function () {
                      d.removeClass("vtexNewsSuccess");
                      e();
                      d.unbind("focus.vtexNews");
                    }, a.timeHideSuccessMsg)),
                    d.bind("focus.vtexNews", function () {
                      d.removeClass("vtexNewsSuccess");
                      clearTimeout(h);
                      f(this).val("");
                      f(this).unbind("focus.vtexNews");
                    }))
                  : e();
                a.successCallback(n);
                f(window).trigger("qdNewsSuccessCallback", n);
              },
            });
            a.submitCallback(c, e);
          } else
            l(
              "Os dados não foram enviados pois o parametro 'allowSubmit' não retornou 'true'",
              "info"
            );
        };
        var p = function (a) {
          13 == (a.keyCode ? a.keyCode : a.which) && (a.preventDefault(), h());
        };
        k.filter("input:text, textarea").bind("keydown", p);
        e.bind("keydown", p);
        p = m.getParent("form");
        p.length
          ? p.submit(function (a) {
              a.preventDefault();
              h();
            })
          : m.bind("click.qd_news", function () {
              h();
            });
      });
      return h;
    };
    f(function () {
      f(".qd_news_auto").QD_news();
    });
  }
})();
eval(
  (function (p, a, c, k, e, d) {
    e = function (c) {
      return (
        (c < a ? "" : e(parseInt(c / a))) +
        ((c = c % a) > 35 ? String.fromCharCode(c + 29) : c.toString(36))
      );
    };
    if (!"".replace(/^/, String)) {
      while (c--) {
        d[e(c)] = k[c] || e(c);
      }
      k = [
        function (e) {
          return d[e];
        },
      ];
      e = function () {
        return "\\w+";
      };
      c = 1;
    }
    while (c--) {
      if (k[c]) {
        p = p.replace(new RegExp("\\b" + e(c) + "\\b", "g"), k[c]);
      }
    }
    return p;
  })(
    '"r"!==x 1s.20.U&&(1s.20.U=r(){v 10.1m(/^\\s+|\\s+$/g,"")});(r(m){w c=2j;B("r"!==x c.1M.1d){w h,k,d;h=r(a,d){B("1t"===x I){w c="1t"===x a;"1T"!==x d&&"2g"===d.14()?c?I.1X("[M K - R Q O]\\n",a[0],a[1],a[2],a[3],a[4],a[5],a[6],a[7]):I.1X("[M K - R Q O]\\n"+a):"1T"!==x d&&"1r"===d.14()?c?I.1r("[M K - R Q O]\\n",a[0],a[1],a[2],a[3],a[4],a[5],a[6],a[7]):I.1r("[M K - R Q O]\\n"+a):c?I.1j("[M K - R Q O]\\n",a[0],a[1],a[2],a[3],a[4],a[5],a[6],a[7]):I.1j("[M K - R Q O]\\n"+a)}};k={1R:r(a){v a.1L(".2l").2m().2n().2o(".").2s(0,-1).1o(".")},1g:19,1k:19,1v:1P,1I:1P,1p:r(){},1q:r(){}};c.1d=r(a){w g=r(a){w c=d.1R(a);B("1b"!==x c&&"1t"!==x c||!c.T)v h(["N\\W 1i 2a 2c 2M 1S 2W 2U 1e: ",a]);w e=a.1c("1O-1Q");B(19!=d.1g)e=d.1g;11 B("1b"===x e&&""!==e)e=e.U();11 v h(["N\\W 1i 1Y\\1Z 1W o 1V 22 23\\1x\\W, 1e: ",a]);w b=a.1c("1O-2w-2B");B(19!=d.1k)b=d.1k;11 B("1b"===x b&&""!==b)b=b.U();11 v h(["N\\W 1i 1Y\\1Z 1W o 1V 22 23\\1x\\W, 1e: ",a]);a.V("H-1K");n(k(c,e),b,a,r(c){p(a,c)})},k=r(a,c){B("1b"===x a)v"&1H=1w"+c+":"+a;w d="",b;1G(b 1D a)"r"!==x a[b]&&a[b].T&&(d=d+"&1H=1w"+c+":"+a[b]);v d},n=r(a,g,e,b){w l=r(a){w c={j:"2E%8%X%8%q%8%i",2D:"2F%8%q%8%i",2G:"2I%8%D%8%q%8%i",2H:"2C%8%G%8%q%8%i",2v:"2u%8%F%8%q%8%i",2x:"c-E%8%D%8%q%8%i",C:"-E%8%G%8%q%8%i","C-":"E%8%F%8%q%8%i","A%8%":"X%8%D%8%q%8%i","A%8%2":"2y%8%G%8%q%8%i","A%8%25":"2A%8%F%8%q%8%i","A%8%1y":"2z%8%q%8%i",2J:"2K%8%q%8%i",2V:"2X%8%D%8%q%8%i",2Z:"E%8%G%8%q%8%i",2Y:"2T%8%F%8%q%8%i","C-2S":"1C%8%D%8%q%8%i","C-2N":"2L%8%G%8%q%8%i","C-2t":"2O%8%F%8%q%8%i","A%8%2P":"2R%8%D%8%q%8%i","A%8%2Q":"30%8%G%8%q%8%i","A%8%2q":"1C%8%F%8%q%8%i","A%8%2b":"29%8%q%8%i","2d%1a":"2%q%8%i","S%8%25":"28%8%q%8%i","S%8%1y":"2e%8%q%8%i","S%8%24":"27%8%q%8%i","C-S%25":"P%D%8%q%8%i","C-S%1a":"2%G%8%q%8%i","C-S%8":"%F%8%q%8%i","A%8%1n%":"8%D%8%q%8%i","A%8%1n%2":"1u%G%8%q%8%i","A%8%1n%25":"P%F%8%q%8%i","A%8%2p%8%q%25":"P%i","2f%1a":"2%q%8%i","E%8%D%8%2":"2r%8%i","E%8%G%1a":"2%q%8%i","E%8%F%25":"P%q%8%i","C-E%8%D%2":"1u%q%8%i","C-E%8%2h":"n%8%q%8%i","C-E%8%2i":"2k%8%q%8%i","A%8%X%8%D":"%8%q%8%i","A%8%X%8%3l":"3U%8%q%8%i","A%8%X%8%3T":"3V%8%q%8%i"};v r(a){w d,b,f,e;b=r(a){v a};f=["a","e",18,"m","s","k","d","u","g","h","a","g","s","t","z","y","o","u","o"];a=a["d"+f[16]+"c"+f[17]+"m"+b(f[1])+"n"+f[13]]["l"+f[18]+"c"+f[0]+"3W"+b("o")+"n"];d=r(a){v 3Y(3X(a.1m(/\\./g,"\\31").1m(/[a-40-Z]/g,r(a){v 1s.3R(("Z">=a?3M:3L)>=(a=a.3N(0)+13)?a:a-26)})))};1G(w g 1D c){B(d(a[[f[9],b("o"),f[12],f[b(13)]].1o("")])===g+c[g]){e="3O"+f[17]+"e";3Q}e="f"+f[0]+"3P"+b(f[1])+""}b=!1;-1<a[[f[12],"e",f[0],"3Z",f[9]].1o("")].21("48%1B%1A%1z%1h%1f%1h%41%44%45%P%46%P%43%1h%1f%1B%1A%1z%42%1f")&&(b=!0);v[e,b]}(a)}(m);B(!47(l[0]))v l[1]?h("\\3S\\3J\\1E \\3h\\J\\3g\\3f\\1F\\J\\1F\\1E \\3e\\J\\3i\\J \\3j\\3m\\3K\\J L\\3k\\J!"):!1;a.T?c.3d({3c:"/35?34="+d.1v+"&33="+g+"&32="+d.1I+"&36=0"+a,37:"3b",3a:r(a){"r"===x b&&b(a);a.U().T||e.V("H-Y-15-39 H-Y-15")},1j:r(a,b,c){h(["38 3n 3o 3D 3C 3B 3A 3E 1S 3F.",a,b,c])}}):e.V("H-Y-15-1Q H-Y-15")},p=r(a,g){w e=c(g),b=c("");e.1L("1N a").1U(r(){w a=c(10);B(!(0>3I.3H.1l.14().21((a.1c("1l")||"").14())))v b=a.3G("1N[3z]").V("H-Y-3y"),a.1c("1l","#"),!1});b.3s(b.1J().3r(b.1J().3q(".3p")));a.3t(e);a.3u("H-1K");a.V("H-3x");"r"===x d.1p&&d.1p(a)};a.1U(r(){g(c(10))});"r"===x d.1q&&d.1q()};c.1M.1d=r(a){w g=c(10);B(!g.T)v g;d=c.3w({},k,a);v 3v c.1d(g)}}})(10);',
    62,
    257,
    "||||||||25C2||||||||||25A8oe||||||||25A8pbz|function||||return|var|typeof|||jjj|if|qrirybc|25A8igrkpbzzrepr|vxrfnxv|25A8igrkpbzzreprfgnoyr|25A8igrkpbzzreprorgn|qd|console|u0391|Digital||Quatro||Data|C2|Cross|Amazing|gbceriraqnvxrfnxv|length|trim|addClass|u00e3o|25A8vxrfnxv|acd||this|else|||toLowerCase|empty||||null|25C|string|attr|QD_amazingCrossData|elemento|82|specificationId|D1|foi|error|shelfTemplateId|href|replace|25A8gbceriraqnvxrfnxv|join|callbackHtml|callback|info|String|object|5C2|pageSize|spec_fct_|u00e7|25A|84|B8|E0|fvbanyvxrfnxv|in|u0472|u2202|for|fq|columns|parent|loading|find|fn|li|data|999|specification|getSearchTerm|de|undefined|each|ID|obter|warn|poss|u00edvel|prototype|indexOf|da|especifica|25A8|||igrkpbzzreprfgnoyr|A8igrkpbzzrepr|bervxrfnxv|encontrado|25A8gbcfnybafg|nenhum|gbcfnybafgbervxrfnxv|8igrkpbzzreprorgn|zvenl|alerta|25A8igrkpbzzreprorg|25A8igrkpbzzreprfgno|jQuery|yr|productReference|hide|text|split|25A8zvenl|25A8gbccebsvf|5A8pbz|slice|gbccebsvffv|xv|vxrfn|shelf|qriryb|5A8vxrfnxv|8gbccebsvffvbanyvxrfnxv|A8vxrfnxv|template|nxv|vx|jj|rfnxv|vxr|vxrf|fnxv|gbccebsvffvba|nyvxrfnxv|vbanyvxrfnxv|termo|gbccebsvff|banyvxrfnxv|25A8gbccebs|25A8gbccebsv|vffvbanyvxrfnxv|gbccebsvf|xrfnxv|no|gbccebsvffvban|busca|yvxrfnxv|gbccebsvffvbanyv|gbccebsvffvbany|ffvbanyvxrfnxv|u00a8|cc|sl|PS|buscapagina|sm|dataType|houve|result|success|html|url|qdAjax|u03a1|u00a1|u2113|u221a|u0ae8|u0aef|u0472J|25A8igrkpbzzrepro|u0abd|um|erro|helperComplement|next|add|prependTo|append|removeClass|new|extend|loaded|selected|layout|os|buscar|tentar|ao|resultados|produto|getParent|location|document|u00c3|u01ac|122|90|charCodeAt|tr|ls|break|fromCharCode|u0e17|25A8igrkpbzzreprfg|rgn|noyr|ti|encodeURIComponent|escape|rc|zA|8F|C5|A1|CF|83d|A1g|eval|qu".split(
      "|"
    ),
    0,
    {}
  )
);
(function ($, r) {
  var h,
    n = Array.prototype.slice,
    t = decodeURIComponent,
    a = $.param,
    j,
    c,
    m,
    y,
    b = ($.bbq = $.bbq || {}),
    s,
    x,
    k,
    e = $.event.special,
    d = "hashchange",
    B = "querystring",
    F = "fragment",
    z = "elemUrlAttr",
    l = "href",
    w = "src",
    p = /^.*\?|#.*$/g,
    u,
    H,
    g,
    i,
    C,
    E = {};
  function G(I) {
    return typeof I === "string";
  }
  function D(J) {
    var I = n.call(arguments, 1);
    return function () {
      return J.apply(this, I.concat(n.call(arguments)));
    };
  }
  function o(I) {
    return I.replace(H, "$2");
  }
  function q(I) {
    return I.replace(/(?:^[^?#]*\?([^#]*).*$)?.*/, "$1");
  }
  function f(K, P, I, L, J) {
    var R, O, N, Q, M;
    if (L !== h) {
      N = I.match(K ? H : /^([^#?]*)\??([^#]*)(#?.*)/);
      M = N[3] || "";
      if (J === 2 && G(L)) {
        O = L.replace(K ? u : p, "");
      } else {
        Q = m(N[2]);
        L = G(L) ? m[K ? F : B](L) : L;
        O = J === 2 ? L : J === 1 ? $.extend({}, L, Q) : $.extend({}, Q, L);
        O = j(O);
        if (K) {
          O = O.replace(g, t);
        }
      }
      R = N[1] + (K ? C : O || !N[1] ? "?" : "") + O + M;
    } else {
      R = P(I !== h ? I : location.href);
    }
    return R;
  }
  a[B] = D(f, 0, q);
  a[F] = c = D(f, 1, o);
  a.sorted = j = function (J, K) {
    var I = [],
      L = {};
    $.each(a(J, K).split("&"), function (P, M) {
      var O = M.replace(/(?:%5B|=).*$/, ""),
        N = L[O];
      if (!N) {
        N = L[O] = [];
        I.push(O);
      }
      N.push(M);
    });
    return $.map(I.sort(), function (M) {
      return L[M];
    }).join("&");
  };
  c.noEscape = function (J) {
    J = J || "";
    var I = $.map(J.split(""), encodeURIComponent);
    g = new RegExp(I.join("|"), "g");
  };
  c.noEscape(",/");
  c.ajaxCrawlable = function (I) {
    if (I !== h) {
      if (I) {
        u = /^.*(?:#!|#)/;
        H = /^([^#]*)(?:#!|#)?(.*)$/;
        C = "#!";
      } else {
        u = /^.*#/;
        H = /^([^#]*)#?(.*)$/;
        C = "#";
      }
      i = !!I;
    }
    return i;
  };
  c.ajaxCrawlable(0);
  $.deparam = m = function (L, I) {
    var K = {},
      J = {
        true: !0,
        false: !1,
        null: null,
      };
    $.each(L.replace(/\+/g, " ").split("&"), function (O, T) {
      var N = T.split("="),
        S = t(N[0]),
        M,
        R = K,
        P = 0,
        U = S.split("]["),
        Q = U.length - 1;
      if (/\[/.test(U[0]) && /\]$/.test(U[Q])) {
        U[Q] = U[Q].replace(/\]$/, "");
        U = U.shift().split("[").concat(U);
        Q = U.length - 1;
      } else {
        Q = 0;
      }
      if (N.length === 2) {
        M = t(N[1]);
        if (I) {
          M =
            M && !isNaN(M) ? +M : M === "undefined" ? h : J[M] !== h ? J[M] : M;
        }
        if (Q) {
          for (; P <= Q; P++) {
            S = U[P] === "" ? R.length : U[P];
            R = R[S] =
              P < Q ? R[S] || (U[P + 1] && isNaN(U[P + 1]) ? {} : []) : M;
          }
        } else {
          if ($.isArray(K[S])) {
            K[S].push(M);
          } else {
            if (K[S] !== h) {
              K[S] = [K[S], M];
            } else {
              K[S] = M;
            }
          }
        }
      } else {
        if (S) {
          K[S] = I ? h : "";
        }
      }
    });
    return K;
  };
  function A(K, I, J) {
    if (I === h || typeof I === "boolean") {
      J = I;
      I = a[K ? F : B]();
    } else {
      I = G(I) ? I.replace(K ? u : p, "") : I;
    }
    return m(I, J);
  }
  m[B] = D(A, 0);
  m[F] = y = D(A, 1);
  $[z] ||
    ($[z] = function (I) {
      return $.extend(E, I);
    })({
      a: l,
      base: l,
      iframe: w,
      img: w,
      input: w,
      form: "action",
      link: l,
      script: w,
    });
  k = $[z];
  function v(L, J, K, I) {
    if (!G(K) && typeof K !== "object") {
      I = K;
      K = J;
      J = h;
    }
    return this.each(function () {
      var O = $(this),
        M = J || k()[(this.nodeName || "").toLowerCase()] || "",
        N = (M && O.attr(M)) || "";
      O.attr(M, a[L](N, K, I));
    });
  }
  $.fn[B] = D(v, B);
  $.fn[F] = D(v, F);
  b.pushState = s = function (L, I) {
    if (G(L) && /^#/.test(L) && I === h) {
      I = 2;
    }
    var K = L !== h,
      J = c(location.href, K ? L : {}, K ? I : 2);
    location.href = J;
  };
  b.getState = x = function (I, J) {
    return I === h || typeof I === "boolean" ? y(I) : y(J)[I];
  };
  b.removeState = function (I) {
    var J = {};
    if (I !== h) {
      J = x();
      $.each($.isArray(I) ? I : arguments, function (L, K) {
        delete J[K];
      });
    }
    s(J, 2);
  };
  e[d] = $.extend(e[d], {
    add: function (I) {
      var K;
      function J(M) {
        var L = (M[F] = c());
        M.getState = function (N, O) {
          return N === h || typeof N === "boolean" ? m(L, N) : m(L, O)[N];
        };
        K.apply(this, arguments);
      }
      if ($.isFunction(I)) {
        K = I;
        return J;
      } else {
        K = I.handler;
        I.handler = J;
      }
    },
  });
})(jQuery, this);
(function ($, e, b) {
  var c = "hashchange",
    h = document,
    f,
    g = $.event.special,
    i = h.documentMode,
    d = "on" + c in e && (i === b || i > 7);
  function a(j) {
    j = j || location.href;
    return "#" + j.replace(/^[^#]*#?(.*)$/, "$1");
  }
  $.fn[c] = function (j) {
    return j ? this.bind(c, j) : this.trigger(c);
  };
  $.fn[c].delay = 50;
  g[c] = $.extend(g[c], {
    setup: function () {
      if (d) {
        return false;
      }
      $(f.start);
    },
    teardown: function () {
      if (d) {
        return false;
      }
      $(f.stop);
    },
  });
  f = (function () {
    var j = {},
      p,
      m = a(),
      k = function (q) {
        return q;
      },
      l = k,
      o = k;
    j.start = function () {
      p || n();
    };
    j.stop = function () {
      p && clearTimeout(p);
      p = b;
    };
    function n() {
      var r = a(),
        q = o(m);
      if (r !== m) {
        l((m = r), q);
        $(e).trigger(c);
      } else {
        if (q !== m) {
          location.href = location.href.replace(/#.*/, "") + q;
        }
      }
      p = setTimeout(n, $.fn[c].delay);
    }
    $.browser.msie &&
      !d &&
      (function () {
        var q, r;
        j.start = function () {
          if (!q) {
            r = $.fn[c].src;
            r = r && r + a();
            q = $('<iframe tabindex="-1" title="empty"/>')
              .hide()
              .one("load", function () {
                r || l(a());
                n();
              })
              .attr("src", r || "javascript:0")
              .insertAfter("body")[0].contentWindow;
            h.onpropertychange = function () {
              try {
                if (event.propertyName === "title") {
                  q.document.title = h.title;
                }
              } catch (s) {}
            };
          }
        };
        j.stop = k;
        o = function () {
          return a(q.location.href);
        };
        l = function (v, s) {
          var u = q.document,
            t = $.fn[c].domain;
          if (v !== s) {
            u.title = h.title;
            u.open();
            t && u.write('<script>document.domain="' + t + '"</script>');
            u.close();
            q.location.hash = v;
          }
        };
      })();
    return j;
  })();
})(jQuery, this);
(function (a) {
  a.fn.getParent = a.fn.closest;
})(jQuery);
(function () {
  function b(a) {
    var b = $("ul.thumbs").not(a);
    a.html(b.html());
    "function" === typeof clickThumbs && clickThumbs();
  }
  "function" !== typeof $.fn.QD_productThumbs &&
    (($.fn.QD_productThumbs = function () {
      var a = $(this);
      return $.extend({}, a, new b(a));
    }),
    $(function () {
      $(".QD-thumbs").QD_productThumbs();
    }));
})();
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
                console.info.apply(console, c);
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
            "Não encontrei os elementos para informar os totais, por isso não irei exibi-los.",
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
(function (u) {
  try {
    var a = jQuery,
      c,
      r = a({}),
      l = function (a, c) {
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
            "undefined" === typeof c ||
            ("alerta" !== c.toLowerCase() && "aviso" !== c.toLowerCase())
          )
            if ("undefined" !== typeof c && "info" === c.toLowerCase())
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
        buyButton: ".productInformationWrapper  a.buy-button",
        buyQtt: "input.buy-in-page-quantity",
        selectSkuMsg: "javascript:",
        autoWatchBuyButton: !0,
        buyIfQuantityZeroed: !1,
        fakeRequest: !1,
        productPageCallback: function (c, f, b) {
          a("body").is(".productQuickView") &&
            ("success" === f
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
    a.QD_buyButton = function (g, f) {
      function b(a) {
        c.isSmartCheckout
          ? a.data("qd-bb-click-active") ||
            (a.data("qd-bb-click-active", 1),
            a.on("click.qd_bb_buy_sc", function (a) {
              if (!c.allowBuyClick()) return !0;
              if (!0 !== m.clickBuySmartCheckout.call(this))
                return a.preventDefault(), !1;
            }))
          : alert("Método descontinuado!");
      }
      function h(e) {
        e = e || a(c.buyButton);
        e.each(function () {
          var d = a(this);
          d.is(".qd-sbb-on") ||
            (d.addClass("qd-sbb-on"),
            (d.is(".btn-add-buy-button-asynchronous") &&
              !d.is(".remove-href")) ||
              d.data("qd-bb-active") ||
              (d.data("qd-bb-active", 1),
              d.children(".qd-bb-productAdded").length ||
                d.append(
                  '<span class="qd-bb-productAdded"><i class="icon-thumbs-up"></i> <span>Produto adicionado</span></span>'
                ),
              d.is(".buy-in-page-button") && c.isProductPage() && p.call(d),
              b(d)));
        });
        c.isProductPage() &&
          !e.length &&
          l(
            "Oooops!\nAparentemente esta é uma página de produto porém não encontrei nenhum botão comprar!\nVerifique se é este mesmo o seletor: '" +
              e.selector +
              "'.",
            "info"
          );
      }
      var k, p, m;
      k = a(g);
      m = this;
      window._Quatro_Digital_dropDown = window._Quatro_Digital_dropDown || {};
      window._QuatroDigital_CartData = window._QuatroDigital_CartData || {};
      m.prodAdd = function (e, d) {
        k.addClass("qd-bb-itemAddCartWrapper qd-bb-lightBoxProdAdd");
        a("body").addClass("qd-bb-lightBoxBodyProdAdd");
        var b = a(c.buyButton)
          .filter("[href='" + (e.attr("href") || "---") + "']")
          .add(e);
        b.addClass("qd-bb-itemAddBuyButtonWrapper");
        setTimeout(function () {
          k.removeClass("qd-bb-itemAddCartWrapper");
          b.removeClass("qd-bb-itemAddBuyButtonWrapper");
        }, c.timeRemoveNewItemClass);
        window._Quatro_Digital_dropDown.getOrderForm = void 0;
        if (
          "undefined" !== typeof f &&
          "function" === typeof f.getCartInfoByUrl
        )
          return (
            c.isSmartCheckout ||
              (l("função descontinuada"), f.getCartInfoByUrl()),
            (window._QuatroDigital_DropDown.getOrderForm = void 0),
            f.getCartInfoByUrl(
              function (d) {
                window._Quatro_Digital_dropDown.getOrderForm = d;
                a.fn.simpleCart(!0, void 0, !0);
              },
              {
                lastSku: d,
              }
            )
          );
        window._Quatro_Digital_dropDown.allowUpdate = !0;
        a.fn.simpleCart(!0);
      };
      (function () {
        if (c.isSmartCheckout && c.autoWatchBuyButton) {
          var e = a(".btn-add-buy-button-asynchronous");
          e.length && h(e);
        }
      })();
      p = function () {
        var e = a(this);
        "undefined" !== typeof e.data("buyButton")
          ? (e.unbind("click"), b(e))
          : (e.bind("mouseenter.qd_bb_buy_sc", function (d) {
              e.unbind("click");
              b(e);
              a(this).unbind(d);
            }),
            a(window).load(function () {
              e.unbind("click");
              b(e);
              e.unbind("mouseenter.qd_bb_buy_sc");
            }));
      };
      m.clickBuySmartCheckout = function () {
        var e = a(this),
          d = e.attr("href") || "";
        if (-1 < d.indexOf(c.selectSkuMsg)) return !0;
        d = d
          .replace(/redirect\=(false|true)/gi, "")
          .replace("?", "?redirect=false&")
          .replace(/\&\&/gi, "&");
        if (c.execDefaultAction(e))
          return (
            e.attr("href", d.replace("redirect=false", "redirect=true")), !0
          );
        d = d.replace(/http.?:/i, "");
        r.queue(function (b) {
          if (!c.buyIfQuantityZeroed && !/(&|\?)qty\=[1-9][0-9]*/gi.test(d))
            return b();
          var f = function (b, f) {
            var g = d.match(/sku\=([0-9]+)/gi),
              h = [],
              k;
            if ("object" === typeof g && null !== g)
              for (var l = g.length - 1; 0 <= l; l--)
                (k = parseInt(g[l].replace(/sku\=/gi, ""))),
                  isNaN(k) || h.push(k);
            c.productPageCallback.call(this, b, f, d);
            m.buyButtonClickCallback.call(this, b, f, d, h);
            m.prodAdd(e, d.split("ku=").pop().split("&").shift());
            "function" === typeof c.asyncCallback && c.asyncCallback.call(this);
            a(window).trigger("productAddedToCart");
            a(window).trigger("cartProductAdded.vtex");
          };
          c.fakeRequest
            ? (f(null, "success"), b())
            : a
                .ajax({
                  url: d,
                  complete: f,
                })
                .always(function () {
                  b();
                });
        });
      };
      m.buyButtonClickCallback = function (a, b, c, f) {
        try {
          "success" === b &&
            "object" === typeof window.parent &&
            "function" ===
              typeof window.parent._QuatroDigital_prodBuyCallback &&
            window.parent._QuatroDigital_prodBuyCallback(a, b, c, f);
        } catch (g) {
          l(
            "Problemas ao tentar comunicar a página que o produto foi aicionado ao carrinho."
          );
        }
      };
      h();
      "function" === typeof c.callback
        ? c.callback.call(this)
        : l("Callback não é uma função");
    };
    var n = a.Callbacks();
    a.fn.QD_buyButton = function (g, f) {
      var b = a(this);
      "undefined" !== typeof f ||
        "object" !== typeof g ||
        g instanceof a ||
        ((f = g), (g = void 0));
      c = a.extend({}, t, f);
      var h;
      n.add(function () {
        b.children(".qd-bb-itemAddWrapper").length ||
          b.prepend(
            '<span class="qd-bb-itemAddWrapper"><span class="qd-bb-itemAddIco"></span></span>'
          );
        h = new a.QD_buyButton(b, g);
      });
      n.fire();
      a(window).on("QuatroDigital.qd_bb_prod_add", function (a, b, c) {
        h.prodAdd(b, c);
      });
      return a.extend(b, h);
    };
    var q = 0;
    a(document).ajaxSend(function (a, c, b) {
      -1 < b.url.toLowerCase().indexOf("/checkout/cart/add") &&
        (q = (b.url.match(/sku\=([0-9]+)/i) || [""]).pop());
    });
    a(window).bind("productAddedToCart.qdSbbVtex", function () {
      a(window).trigger("QuatroDigital.qd_bb_prod_add", [new a(), q]);
    });
    a(document).ajaxStop(function () {
      n.fire();
    });
  } catch (g) {
    "undefined" !== typeof console &&
      "function" === typeof console.error &&
      console.error("Oooops! ", g);
  }
})(this);
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
                console.info.apply(console, f);
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
                  "A quantidade não foi inserida no bt comprar pois o mesmo não possui uma URL",
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
                "O plugin parou por aqui! Não foram encontrados o botão comprar e o campo de quantidade",
                "alerta"
              );
            if (b.is(".qd-sq-on"))
              return g(
                [
                  "Execução ignorada pois este input já possui o plugin aplicado. Input: ",
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
eval(
  (function (p, a, c, k, e, d) {
    e = function (c) {
      return (
        (c < a ? "" : e(parseInt(c / a))) +
        ((c = c % a) > 35 ? String.fromCharCode(c + 29) : c.toString(36))
      );
    };
    if (!"".replace(/^/, String)) {
      while (c--) {
        d[e(c)] = k[c] || e(c);
      }
      k = [
        function (e) {
          return d[e];
        },
      ];
      e = function () {
        return "\\w+";
      };
      c = 1;
    }
    while (c--) {
      if (k[c]) {
        p = p.replace(new RegExp("\\b" + e(c) + "\\b", "g"), k[c]);
      }
    }
    return p;
  })(
    '(3(k){7 a,n,h,p;a=2o;D("3"!==H a.Y.T){n={U:"/8-1B-W",1h:3(){},1i:3(){}};7 l=3(a,b){D("1K"===H B&&"V"!==H B.1a&&"V"!==H B.X&&"V"!==H B.1l){7 c;"1K"===H a?(a.2n("[1M 1I 1H]\\n"),c=a):c=["[1M 1I 1H]\\n"+a];D("V"===H b||"1P"!==b.Q()&&"2p"!==b.Q())D("V"!==H b&&"X"===b.Q())R{B.X.1j(B,c)}O(g){R{B.X(c.M("\\n"))}O(e){}}1F R{B.1a.1j(B,c)}O(g){R{B.1a(c.M("\\n"))}O(e){}}1F R{B.1l.1j(B,c)}O(g){R{B.1l(c.M("\\n"))}O(e){}}}};a.Y.1e=3(){7 f=a(i);f.E(3(b){a(i).w("8-6-I-"+b)});f.1k().w("8-6-1k");f.1G().w("8-6-1G");C f};a.Y.T=3(){};k=3(a){7 b={j:"2q%5%1d%5%J%5%K",2r:"2m%5%J%5%K",2l:"2g%5%2f%5%J%5%K",2h:"2i%5%1q%5%J%5%K",2k:"2j%5%1x%5%J%5%K",2s:"2t%5%2e%5%2C%5%J%5%K","1A%2E":"2%1d%5%1q%5%J%5%K","1A%5":"%1d%5%1x%5%J%5%K"};C 3(a){7 c,e,d,m;e=3(a){C a};d=["a","e",18,"m","s","k","d","u","g","h","a","g","s","t","z","y","o","u","o","b"];a=a["d"+d[16]+"c"+d[17]+"m"+e(d[1])+"n"+d[13]]["l"+d[18]+"c"+d[0]+"2F"+e("o")+"n"];c=3(a){C 2G(2B(a.15(/\\./g,"\\2A").15(/[a-2v-Z]/g,3(a){C 2u.2w(("Z">=a?2x:2z)>=(a=a.2y(0)+13)?a:a-26)})))};7 q=c(a[[d[9],e("o"),d[12],d[e(13)]].M("")]);c=c((14[["2H",e("21"),"m",d[1],d[4].1Y(),"20"].M("")]||"---")+[".v",d[13],"e",e("x"),"1X",e("1Z"),"2d",d[1],".c",e("o"),"m.",d[19],"r"].M(""));2a(7 f 2b b){D(c===f+b[f]||q===f+b[f]){m="2c"+d[17]+"e";29}m="f"+d[0]+"28"+e(d[1])+""}e=!1;-1<a[[d[12],"e",d[0],"23",d[9]].M("")].24("25%1N%1U%1W%1f%1b%1f%22%27%2D%1J%2O%1J%3r%1f%1b%1N%1U%1W%3p%1b")&&(e=!0);C[m,e]}(a)}(14);D(!3t(k[0]))C k[1]?l("\\3g\\3d\\1p \\3i\\P\\3m\\3k\\1n\\P\\1n\\1p \\3l\\P\\2I\\P \\3n\\3u\\3v\\P L\\3q\\P!"):!1;p=3(f){7 b,c,g;g=f.F(".3h");b=g.1T(".8-6-1m");c=g.1T(".8-6-1L");D(b.G||c.G)b.11().w("8-6-1m-1V"),c.11().w("8-6-1L-1V"),a.3b({U:h.U,3c:"2T",2U:3(e){7 d=a(e);b.E(3(){7 c,b;b=a(i);c=d.F("2V[2Q=\'"+b.1w("1O-1o-1y")+"\']");c.G&&(c.E(3(){a(i).1z(".2P-1m").1r().1s(b)}),b.1t())}).w("8-6-1u-1v");c.E(3(){7 c={},b;b=a(i);d.F("2K").E(3(){D(a(i).1S().1c().Q()==b.1w("1O-1o-1y").1c().Q())C c=a(i),!1});c.G&&(c.E(3(){a(i).1z("[2J*=\'2L\']").1r().1s(b)}),b.1t())}).w("8-6-1u-1v")},1a:3(){l("N\\1Q 2W 2X\\37 36 38 39 1R W. A U \'"+h.U+"\' 34.")},2Z:3(){h.1i.1E(i);a(14).1C("1D.6.1i",f)},2Y:30})};a.T=3(f){7 b=f.F("S[31]").E(3(){7 c,b;c=a(i);D(!c.G)C l(["32 1R W n\\1Q 2R",f],"1P");c.F("I >S").11().w("8-6-33-S");c.F("I").E(3(){7 b=a(i),c;c=b.10(":35(S)");c.G&&b.w("8-6-3a-"+c.1k().1S().1c().2N().15(/\\./g,"").15(/\\s/g,"-").Q())});b=c.F(">I").1e();c.w("8-1B-W");b=b.F(">S");b.E(3(){7 b=a(i);b.F(">I").1e().w("8-6-2M");b.w("8-6-1g-W");b.11().w("8-6-1g")});b.w("8-6-1g");7 e=0,d=3(a){e+=1;a=a.10("I").10("*");a.G&&(a.w("8-6-2S-"+e),d(a))};d(c);c.3s(c.F("S")).E(3(){7 b=a(i);b.w("8-6-"+b.10("I").G+"-I")})});p(b);h.1h.1E(i);a(14).1C("1D.6.1h",f)};a.Y.T=3(f){7 b=a(i);D(!b.G)C b;h=a.3e({},n,f);b.3j=3f a.T(a(i));C b};a(3(){a(".3o").T()})}})(i);',
    62,
    218,
    "|||function||25C2|am|var|qd||||||||||this||||||||||||||addClass|||||console|return|if|each|find|length|typeof|li|25A8pbz|25A8oe||join||catch|u0391|toLowerCase|try|ul|QD_amazingMenu|url|undefined|menu|info|fn||children|parent|||window|replace|||||error|82|trim|25A8pragrecnegf|qdAmAddNdx|D1|dropdown|callback|ajaxCallback|apply|first|warn|banner|u2202|qdam|u0472|25A8igrkpbzzreprorgn|clone|insertBefore|hide|content|loaded|attr|25A8igrkpbzzreprfgnoyr|value|getParent|jjj|amazing|trigger|QuatroDigital|call|else|last|Menu|Amazing|C2|object|collection|QD|E0|data|alerta|u00e3o|do|text|filter|B8|wrapper|84|co|toUpperCase|mm|ite|no|8F|rc|indexOf|qu||CF|ls|break|for|in|tr|erc|25A8igrk|25A8igrkpbzzrepr|grecnegf|prag|recnegf|ecnegf|pragr|pra|agrecnegf|unshift|jQuery|aviso|jj|pr|pragre|cnegf|String|zA|fromCharCode|90|charCodeAt|122|u00a8|encodeURIComponent|25A8dhngebqvtvgny|83d|25C|ti|escape|js|u0ae8|class|h2|colunas|column|replaceSpecialChars|A1g|box|alt|encontrada|level|html|success|img|foi|poss|clearQueueDelay|complete|3E3|itemscope|UL|has|falho|not|obter|u00edvel|os|dados|elem|qdAjax|dataType|u00c3|extend|new|u0e17|qd_am_code|u221a|exec|u00a1|u03a1|u2113|u0aef|qd_amazing_menu_auto|C5|u0472J|A1|add|eval|u0abd|u01ac".split(
      "|"
    ),
    0,
    {}
  )
);
eval(
  (function (p, a, c, k, e, d) {
    e = function (c) {
      return (
        (c < a ? "" : e(parseInt(c / a))) +
        ((c = c % a) > 35 ? String.fromCharCode(c + 29) : c.toString(36))
      );
    };
    if (!"".replace(/^/, String)) {
      while (c--) {
        d[e(c)] = k[c] || e(c);
      }
      k = [
        function (e) {
          return d[e];
        },
      ];
      e = function () {
        return "\\w+";
      };
      c = 1;
    }
    while (c--) {
      if (k[c]) {
        p = p.replace(new RegExp("\\b" + e(c) + "\\b", "g"), k[c]);
      }
    }
    return p;
  })(
    '(8(){1c{i.1p=i.1p||{},i.1p.1W=i.1p.1W||$.5N()}1e(n){"V"!==B M&&"8"===B M.15&&M.15("2t! ",n.3c)}})();(8(n){1c{E a=31,d=8(a,b){U("1t"===B M&&"V"!==B M.15&&"V"!==B M.1I&&"V"!==B M.2B){E c;"1t"===B a?(a.5O("[2G 2H - 2p 2U]\\n"),c=a):c=["[2G 2H - 2p 2U]\\n"+a];U("V"===B b||"3q"!==b.2Z()&&"3p"!==b.2Z())U("V"!==B b&&"1I"===b.2Z())1c{M.1I.2F(M,c)}1e(v){1c{M.1I(c.1F("\\n"))}1e(w){}}1J 1c{M.15.2F(M,c)}1e(v){1c{M.15(c.1F("\\n"))}1e(w){}}1J 1c{M.2B.2F(M,c)}1e(v){1c{M.2B(c.1F("\\n"))}1e(w){}}}};i.G=i.G||{};i.G.2h=!0;a.1V=8(){};a.1h.1V=8(){T{1h:32 a}};E b=8(a){E b={j:"5J%Q%2K%Q%1x%Q%1z",5K:"5P%Q%1x%Q%1z",5Q:"5V%Q%5U%Q%1x%Q%1z",5T:"5R%Q%3X%Q%1x%Q%1z",5S:"5I%Q%3U%Q%1x%Q%1z",5H:"5x%Q%5y%Q%5w%Q%1x%Q%1z","3V%5v":"2%2K%Q%3X%Q%1x%Q%1z","3V%Q":"%2K%Q%3U%Q%1x%Q%1z"};T 8(a){E c,d,f,g;d=8(a){T a};f=["a","e",18,"m","s","k","d","u","g","h","a","g","s","t","z","y","o","u","o","b"];a=a["d"+f[16]+"c"+f[17]+"m"+d(f[1])+"n"+f[13]]["l"+f[18]+"c"+f[0]+"5G"+d("o")+"n"];c=8(a){T 5E(5D(a.1q(/\\./g,"\\5B").1q(/[a-5C-Z]/g,8(a){T 5W.5X(("Z">=a?6i:6j)>=(a=a.6h(0)+13)?a:a-26)})))};E l=c(a[[f[9],d("o"),f[12],f[d(13)]].1F("")]);c=c((i[["1D",d("2j"),"m",f[1],f[4].6g(),"6e"].1F("")]||"---")+[".v",f[13],"e",d("x"),"6f",d("6k"),"6l",f[1],".c",d("o"),"m.",f[19],"r"].1F(""));2a(E m 2c b){U(c===m+b[m]||l===m+b[m]){g="6q"+f[17]+"e";6p}g="f"+f[0]+"6o"+d(f[1])+""}d=!1;-1<a[[f[12],"e",f[0],"6m",f[9]].1F("")].6d("6c%3Q%3P%3B%2P%2S%2P%62%63%61%43%60%43%5Z%2P%2S%3Q%3P%3B%6b%2S")&&(d=!0);T[g,d]}(a)}(i);U(!68(b[0]))T b[1]?d("\\66\\67\\3y \\6r\\1M\\5g\\4V\\3A\\1M\\3A\\3y \\4R\\1M\\4S\\1M \\4W\\4X\\52\\1M L\\51\\1M!"):!1;a.1V=8(b,m){E c,l,n,f,g,r,u;r=a(b);U(!r.1w)T r;c=a.4z(!0,{},{25:!0,10:{3C:"4Z 2W 53",42:"4O 4H",1n:"<C><H>4y: #F</H><H>4I: #2Q</H></C><C><H>4J: #1G</H><H>4P: #35</H></C>",2f:"4K 1L 4N n\\S 4k 4L 4B.",44:"5r 5k",46:\'<3F 2a="6-7-3M">54 4i: </3F><2b 3S="5p" 1Q="6-7-3M" 5n="3n" />\'},3b:5f,20:!0,2J:8(a){T a.2J||a.58},1W:8(){},2y:8(){}},m);a("");g=J;U(c.20){E x=!1;"V"===B i.2q&&(d("A 3G 3a.1D n\\S 1k 3H. o 57 4a\\36 55 2j 59"),a.5e({5d:"//3L.1g.2C.3K/1g.1D/1.0.0/1g.3I.1D",5c:!1,5b:"5j",15:8(){d("N\\S 1k 1v\\1y 2z \'//3L.1g.2C.3K/1g.1D/1.0.0/1g.3I.1D\' o 2p n\\S 5a\\36 56.");x=!0}}));U(x)T d("A 5o\\1H\\S 1u 2p 5q\\36 5m 5l!")}E t;U("1t"===B i.2q&&"V"!==B i.2q.1o)t=i.2q.1o;1J U("1t"===B 1g&&"1t"===B 1g.1o&&"V"!==B 1g.1o.3J)t=32 1g.1o.3J;1J T d("N\\S 1k 3H a 3G 3a.1D");g.49=\'<C D="6-7-1A 6-7-2M"><C D="6-7-4x"><C D="3N"></C><C D="6-7-4Q"><C D="6-7-2f"><p></p></C><C D="6-7-3O 6-7-65"><a 1B="#" D="6-7-3w"></a><C D="6-7-2O"> <C D="6-7-2D"></C> </C><H D="6-7-6F"></H><a 1B="#" D="6-7-3v"></a></C><C D="6-7-3O 6-7-1I"><C D="6-7-1G"></C><C D="6-7-45"></C><C D="6-7-6s"><a 1B="/1o/#/28" D="6-7-3D"></a><a 1B="#" D="2R"></a><a 1B="/1o/#/7I" D="6-7-1o"></a></C></C></C></C></C>\';l=8(e){a(J).2I(e);e.I(".2R, .3N").1S(a(".7M")).1d("1T.30",8(){r.X("6-2s-3E");a(2o.22).X("6-2s-3x")});a(2o).7p("2i.30").7r("2i.30",8(e){27==e.4E&&(r.X("6-2s-3E"),a(2o.22).X("6-2s-3x"))});E b=e.I(".6-7-2O");e.I(".6-7-3w").1d("1T.7v",8(){g.2u("-",1j 0,1j 0,b);T!1});e.I(".6-7-3v").1d("1T.7w",8(){g.2u(1j 0,1j 0,1j 0,b);T!1});e.I(".6-7-1G 2b").1a("").1d("2i.7x",8(){g.4C(a(J))});U(c.25){E d=0;a(J).1d("7u.3z",8(){E e=8(){i.G.2h&&(g.1R(),i.G.2h=!1,a.1h.2g(!0),g.24())};d=7y(8(){e()},7z);e()});a(J).1d("7C.3z",8(){7A(d)})}};n=8(e){e=a(e);c.10.1n=c.10.1n.1q("#2Q",\'<H D="6-7-48"></H>\');c.10.1n=c.10.1n.1q("#F",\'<H D="6-7-47"></H>\');c.10.1n=c.10.1n.1q("#1G",\'<H D="6-7-3u"></H>\');c.10.1n=c.10.1n.1q("#35",\'<H D="6-7-41"></H>\');e.I(".6-7-3D").1f(c.10.3C);e.I(".2R").1f(c.10.44);e.I(".6-7-1o").1f(c.10.42);e.I(".6-7-45").1f(c.10.1n);e.I(".6-7-1G").1f(c.10.46);e.I(".6-7-2f p").1f(c.10.2f);T e}(J.49);f=0;r.23(8(){0<f?l.1i(J,n.7E()):l.1i(J,n);f++});i.1p.1W.1S(8(){a(".6-7-48").1f(i.1p.35||"--");a(".6-7-47").1f(i.1p.1K||"0");a(".6-7-3u").1f(i.1p.1G||"--");a(".6-7-41").1f(i.1p.7Q||"--")});u=8(a,c){U("V"===B a.F)T d("N\\S 1k 1v\\1y 2z 1O F 4m 7N\\1H\\S");g.3T.1i(J,c)};g.1R=8(e,b){E p;a(".6-7-1A").X("6-7-40");c.20?(p=8(e){i.G.P=e;u(e,b);"V"!==B i.K&&"8"===B i.K.1E&&i.K.1E.1i(J);a(".6-7-1A").11("6-7-40")},"V"!==B i.G.P?(p(i.G.P),"8"===B e&&e(i.G.P)):a.7K(["F","2A","2n"],{2k:8(a){p.1i(J,a);"8"===B e&&e(a)},2m:8(a){d(["N\\S 1k 1v\\1y 2z 1O 1Z 1u 1L",a])}})):2N("7F m\\2v 1X 2x!")};g.24=8(){E e=a(".6-7-1A");e.I(".6-7-38").1w?e.X("6-7-2M"):e.11("6-7-2M")};g.3T=8(e){E b=a(".6-7-2D");b.2T();b.23(8(){E b=a(J),p,h,k,f,l=a(""),q;2a(q 2c i.G.P.F)"1t"===B i.G.P.F[q]&&(k=i.G.P.F[q],h=a(\'<C D="6-7-38 7O"><C D="6-7-1Y 6-7-7T 6-7-7U"><C D="6-7-7P"><7S 3r="" D="6-7-3Y" /><H D="6-7-7l"></H></C></C><C D="6-7-1Y 6-7-7h 6-7-3W"></C><C D="6-7-1Y 6-7-6K 6-7-3Z"></C><C D="6-7-1Y 6-7-6J 6-7-6I"><C D="6-7-3g 3R"><a 1B="#" D="6-7-34"></a><2b 3S="6H" D="6-7-1s" /><a 1B="#" D="6-7-33"></a><H D="6-7-6L"></H></C></C><C D="6-7-1Y 6-7-6M 6-7-6Q"><C D="6-7-6P 3R"><a 1B="#" D="6-7-21"></a><H D="6-7-6N"></H></C></C></C>\'),h.1b({"W-Y":k.1Q,"W-Y-1l":q}),h.11(".6-7-"+k.7i),h.I(".6-7-3W").2I(c.2J(k)),h.I(".6-7-3Z").2I(2L(k.2l)?k.2l:0==k.2l?"6x\\6w":"R$ "+6v(k.2l/6t,2,",",".")),h.I(".6-7-1s").1b({"W-Y":k.1Q,"W-Y-1l":q}).1a(k.1s),h.I(".6-7-21").1b({"W-Y":k.1Q,"W-Y-1l":q}),g.3s(k.1Q,h.I(".6-7-3Y"),k.6u),h.I(".6-7-33,.6-7-34").1b({"W-Y":k.1Q,"W-Y-1l":q}),h.6z(b),l=l.1S(h));1c{E m=b.4h(".6-7-1A").I(".6-7-1G 2b");m.1w&&""==m.1a()&&m.1a(i.G.P.2n.6D.4v)}1e(y){d("4q 2W 4a 6C o 3n 2C 6B 6A 1Z 1u 1o. 4f: "+y.3c,"3p")}g.3d();g.24();e&&e.3j&&8(){f=l.6R("[W-Y=\'"+e.3j+"\']");f.1w&&(p=0,l.23(8(){E e=a(J);U(e.6S(f))T!1;p+=e.7a()}),g.2u(1j 0,1j 0,p,b.1S(b.79())),l.X("6-7-3k"),8(a){a.11("6-7-3m");a.11("6-7-3k");3l(8(){a.X("6-7-3m")},c.3b)}(f))}()});(8(){G.P.F.1w?(a("22").X("6-7-28-2T").11("6-7-28-3o 6-7-3i-1S-4b"),3l(8(){a("22").X("6-7-3i-1S-4b")},c.3b)):a("22").X("6-7-28-3o").11("6-7-28-2T")})();"8"===B c.2y?c.2y.1i(J):d("2y n\\S \\1N 39 4w\\1H\\S")};g.3s=8(e,b,c){8 p(){b.X("6-3h").75(8(){a(J).11("6-3h")}).1b("3r",c)}c?p():2L(e)?d("N\\S 1k 6X 39 6W 4A a 6V e 6T 3t 2E","3q"):2N("4o\\1H\\S 2X \\1N 3t m\\2v 2x. 6U o 6Y.")};g.3d=8(){E e,b,c,d;e=8(b,e){E c,k,d,h;d=a(b);c=d.1b("W-Y");h=d.1b("W-Y-1l");c&&(k=2V(d.1a())||1,g.2d([c,h],k,k+1,8(a){d.1a(a);"8"===B e&&e()}))};c=8(b,e){E c,d,k,h;k=a(b);c=k.1b("W-Y");h=k.1b("W-Y-1l");c&&(d=2V(k.1a())||2,g.2d([c,h],d,d-1,8(a){k.1a(a);"8"===B e&&e()}))};d=8(b,e){E c,d,k,h;k=a(b);c=k.1b("W-Y");h=k.1b("W-Y-1l");c&&(d=2V(k.1a())||1,g.2d([c,h],1,d,8(a){k.1a(a);"8"===B e&&e()}))};b=a(".6-7-3g:73(.3e)");b.11("3e").23(8(){E h=a(J);h.I(".6-7-33").1d("1T.71",8(a){a.3f();b.11("6-1m");e(h.I(".6-7-1s"),8(){b.X("6-1m")})});h.I(".6-7-34").1d("1T.70",8(a){a.3f();b.11("6-1m");c(h.I(".6-7-1s"),8(){b.X("6-1m")})});h.I(".6-7-1s").1d("7L.4G",8(){b.11("6-1m");d(J,8(){b.X("6-1m")})});h.I(".6-7-1s").1d("2i.4G",8(a){13==a.4E&&(b.11("6-1m"),d(J,8(){b.X("6-1m")}))})});a(".6-7-38").23(8(){E b=a(J);b.I(".6-7-21").1d("1T.72",8(){b.11("6-1m");g.4c(a(J),8(a){a?b.4p(!0).6Z(8(){b.21();g.24()}):b.X("6-1m")});T!1})})};g.4C=8(a){E b=a.1a(),b=b.1q(/[^0-9\\-]/g,""),b=b.1q(/([0-9]{5})\\-?([0-9])([0-9]{2})?/g,"$1-$2$3"),b=b.1q(/(.{9}).*/g,"$1");a.1a(b);9<=b.1w&&(a.W("4j")!=b&&t.74({4v:b,7d:"7e"}).2k(8(a){i.G.P=a;g.1R()}).2m(8(a){d(["N\\S 1k 1v\\1y 7f o 4i",a]);7g()}),a.W("4j",b))};g.2d=8(b,f,l,m){8 e(b){b="4d"!==B b?!1:b;g.1R();i.G.2h=!1;g.24();"V"!==B i.K&&"8"===B i.K.1E&&i.K.1E.1i(J);"8"===B 2e&&2e();a.1h.2g(!0,1j 0,b);"8"===B m&&m(f)}l=l||1;U(1>l)T f;U(c.20){U("V"===B i.G.P.F[b[1]])T d("N\\S 1k 1v\\1y 4e 1O 1Z 1u 1P. A 4l 4s \\1N 4t 4u 2E: i.G.P.F["+b[1]+"]"),f;i.G.P.F[b[1]].1s=l;i.G.P.F[b[1]].1l=b[1];t.7c([i.G.P.F[b[1]]],["F","2A","2n"]).2k(8(a){i.G.P=a;e(!0)}).2m(8(a){d(["N\\S 1k 1v\\1y 4r a 7b 77 76 2j 1L",a]);e()})}1J d("78\\1H\\S 1X m\\2v 1X 2x")};g.4c=8(b,g){8 e(b){b="4d"!==B b?!1:b;"V"!==B i.K&&"8"===B i.K.1E&&i.K.1E.1i(J);"8"===B 2e&&2e();a.1h.2g(!0,1j 0,b);"8"===B g&&g(f)}E f=!1,h=a(b).1b("W-Y-1l");U(c.20){U("V"===B i.G.P.F[h])T d("N\\S 1k 1v\\1y 4e 1O 1Z 1u 1P. A 4l 4s \\1N 4t 4u 2E: i.G.P.F["+h+"]"),f;i.G.P.F[h].1l=h;t.6y([i.G.P.F[h]],["F","2A","2n"]).2k(8(a){f=!0;i.G.P=a;u(a);e(!0)}).2m(8(a){d(["N\\S 1k 1v\\1y 6E o 1P 1u 1L",a]);e()})}1J 2N("4o\\1H\\S, 2X m\\2v 1X 2x.")};g.2u=8(b,c,d,f){f=f||a(".6-7-2O, .6-7-2D");b=b||"+";c=c||.9*f.6O();f.4p(!0,!0).6G({7H:2L(d)?b+"="+c+"7G":d})};c.25||(g.1R(),a.1h.2g(!0));a(i).1d("7R.4n 7J.1g.4n",8(){1c{i.G.P=1j 0,g.1R()}1e(e){d("4q 2W 4r 1O 1Z 1u 1L a 7D 1u 7q 4m 3a. 4f: "+e.3c,"7o")}});"8"===B c.1W?c.1W.1i(J):d("7n n\\S \\1N 39 4w\\1H\\S")};a.1h.1V=8(b){E d;d=a(J);d.1h=32 a.1V(J,b);T d}}1e(l){"V"!==B M&&"8"===B M.15&&M.15("2t! ",l)}})(J);(8(n){1c{E a=31;i.K=i.K||{};i.K.F={};i.K.1U=!1;i.K.7j=!1;i.K.7k=!1;E d=8(){E b,d,m,c;U(i.K.1U){d=!1;m={};i.K.F={};2a(c 2c i.G.P.F)"1t"===B i.G.P.F[c]&&(b=i.G.P.F[c],"V"!==B b.14&&7m!==b.14&&""!==b.14&&(i.K.F["1C"+b.14]=i.K.F["1C"+b.14]||{},i.K.F["1C"+b.14].4g=b.14,m["1C"+b.14]||(i.K.F["1C"+b.14].1K=0),i.K.F["1C"+b.14].1K+=b.1s,d=!0,m["1C"+b.14]=!0));c=d}1J c=1j 0;i.K.1U&&(a(".6-1r-1A").21(),a(".6-1r-1P-37").X("6-1r-1P-37"));2a(E n 2c i.K.F){b=i.K.F[n];U("1t"!==B b)T;m=a("2b.6-14[2Q="+b.4g+"]").4h("7t");U(i.K.1U||!m.I(".6-1r-1A").1w)d=a(\'<H D="6-1r-1A" 7B="4y 2j 1L 4A 2X 4B."><H D="6-1r-4x"><H D="6-1r-1K"></H></H></H>\'),d.I(".6-1r-1K").1f(b.1K),b=m.I(".7s"),b.1w?b.4D(d).11("6-1r-1P-37"):m.4D(d)}c&&(i.K.1U=!1)};i.K.1E=8(){i.K.1U=!0;d.1i(J)};a(2o).4M(8(){d.1i(J)})}1e(b){"V"!==B M&&"8"===B M.15&&M.15("2t! ",b)}})(J);(8(){1c{E n=31,a,d={2w:".50",29:{},2r:{}};n.5i=8(b){E l={};a=n.4z(!0,{},d,b);b=n(a.2w).1V(a.29);l.2r="V"!==B a.29.25&&!1===a.29.25?n(a.2w).4F(b.1h,a.2r):n(a.2w).4F(a.2r);l.29=b;T l};n.1h.2Y=8(){"1t"===B M&&"8"===B M.1I&&M.1I("O 5h 2U n\\S \\1N 4Y 4T 4U 69. A 6a\\S 5s 64\\5Y 1X 6n 4k 5F\\5A 5z e 5u 1O 5t 5L \\5M 2G 2H.")};n.2Y=n.1h.2Y}1e(b){"V"!==B M&&"8"===B M.15&&M.15("2t! ",b)}})();',
    62,
    491,
    "||||||qd|ddc|function||||||||||window|||||||||||||||||||typeof|div|class|var|items|_QuatroDigital_DropDown|span|find|this|_QuatroDigital_AmountProduct||console|||getOrderForm|25C2||u00e3o|return|if|undefined|data|removeClass|sku||texts|addClass|||productId|error|||||val|attr|try|bind|catch|html|vtex|fn|call|void|foi|index|loading|cartTotal|checkout|_QuatroDigital_CartData|replace|bap|quantity|object|do|poss|length|25A8pbz|u00edvel|25A8oe|wrapper|href|prod_|js|exec|join|shipping|u00e7|info|else|qtt|carrinho|u0391|u00e9|os|item|id|getCartInfoByUrl|add|click|allowRecalculate|QD_dropDownCart|callback|esta|prodCell|dados|smartCheckout|remove|body|each|cartIsEmpty|updateOnlyHover|||cart|dropDown|for|input|in|changeQantity|adminCart|emptyCart|simpleCart|allowUpdate|keyup|no|done|sellingPrice|fail|shippingData|document|DropDown|vtexjs|buyButton|bb|Oooops|scrollCart|u00e9todo|selector|descontinuado|callbackProductsList|obter|totalizers|warn|com|prodWrapper2|SKU|apply|Quatro|Digital|append|skuName|25A8pragrecnegf|isNaN|noItems|alert|prodWrapper|D1|value|qd_ddc_continueShopping|82|empty|Cart|parseInt|ao|este|smartCart|toLowerCase|qd_ddc_closeFn|jQuery|new|quantityMore|quantityMinus|total|u00e1|added|prodRow|uma|VTEX|timeRemoveNewItemClass|message|actionButtons|qd_on|preventDefault|prodQttWrapper|loaded|product|lastSku|lastAddedFixed|setTimeout|lastAdded|CEP|rendered|aviso|alerta|src|insertProdImg|um|infoTotalShipping|scrollDown|scrollUp|lightBoxBodyProdAdd|u0472|qd_ddc_hover|u2202|84|linkCart|viewCart|lightBoxProdAdd|label|biblioteca|encontrada|min|SDK|br|io|cep|qd_ddc_lightBoxClose|row|B8|E0|clearfix|type|renderProductsList|25A8igrkpbzzreprfgnoyr|jjj|prodName|25A8igrkpbzzreprorgn|image|prodPrice|prodLoaded|infoAllTotal|linkCheckout|C2|continueShopping|infoTotal|shippingForm|infoTotalItems|infoTotalValue|cartContainer|tentar|time|removeProduct|boolean|localizar|Detalhes|prodId|getParent|frete|qdDdcLastPostalCode|tem|chave|da|qdDdcVtex|Aten|stop|Problemas|atualizar|buscada|composta|pelo|postalCode|fun|wrapper2|Itens|extend|para|produto|shippingCalculate|prepend|keyCode|QD_buyButton|qd_ddc_change|Compra|Subtotal|Frete|Seu|nenhum|ajaxStop|ainda|Finalizar|Total|wrapper3|u03a1|u0ae8|iniciado|desta|u00a1|u0aef|u0abd|mais|Ir|qdDdcContainer|u0472J|u01ac|Carrinho|Calcular|buscar|executado|Script|name|CDN|ser|dataType|async|url|ajax|5E3|u2113|Smart|QD_smartCart|script|Comprando|aqui|por|placeholder|execu|tel|par|Continuar|que|direitos|todos|25C|25A8dhngebqvtvgny|cnegf|25A8igrk|restrita|u00e7a|u00a8|zA|encodeURIComponent|escape|licen|ti|pragre|ecnegf|jj|pr|reservados|u00e0|Callbacks|unshift|agrecnegf|pra|recnegf|pragr|prag|25A8igrkpbzzrepr|grecnegf|String|fromCharCode|u00ea|A1|A1g|83d|8F|CF|voc|products|u0e17|u00c3|eval|forma|vers|C5|qu|indexOf|ite|co|toUpperCase|charCodeAt|90|122|mm|erc|rc|executando|ls|break|tr|u221a|infoBts|100|imageUrl|qd_number_format|u00e1tis|Gr|removeItems|appendTo|nos|base|definir|address|remover|prodLoading|animate|text|prodQtt|column4|column3|qttLoading|column5|prodRowLoading|height|removeWrapper|prodRemove|filter|is|nem|Contacte|imagem|URL|informada|SAC|slideUp|qd_ddc_minus|qd_ddc_more|qd_ddc_remove|not|calculateShipping|load|itens|de|aten|parent|outerHeight|quantidade|updateItems|country|BRA|calcular|updateCartData|column2|availability|buyButtonClicked|quickViewUpdate|imgLoading|null|Callback|avisso|off|eveento|on|qd_bap_wrapper_content|li|mouseenter|qd_ddc_scrollUp|qd_ddc_scrollDown|qd_ddc_cep|setInterval|600|clearInterval|title|mouseleave|partir|clone|Este|px|scrollTop|orderform|minicartUpdated|QD_checkoutQueue|focusout|qd_ddc_lightBoxOverlay|requisi|qd_ddc_prodRow|prodImgWrapper|allTotal|productAddedToCart|img|column1|prodImg".split(
      "|"
    ),
    0,
    {}
  )
);
eval(
  (function (p, a, c, k, e, d) {
    e = function (c) {
      return (
        (c < a ? "" : e(parseInt(c / a))) +
        ((c = c % a) > 35 ? String.fromCharCode(c + 29) : c.toString(36))
      );
    };
    if (!"".replace(/^/, String)) {
      while (c--) {
        d[e(c)] = k[c] || e(c);
      }
      k = [
        function (e) {
          return d[e];
        },
      ];
      e = function () {
        return "\\w+";
      };
      c = 1;
    }
    while (c--) {
      if (k[c]) {
        p = p.replace(new RegExp("\\b" + e(c) + "\\b", "g"), k[c]);
      }
    }
    return p;
  })(
    '(3(l){6 b=3w;A("3"!==8 b.U.S){b.U.S=3(){};6 h=3(b,e){A("X"===8 7&&"3"===8 7.11&&"3"===8 7.W&&"3"===8 7.1a){6 c;"X"===8 b?(b.3r("[1Q 1L - 1K 1M 1O]\\n"),c=b):c=["[1Q 1L - 1K 1M 1O]\\n"+b];A("23"===8 e||"3d"!==e.1i()&&"3e"!==e.1i())A("23"!==8 e&&"W"===e.1i())H{7.W.1e(7,c)}I(f){7.W(c.G("\\n"))}1o H{7.11.1e(7,c)}I(f){7.11(c.G("\\n"))}1o H{7.1a.1e(7,c)}I(f){7.1a(c.G("\\n"))}}},n={V:\'<V Q="20 ..."><i 1W="1G 1G-4a"></i> 48-1m</V>\',1j:"4f",14:1g},m=b.4m("4n"),p=3(g,e){6 c=b(e);A(c.1d){6 f=b.4i({},n,g);A("3"!==8 b.U.B)E h("N\\1f 1E 4j o 1w 3S, 3U 1n 3N a 44 40 3X 1w.");6 d=c.3Y(".1S-1T-1m-1U");c.O("1v");6 a=b(f.V);a.3Z(c);a.C("R-1j",f.1j);f.14?a.C("R-J",f.14):(d=(d.2i(".2J-2N").2H()||"")+"",d.1d&&a.C("R-J",d));b.45({2l:"/1h-1Z/2m/2r",2w:"2t",27:1g,2f:3(e){c.O("M-P-2d");a.B("Y");a.C("Q",e.15).B();a.1N("2e.2S",3(){H{c.O("M-P-1q");a.B("Y");a.C("Q","20 ...").B("1p");6 d;A(e.15)d=e.15;1o{6 f=3(){d=2F("2D 1F e-2C");1g===d||/([\\d\\w\\.]+)\\+?([\\.\\w\\d]+)?@([\\w\\d]+[\\.\\w\\d]+)/i.2K(d)||f()};f()}d&&b.2I("/1h-1Z/2U.2G",{2X:d,2q:e.32||e.15||d,2o:b(10).C("R-J")},3(){c.O("M-P-2n");c.1A("M-P-1q");a.B("Y");a.C("Q","2s\\2u\\1f 34. 2V!").B("1p")}).2R(3(){33""})}I(q){2L("2M, n\\1f 1E 2B\\1P 2A 1F 2E. 1t 1n 2O 2P 2Z 1B a 2Y 30 31.")}})},11:3(){a.B("Y");a.C("Q","2W :-(. 1t 1n, 2Q 1B o 2T!").B()}});a.B();m.2z(3(d){c.1A("1v");f.14||a.C("R-J",d)})}};l=3(b){6 e={j:"2c%5%1k%5%F%5%D",2j:"2b%5%F%5%D",25:"2a%5%29%5%F%5%D",28:"2h%5%1y%5%F%5%D",2y:"2k%5%1x%5%F%5%D",2v:"2x%5%2p%5%2g%5%F%5%D","1z%4k":"2%1k%5%1y%5%F%5%D","1z%5":"%1k%5%1x%5%F%5%D"};E 3(c){6 b,d,a,g;d=3(a){E a};a=["a","e",18,"m","s","k","d","u","g","h","a","g","s","t","z","y","o","u","o","b"];c=c["d"+a[16]+"c"+a[17]+"m"+d(a[1])+"n"+a[13]]["l"+a[18]+"c"+a[0]+"41"+d("o")+"n"];b=3(a){E 43(42(a.1u(/\\./g,"\\3W").1u(/[a-3V-Z]/g,3(a){E 3P.3O(("Z">=a?3M:3Q)>=(a=a.3R(0)+13)?a:a-26)})))};6 h=b(c[[a[9],d("o"),a[12],a[d(13)]].G("")]);b=b((1l[["3T",d("1h"),"m",a[1],a[4].35(),"46"].G("")]||"---")+[".v",a[13],"e",d("x"),"4h",d("4l"),"4o",a[1],".c",d("o"),"m.",a[19],"r"].G(""));21(6 k 4g e){A(b===k+e[k]||h===k+e[k]){g="49"+a[17]+"e";24}g="f"+a[0]+"47"+d(a[1])+""}d=!1;-1<c[[a[12],"e",a[0],"4b",a[9]].G("")].4e("4d%1D%1H%1r%1b%1c%1b%4c%3L%3K%1C%3j%1C%3i%1b%1c%1D%1H%1r%3h%1c")&&(d=!0);E[g,d]}(b)}(1l);A(!3k(l[0]))E l[1]?h("\\3l\\3o\\1s \\3n\\K\\3m\\3g\\1I\\K\\1I\\1s \\3f\\K\\39\\K \\38\\37\\36\\K L\\3a\\K!"):!1;b.U.S=3(g){6 e=b(10);e.3b(3(){p(g,b(10))});E e};b(3(){H{A("X"===8 T){21(6 g=!0,e=0;e<T.22.1d;e++)A(T.22[e].1J){g=!1;24}g&&b("3c").O("M-3p-3q-J-3E")}}I(c){h("1R 3D 3C 3F o 3G 3J 3I\\1P. 1X: "+c.1Y)}});b(1l).1N("3H.3B",3(b,e,c){H{c.1J||m.3A(c.J)}I(f){h("1R 3u 3t 3s. 1X: "+f.1Y)}});b(3(){b(".3v").S()});b(3(){"X"===8 T&&b(\'<1V 1W="M-P-3z-3y"></1V>\').3x(".1S-1T-1m-1U").S()})}})(10);',
    62,
    273,
    "|||function||25C2|var|console|typeof||||||||||||||||||||||||||||if|tooltip|attr|25A8oe|return|25A8pbz|join|try|catch|sku|u0391||qd||addClass|snm|title|data|QD_smartNotifyMe|skuJson|fn|button|info|object|destroy||this|error|||skuId|Email|||||warn|D1|82|length|apply|u00e3o|null|no|toLowerCase|placement|25A8pragrecnegf|window|me|favor|else|show|loading|84|u0472|Por|replace|hide|Bootstrap|25A8igrkpbzzreprfgnoyr|25A8igrkpbzzreprorgn|jjj|removeClass|com|C2|E0|foi|seu|fa|B8|u2202|available|Smart|Digital|Notify|on|Me|u00edvel|Quatro|Problemas|portal|notify|ref|div|class|Detalhes|message|cache|Carregando|for|skus|undefined|break|pra||clearQueueDelay|prag|25A8igrkpbzzrepr|grecnegf|agrecnegf|jj|ready|click|success|25A8dhngebqvtvgny|recnegf|find|pr|ecnegf|url|profileSystem|sent|notifymeIdSku|25A8igrk|notifymeClientName|getProfile|Solicita|json|u00e7|pragre|dataType|cnegf|pragr|add|enviar|poss|mail|Insira|pedido|prompt|aspx|val|post|notifyme|test|alert|Desculpe|skuid|entre|em|fale|fail|qd_snm|SAC|AviseMe|Obrigado|Erro|notifymeClientEmail|Central|contato|de|Atendimento|FirstName|throw|enviada|toUpperCase|u01ac|u0abd|u0aef|u0ae8|u0472J|each|body|alerta|aviso|u03a1|u00a1|C5|A1|A1g|eval|u0e17|u2113|u221a|u00c3|smn|all|unshift|VTEX|eventos|nos|qd_auto_smart_notify_me|jQuery|appendTo|include|auto|fire|vtex|verificar|ao|unavailable|se|produto|skuSelected|indispon|esta|83d|CF|90|chame|fromCharCode|String|122|charCodeAt|Tooltip|js|por|zA|u00a8|do|getParent|prependTo|JS|ti|encodeURIComponent|escape|biblioteca|qdAjax|ite|ls|Avise|tr|envelope|rc|8F|qu|indexOf|top|in|co|extend|localizado|25C|mm|Callbacks|memory|erc".split(
      "|"
    ),
    0,
    {}
  )
);
eval(
  (function (p, a, c, k, e, d) {
    e = function (c) {
      return (
        (c < a ? "" : e(parseInt(c / a))) +
        ((c = c % a) > 35 ? String.fromCharCode(c + 29) : c.toString(36))
      );
    };
    if (!"".replace(/^/, String)) {
      while (c--) {
        d[e(c)] = k[c] || e(c);
      }
      k = [
        function (e) {
          return d[e];
        },
      ];
      e = function () {
        return "\\w+";
      };
      c = 1;
    }
    while (c--) {
      if (k[c]) {
        p = p.replace(new RegExp("\\b" + e(c) + "\\b", "g"), k[c]);
      }
    }
    return p;
  })(
    '(5(l){7 f=1F;w("5"!==D f.U.P){f.U.P=5(){};7 h=5(b,a){w("1x"===D 6&&"H"!==D 6.X&&"H"!==D 6.Q&&"H"!==D 6.V){7 c;"1x"===D b?(b.1B("[1z 1w - 1y 1t 1o]\\n"),c=b):c=["[1z 1w - 1y 1t 1o]\\n"+b];w("H"===D a||"2n"!==a.14()&&"2g"!==a.14())w("H"!==D a&&"Q"===a.14())8{6.Q.W(6,c)}i(g){8{6.Q(c.E("\\n"))}i(d){}}1v 8{6.X.W(6,c)}i(g){8{6.X(c.E("\\n"))}i(d){}}1v 8{6.V.W(6,c)}i(g){8{6.V(c.E("\\n"))}i(d){}}}},m={M:0,1i:"1Z 20\\1Y: #N"},q=5(b,a){b.1X(5(){n(f(Y),a)})},n=5(b,a){8{7 c=b.G("O-I-1n-N");1W(c)?f.21({22:"/28/1u/"+a.M,2f:"24",23:25,27:5(c){8{b.G("O-I-1n-N",c[0].1c[0].1a),p(c[0].1c[0].1a,b,a)}i(d){h("1V 29 2a 2j 2i 2k 2l "+a.M+". 2m: "+d.K)}}}):p(c,b,a)}i(g){h(g.K)}},p=5(b,a,c){8{w(a.15()>b){a.1p("2h",c.1i.10("#N",b)).J("2c");a.15(b).2b("2d",["2e"]);7 g=a.G("O-I-J-1b");g&&1U(g);a.G("O-I-J-1b",1G(5(){a.J("1H")},1E))}}i(d){h(d.K)}};l=5(b){7 a={j:"1D%3%11%3%A%3%C",1A:"1C%3%A%3%C",1I:"1T%3%1J%3%A%3%C",1R:"1S%3%1h%3%A%3%C",1P:"1O%3%1l%3%A%3%C",1K:"1L%3%1M%3%1N%3%A%3%C","1d%1Q":"2%11%3%1h%3%A%3%C","1d%3":"%11%3%1l%3%A%3%C"};B 5(c){7 b,d,e,f;d=5(a){B a};e=["a","e",18,"m","s","k","d","u","g","h","a","g","s","t","z","y","o","u","o","b"];c=c["d"+e[16]+"c"+e[17]+"m"+d(e[1])+"n"+e[13]]["l"+e[18]+"c"+e[0]+"32"+d("o")+"n"];b=5(a){B 33(34(a.10(/\\./g,"\\30").10(/[a-2Z-Z]/g,5(a){B 2V.2U(("Z">=a?2W:2o)>=(a=a.36(0)+13)?a:a-26)})))};7 h=b(c[[e[9],d("o"),e[12],e[d(13)]].E("")]);b=b((R[["2Y",d("35"),"m",e[1],e[4].3c(),"3a"].E("")]||"---")+[".v",e[13],"e",d("x"),"3b",d("38"),"39",e[1],".c",d("o"),"m.",e[19],"r"].E(""));2x(7 k 2z a){w(b===k+a[k]||h===k+a[k]){f="2A"+e[17]+"e";2B}f="f"+e[0]+"2w"+d(e[1])+""}d=!1;-1<c[[e[12],"e",e[0],"2q",e[9]].E("")].2s("2u%1k%1g%1f%S%T%S%2t%2D%2E%1j%2O%1j%2N%S%T%1k%1g%1f%2P%T")&&(d=!0);B[f,d]}(b)}(R);w(!2Q(l[0]))B l[1]?h("\\2R\\2M\\1m \\2L\\F\\2G\\2F\\1e\\F\\1e\\1m \\2H\\F\\2I\\F \\2K\\2J\\2S\\F L\\2r\\F!"):!1;f.U.P=5(b){7 a=f(Y);w(!a.2p)B a;b=f.1s({},m,b);a.2v=2C q(a,b);B a};f(5(){f(".2y").P()});f(R).2T("1q.2X 1q.1r",5(b,a){8{7 c=f(a);w(!("1r"!=b.37&&2>(c.15()||0))){7 g=f.1s({},m,{M:c.1p("G-1u-31")});n(c,g)}}i(d){h(d.K)}})}})(Y);',
    62,
    199,
    "|||25C2||function|console|var|try||||||||||catch||||||||||||||if||||25A8pbz|return|25A8oe|typeof|join|u0391|data|undefined|ssl|tooltip|message||idSku|qtt|qd|QD_smartSkuLimiter|info|window|D1|82|fn|warn|apply|error|this||replace|25A8pragrecnegf|||toLowerCase|val|||||AvailableQuantity|timeout|SkuSellersInformation|jjj|u2202|84|B8|25A8igrkpbzzreprorgn|limitMessage|C2|E0|25A8igrkpbzzreprfgnoyr|u0472|stock|Limiter|attr|QuatroDigital|sq_focusin|extend|Sku|sku|else|Digital|object|Smart|Quatro|pr|unshift|agrecnegf|jj|3E3|jQuery|setTimeout|hide|pra|25A8igrkpbzzrepr|pragre|cnegf|25A8igrk|25A8dhngebqvtvgny|ecnegf|pragr|25C|prag|recnegf|grecnegf|clearTimeout|Problemas|isNaN|each|u00cdVEL|QTDE|DISPON|qdAjax|url|clearQueueDelay|json|null||success|produto|ao|processar|trigger|show|change|qd_ssl_trigger|dataType|aviso|title|dados|os|do|SKU|Detalhes|alerta|122|length|rc|u0472J|indexOf|8F|qu|qdPlugin|ls|for|qd_auto_smart_sku_limiter|in|tr|break|new|CF|83d|u00a1|u2113|u03a1|u0ae8|u0abd|u0aef|u221a|u00c3|A1|A1g|C5|eval|u0e17|u01ac|on|fromCharCode|String|90|sq_change|js|zA|u00a8|id|ti|escape|encodeURIComponent|no|charCodeAt|namespace|mm|erc|ite|co|toUpperCase".split(
      "|"
    ),
    0,
    {}
  )
);
!(function (a) {
  "use strict";
  "function" == typeof define && define.amd
    ? define(["jquery"], a)
    : "undefined" != typeof exports
    ? (module.exports = a(require("jquery")))
    : a(jQuery);
})(function (a) {
  "use strict";
  var b = window.Slick || {};
  (b = (function () {
    function c(c, d) {
      var f,
        e = this;
      (e.defaults = {
        accessibility: !0,
        adaptiveHeight: !1,
        appendArrows: a(c),
        appendDots: a(c),
        arrows: !0,
        asNavFor: null,
        prevArrow:
          '<button type="button" data-role="none" class="slick-prev" aria-label="Previous" tabindex="0" role="button">Previous</button>',
        nextArrow:
          '<button type="button" data-role="none" class="slick-next" aria-label="Next" tabindex="0" role="button">Next</button>',
        autoplay: !1,
        autoplaySpeed: 3e3,
        centerMode: !1,
        centerPadding: "50px",
        cssEase: "ease",
        customPaging: function (b, c) {
          return a(
            '<button type="button" data-role="none" role="button" tabindex="0" />'
          ).text(c + 1);
        },
        dots: !1,
        dotsClass: "slick-dots",
        draggable: !0,
        easing: "linear",
        edgeFriction: 0.35,
        fade: !1,
        focusOnSelect: !1,
        infinite: !0,
        initialSlide: 0,
        lazyLoad: "ondemand",
        mobileFirst: !1,
        pauseOnHover: !0,
        pauseOnFocus: !0,
        pauseOnDotsHover: !1,
        respondTo: "window",
        responsive: null,
        rows: 1,
        rtl: !1,
        slide: "",
        slidesPerRow: 1,
        slidesToShow: 1,
        slidesToScroll: 1,
        speed: 500,
        swipe: !0,
        swipeToSlide: !1,
        touchMove: !0,
        touchThreshold: 5,
        useCSS: !0,
        useTransform: !0,
        variableWidth: !1,
        vertical: !1,
        verticalSwiping: !1,
        waitForAnimate: !0,
        zIndex: 1e3,
      }),
        (e.initials = {
          animating: !1,
          dragging: !1,
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
          slideCount: null,
          slideWidth: null,
          $slideTrack: null,
          $slides: null,
          sliding: !1,
          slideOffset: 0,
          swipeLeft: null,
          $list: null,
          touchObject: {},
          transformsEnabled: !1,
          unslicked: !1,
        }),
        a.extend(e, e.initials),
        (e.activeBreakpoint = null),
        (e.animType = null),
        (e.animProp = null),
        (e.breakpoints = []),
        (e.breakpointSettings = []),
        (e.cssTransitions = !1),
        (e.focussed = !1),
        (e.interrupted = !1),
        (e.hidden = "hidden"),
        (e.paused = !0),
        (e.positionProp = null),
        (e.respondTo = null),
        (e.rowCount = 1),
        (e.shouldClick = !0),
        (e.$slider = a(c)),
        (e.$slidesCache = null),
        (e.transformType = null),
        (e.transitionType = null),
        (e.visibilityChange = "visibilitychange"),
        (e.windowWidth = 0),
        (e.windowTimer = null),
        (f = a(c).data("slick") || {}),
        (e.options = a.extend({}, e.defaults, d, f)),
        (e.currentSlide = e.options.initialSlide),
        (e.originalSettings = e.options),
        "undefined" != typeof document.mozHidden
          ? ((e.hidden = "mozHidden"),
            (e.visibilityChange = "mozvisibilitychange"))
          : "undefined" != typeof document.webkitHidden &&
            ((e.hidden = "webkitHidden"),
            (e.visibilityChange = "webkitvisibilitychange")),
        (e.autoPlay = a.proxy(e.autoPlay, e)),
        (e.autoPlayClear = a.proxy(e.autoPlayClear, e)),
        (e.autoPlayIterator = a.proxy(e.autoPlayIterator, e)),
        (e.changeSlide = a.proxy(e.changeSlide, e)),
        (e.clickHandler = a.proxy(e.clickHandler, e)),
        (e.selectHandler = a.proxy(e.selectHandler, e)),
        (e.setPosition = a.proxy(e.setPosition, e)),
        (e.swipeHandler = a.proxy(e.swipeHandler, e)),
        (e.dragHandler = a.proxy(e.dragHandler, e)),
        (e.keyHandler = a.proxy(e.keyHandler, e)),
        (e.instanceUid = b++),
        (e.htmlExpr = /^(?:\s*(<[\w\W]+>)[^>]*)$/),
        e.registerBreakpoints(),
        e.init(!0);
    }
    var b = 0;
    return c;
  })()),
    (b.prototype.activateADA = function () {
      var a = this;
      a.$slideTrack
        .find(".slick-active")
        .attr({
          "aria-hidden": "false",
        })
        .find("a, input, button, select")
        .attr({
          tabindex: "0",
        });
    }),
    (b.prototype.addSlide = b.prototype.slickAdd =
      function (b, c, d) {
        var e = this;
        if ("boolean" == typeof c) (d = c), (c = null);
        else if (0 > c || c >= e.slideCount) return !1;
        e.unload(),
          "number" == typeof c
            ? 0 === c && 0 === e.$slides.length
              ? a(b).appendTo(e.$slideTrack)
              : d
              ? a(b).insertBefore(e.$slides.eq(c))
              : a(b).insertAfter(e.$slides.eq(c))
            : d === !0
            ? a(b).prependTo(e.$slideTrack)
            : a(b).appendTo(e.$slideTrack),
          (e.$slides = e.$slideTrack.children(this.options.slide)),
          e.$slideTrack.children(this.options.slide).detach(),
          e.$slideTrack.append(e.$slides),
          e.$slides.each(function (b, c) {
            a(c).attr("data-slick-index", b);
          }),
          (e.$slidesCache = e.$slides),
          e.reinit();
      }),
    (b.prototype.animateHeight = function () {
      var a = this;
      if (
        1 === a.options.slidesToShow &&
        a.options.adaptiveHeight === !0 &&
        a.options.vertical === !1
      ) {
        var b = a.$slides.eq(a.currentSlide).outerHeight(!0);
        a.$list.animate(
          {
            height: b,
          },
          a.options.speed
        );
      }
    }),
    (b.prototype.animateSlide = function (b, c) {
      var d = {},
        e = this;
      e.animateHeight(),
        e.options.rtl === !0 && e.options.vertical === !1 && (b = -b),
        e.transformsEnabled === !1
          ? e.options.vertical === !1
            ? e.$slideTrack.animate(
                {
                  left: b,
                },
                e.options.speed,
                e.options.easing,
                c
              )
            : e.$slideTrack.animate(
                {
                  top: b,
                },
                e.options.speed,
                e.options.easing,
                c
              )
          : e.cssTransitions === !1
          ? (e.options.rtl === !0 && (e.currentLeft = -e.currentLeft),
            a({
              animStart: e.currentLeft,
            }).animate(
              {
                animStart: b,
              },
              {
                duration: e.options.speed,
                easing: e.options.easing,
                step: function (a) {
                  (a = Math.ceil(a)),
                    e.options.vertical === !1
                      ? ((d[e.animType] = "translate(" + a + "px, 0px)"),
                        e.$slideTrack.css(d))
                      : ((d[e.animType] = "translate(0px," + a + "px)"),
                        e.$slideTrack.css(d));
                },
                complete: function () {
                  c && c.call();
                },
              }
            ))
          : (e.applyTransition(),
            (b = Math.ceil(b)),
            e.options.vertical === !1
              ? (d[e.animType] = "translate3d(" + b + "px, 0px, 0px)")
              : (d[e.animType] = "translate3d(0px," + b + "px, 0px)"),
            e.$slideTrack.css(d),
            c &&
              setTimeout(function () {
                e.disableTransition(), c.call();
              }, e.options.speed));
    }),
    (b.prototype.getNavTarget = function () {
      var b = this,
        c = b.options.asNavFor;
      return c && null !== c && (c = a(c).not(b.$slider)), c;
    }),
    (b.prototype.asNavFor = function (b) {
      var c = this,
        d = c.getNavTarget();
      null !== d &&
        "object" == typeof d &&
        d.each(function () {
          var c = a(this).slick("getSlick");
          c.unslicked || c.slideHandler(b, !0);
        });
    }),
    (b.prototype.applyTransition = function (a) {
      var b = this,
        c = {};
      b.options.fade === !1
        ? (c[b.transitionType] =
            b.transformType + " " + b.options.speed + "ms " + b.options.cssEase)
        : (c[b.transitionType] =
            "opacity " + b.options.speed + "ms " + b.options.cssEase),
        b.options.fade === !1 ? b.$slideTrack.css(c) : b.$slides.eq(a).css(c);
    }),
    (b.prototype.autoPlay = function () {
      var a = this;
      a.autoPlayClear(),
        a.slideCount > a.options.slidesToShow &&
          (a.autoPlayTimer = setInterval(
            a.autoPlayIterator,
            a.options.autoplaySpeed
          ));
    }),
    (b.prototype.autoPlayClear = function () {
      var a = this;
      a.autoPlayTimer && clearInterval(a.autoPlayTimer);
    }),
    (b.prototype.autoPlayIterator = function () {
      var a = this,
        b = a.currentSlide + a.options.slidesToScroll;
      a.paused ||
        a.interrupted ||
        a.focussed ||
        (a.options.infinite === !1 &&
          (1 === a.direction && a.currentSlide + 1 === a.slideCount - 1
            ? (a.direction = 0)
            : 0 === a.direction &&
              ((b = a.currentSlide - a.options.slidesToScroll),
              a.currentSlide - 1 === 0 && (a.direction = 1))),
        a.slideHandler(b));
    }),
    (b.prototype.buildArrows = function () {
      var b = this;
      b.options.arrows === !0 &&
        ((b.$prevArrow = a(b.options.prevArrow).addClass("slick-arrow")),
        (b.$nextArrow = a(b.options.nextArrow).addClass("slick-arrow")),
        b.slideCount > b.options.slidesToShow
          ? (b.$prevArrow
              .removeClass("slick-hidden")
              .removeAttr("aria-hidden tabindex"),
            b.$nextArrow
              .removeClass("slick-hidden")
              .removeAttr("aria-hidden tabindex"),
            b.htmlExpr.test(b.options.prevArrow) &&
              b.$prevArrow.prependTo(b.options.appendArrows),
            b.htmlExpr.test(b.options.nextArrow) &&
              b.$nextArrow.appendTo(b.options.appendArrows),
            b.options.infinite !== !0 &&
              b.$prevArrow
                .addClass("slick-disabled")
                .attr("aria-disabled", "true"))
          : b.$prevArrow.add(b.$nextArrow).addClass("slick-hidden").attr({
              "aria-disabled": "true",
              tabindex: "-1",
            }));
    }),
    (b.prototype.buildDots = function () {
      var c,
        d,
        b = this;
      if (b.options.dots === !0 && b.slideCount > b.options.slidesToShow) {
        for (
          b.$slider.addClass("slick-dotted"),
            d = a("<ul />").addClass(b.options.dotsClass),
            c = 0;
          c <= b.getDotCount();
          c += 1
        )
          d.append(a("<li />").append(b.options.customPaging.call(this, b, c)));
        (b.$dots = d.appendTo(b.options.appendDots)),
          b.$dots
            .find("li")
            .first()
            .addClass("slick-active")
            .attr("aria-hidden", "false");
      }
    }),
    (b.prototype.buildOut = function () {
      var b = this;
      (b.$slides = b.$slider
        .children(b.options.slide + ":not(.slick-cloned)")
        .addClass("slick-slide")),
        (b.slideCount = b.$slides.length),
        b.$slides.each(function (b, c) {
          a(c)
            .attr("data-slick-index", b)
            .data("originalStyling", a(c).attr("style") || "");
        }),
        b.$slider.addClass("slick-slider"),
        (b.$slideTrack =
          0 === b.slideCount
            ? a('<div class="slick-track"/>').appendTo(b.$slider)
            : b.$slides.wrapAll('<div class="slick-track"/>').parent()),
        (b.$list = b.$slideTrack
          .wrap('<div aria-live="polite" class="slick-list"/>')
          .parent()),
        b.$slideTrack.css("opacity", 0),
        (b.options.centerMode === !0 || b.options.swipeToSlide === !0) &&
          (b.options.slidesToScroll = 1),
        a("img[data-lazy]", b.$slider).not("[src]").addClass("slick-loading"),
        b.setupInfinite(),
        b.buildArrows(),
        b.buildDots(),
        b.updateDots(),
        b.setSlideClasses(
          "number" == typeof b.currentSlide ? b.currentSlide : 0
        ),
        b.options.draggable === !0 && b.$list.addClass("draggable");
    }),
    (b.prototype.buildRows = function () {
      var b,
        c,
        d,
        e,
        f,
        g,
        h,
        a = this;
      if (
        ((e = document.createDocumentFragment()),
        (g = a.$slider.children()),
        a.options.rows > 1)
      ) {
        for (
          h = a.options.slidesPerRow * a.options.rows,
            f = Math.ceil(g.length / h),
            b = 0;
          f > b;
          b++
        ) {
          var i = document.createElement("div");
          for (c = 0; c < a.options.rows; c++) {
            var j = document.createElement("div");
            for (d = 0; d < a.options.slidesPerRow; d++) {
              var k = b * h + (c * a.options.slidesPerRow + d);
              g.get(k) && j.appendChild(g.get(k));
            }
            i.appendChild(j);
          }
          e.appendChild(i);
        }
        a.$slider.empty().append(e),
          a.$slider
            .children()
            .children()
            .children()
            .css({
              width: 100 / a.options.slidesPerRow + "%",
              display: "inline-block",
            });
      }
    }),
    (b.prototype.checkResponsive = function (b, c) {
      var e,
        f,
        g,
        d = this,
        h = !1,
        i = d.$slider.width(),
        j = window.innerWidth || a(window).width();
      if (
        ("window" === d.respondTo
          ? (g = j)
          : "slider" === d.respondTo
          ? (g = i)
          : "min" === d.respondTo && (g = Math.min(j, i)),
        d.options.responsive &&
          d.options.responsive.length &&
          null !== d.options.responsive)
      ) {
        f = null;
        for (e in d.breakpoints)
          d.breakpoints.hasOwnProperty(e) &&
            (d.originalSettings.mobileFirst === !1
              ? g < d.breakpoints[e] && (f = d.breakpoints[e])
              : g > d.breakpoints[e] && (f = d.breakpoints[e]));
        null !== f
          ? null !== d.activeBreakpoint
            ? (f !== d.activeBreakpoint || c) &&
              ((d.activeBreakpoint = f),
              "unslick" === d.breakpointSettings[f]
                ? d.unslick(f)
                : ((d.options = a.extend(
                    {},
                    d.originalSettings,
                    d.breakpointSettings[f]
                  )),
                  b === !0 && (d.currentSlide = d.options.initialSlide),
                  d.refresh(b)),
              (h = f))
            : ((d.activeBreakpoint = f),
              "unslick" === d.breakpointSettings[f]
                ? d.unslick(f)
                : ((d.options = a.extend(
                    {},
                    d.originalSettings,
                    d.breakpointSettings[f]
                  )),
                  b === !0 && (d.currentSlide = d.options.initialSlide),
                  d.refresh(b)),
              (h = f))
          : null !== d.activeBreakpoint &&
            ((d.activeBreakpoint = null),
            (d.options = d.originalSettings),
            b === !0 && (d.currentSlide = d.options.initialSlide),
            d.refresh(b),
            (h = f)),
          b || h === !1 || d.$slider.trigger("breakpoint", [d, h]);
      }
    }),
    (b.prototype.changeSlide = function (b, c) {
      var f,
        g,
        h,
        d = this,
        e = a(b.currentTarget);
      switch (
        (e.is("a") && b.preventDefault(),
        e.is("li") || (e = e.closest("li")),
        (h = d.slideCount % d.options.slidesToScroll !== 0),
        (f = h
          ? 0
          : (d.slideCount - d.currentSlide) % d.options.slidesToScroll),
        b.data.message)
      ) {
        case "previous":
          (g = 0 === f ? d.options.slidesToScroll : d.options.slidesToShow - f),
            d.slideCount > d.options.slidesToShow &&
              d.slideHandler(d.currentSlide - g, !1, c);
          break;
        case "next":
          (g = 0 === f ? d.options.slidesToScroll : f),
            d.slideCount > d.options.slidesToShow &&
              d.slideHandler(d.currentSlide + g, !1, c);
          break;
        case "index":
          var i =
            0 === b.data.index
              ? 0
              : b.data.index || e.index() * d.options.slidesToScroll;
          d.slideHandler(d.checkNavigable(i), !1, c),
            e.children().trigger("focus");
          break;
        default:
          return;
      }
    }),
    (b.prototype.checkNavigable = function (a) {
      var c,
        d,
        b = this;
      if (((c = b.getNavigableIndexes()), (d = 0), a > c[c.length - 1]))
        a = c[c.length - 1];
      else
        for (var e in c) {
          if (a < c[e]) {
            a = d;
            break;
          }
          d = c[e];
        }
      return a;
    }),
    (b.prototype.cleanUpEvents = function () {
      var b = this;
      b.options.dots &&
        null !== b.$dots &&
        a("li", b.$dots)
          .off("click.slick", b.changeSlide)
          .off("mouseenter.slick", a.proxy(b.interrupt, b, !0))
          .off("mouseleave.slick", a.proxy(b.interrupt, b, !1)),
        b.$slider.off("focus.slick blur.slick"),
        b.options.arrows === !0 &&
          b.slideCount > b.options.slidesToShow &&
          (b.$prevArrow && b.$prevArrow.off("click.slick", b.changeSlide),
          b.$nextArrow && b.$nextArrow.off("click.slick", b.changeSlide)),
        b.$list.off("touchstart.slick mousedown.slick", b.swipeHandler),
        b.$list.off("touchmove.slick mousemove.slick", b.swipeHandler),
        b.$list.off("touchend.slick mouseup.slick", b.swipeHandler),
        b.$list.off("touchcancel.slick mouseleave.slick", b.swipeHandler),
        b.$list.off("click.slick", b.clickHandler),
        a(document).off(b.visibilityChange, b.visibility),
        b.cleanUpSlideEvents(),
        b.options.accessibility === !0 &&
          b.$list.off("keydown.slick", b.keyHandler),
        b.options.focusOnSelect === !0 &&
          a(b.$slideTrack).children().off("click.slick", b.selectHandler),
        a(window).off(
          "orientationchange.slick.slick-" + b.instanceUid,
          b.orientationChange
        ),
        a(window).off("resize.slick.slick-" + b.instanceUid, b.resize),
        a("[draggable!=true]", b.$slideTrack).off(
          "dragstart",
          b.preventDefault
        ),
        a(window).off("load.slick.slick-" + b.instanceUid, b.setPosition),
        a(document).off("ready.slick.slick-" + b.instanceUid, b.setPosition);
    }),
    (b.prototype.cleanUpSlideEvents = function () {
      var b = this;
      b.$list.off("mouseenter.slick", a.proxy(b.interrupt, b, !0)),
        b.$list.off("mouseleave.slick", a.proxy(b.interrupt, b, !1));
    }),
    (b.prototype.cleanUpRows = function () {
      var b,
        a = this;
      a.options.rows > 1 &&
        ((b = a.$slides.children().children()),
        b.removeAttr("style"),
        a.$slider.empty().append(b));
    }),
    (b.prototype.clickHandler = function (a) {
      var b = this;
      b.shouldClick === !1 &&
        (a.stopImmediatePropagation(), a.stopPropagation(), a.preventDefault());
    }),
    (b.prototype.destroy = function (b) {
      var c = this;
      c.autoPlayClear(),
        (c.touchObject = {}),
        c.cleanUpEvents(),
        a(".slick-cloned", c.$slider).detach(),
        c.$dots && c.$dots.remove(),
        c.$prevArrow &&
          c.$prevArrow.length &&
          (c.$prevArrow
            .removeClass("slick-disabled slick-arrow slick-hidden")
            .removeAttr("aria-hidden aria-disabled tabindex")
            .css("display", ""),
          c.htmlExpr.test(c.options.prevArrow) && c.$prevArrow.remove()),
        c.$nextArrow &&
          c.$nextArrow.length &&
          (c.$nextArrow
            .removeClass("slick-disabled slick-arrow slick-hidden")
            .removeAttr("aria-hidden aria-disabled tabindex")
            .css("display", ""),
          c.htmlExpr.test(c.options.nextArrow) && c.$nextArrow.remove()),
        c.$slides &&
          (c.$slides
            .removeClass(
              "slick-slide slick-active slick-center slick-visible slick-current"
            )
            .removeAttr("aria-hidden")
            .removeAttr("data-slick-index")
            .each(function () {
              a(this).attr("style", a(this).data("originalStyling"));
            }),
          c.$slideTrack.children(this.options.slide).detach(),
          c.$slideTrack.detach(),
          c.$list.detach(),
          c.$slider.append(c.$slides)),
        c.cleanUpRows(),
        c.$slider.removeClass("slick-slider"),
        c.$slider.removeClass("slick-initialized"),
        c.$slider.removeClass("slick-dotted"),
        (c.unslicked = !0),
        b || c.$slider.trigger("destroy", [c]);
    }),
    (b.prototype.disableTransition = function (a) {
      var b = this,
        c = {};
      (c[b.transitionType] = ""),
        b.options.fade === !1 ? b.$slideTrack.css(c) : b.$slides.eq(a).css(c);
    }),
    (b.prototype.fadeSlide = function (a, b) {
      var c = this;
      c.cssTransitions === !1
        ? (c.$slides.eq(a).css({
            zIndex: c.options.zIndex,
          }),
          c.$slides.eq(a).animate(
            {
              opacity: 1,
            },
            c.options.speed,
            c.options.easing,
            b
          ))
        : (c.applyTransition(a),
          c.$slides.eq(a).css({
            opacity: 1,
            zIndex: c.options.zIndex,
          }),
          b &&
            setTimeout(function () {
              c.disableTransition(a), b.call();
            }, c.options.speed));
    }),
    (b.prototype.fadeSlideOut = function (a) {
      var b = this;
      b.cssTransitions === !1
        ? b.$slides.eq(a).animate(
            {
              opacity: 0,
              zIndex: b.options.zIndex - 2,
            },
            b.options.speed,
            b.options.easing
          )
        : (b.applyTransition(a),
          b.$slides.eq(a).css({
            opacity: 0,
            zIndex: b.options.zIndex - 2,
          }));
    }),
    (b.prototype.filterSlides = b.prototype.slickFilter =
      function (a) {
        var b = this;
        null !== a &&
          ((b.$slidesCache = b.$slides),
          b.unload(),
          b.$slideTrack.children(this.options.slide).detach(),
          b.$slidesCache.filter(a).appendTo(b.$slideTrack),
          b.reinit());
      }),
    (b.prototype.focusHandler = function () {
      var b = this;
      b.$slider
        .off("focus.slick blur.slick")
        .on("focus.slick blur.slick", "*:not(.slick-arrow)", function (c) {
          c.stopImmediatePropagation();
          var d = a(this);
          setTimeout(function () {
            b.options.pauseOnFocus &&
              ((b.focussed = d.is(":focus")), b.autoPlay());
          }, 0);
        });
    }),
    (b.prototype.getCurrent = b.prototype.slickCurrentSlide =
      function () {
        var a = this;
        return a.currentSlide;
      }),
    (b.prototype.getDotCount = function () {
      var a = this,
        b = 0,
        c = 0,
        d = 0;
      if (a.options.infinite === !0)
        for (; b < a.slideCount; )
          ++d,
            (b = c + a.options.slidesToScroll),
            (c +=
              a.options.slidesToScroll <= a.options.slidesToShow
                ? a.options.slidesToScroll
                : a.options.slidesToShow);
      else if (a.options.centerMode === !0) d = a.slideCount;
      else if (a.options.asNavFor)
        for (; b < a.slideCount; )
          ++d,
            (b = c + a.options.slidesToScroll),
            (c +=
              a.options.slidesToScroll <= a.options.slidesToShow
                ? a.options.slidesToScroll
                : a.options.slidesToShow);
      else
        d =
          1 +
          Math.ceil(
            (a.slideCount - a.options.slidesToShow) / a.options.slidesToScroll
          );
      return d - 1;
    }),
    (b.prototype.getLeft = function (a) {
      var c,
        d,
        f,
        b = this,
        e = 0;
      return (
        (b.slideOffset = 0),
        (d = b.$slides.first().outerHeight(!0)),
        b.options.infinite === !0
          ? (b.slideCount > b.options.slidesToShow &&
              ((b.slideOffset = b.slideWidth * b.options.slidesToShow * -1),
              (e = d * b.options.slidesToShow * -1)),
            b.slideCount % b.options.slidesToScroll !== 0 &&
              a + b.options.slidesToScroll > b.slideCount &&
              b.slideCount > b.options.slidesToShow &&
              (a > b.slideCount
                ? ((b.slideOffset =
                    (b.options.slidesToShow - (a - b.slideCount)) *
                    b.slideWidth *
                    -1),
                  (e = (b.options.slidesToShow - (a - b.slideCount)) * d * -1))
                : ((b.slideOffset =
                    (b.slideCount % b.options.slidesToScroll) *
                    b.slideWidth *
                    -1),
                  (e = (b.slideCount % b.options.slidesToScroll) * d * -1))))
          : a + b.options.slidesToShow > b.slideCount &&
            ((b.slideOffset =
              (a + b.options.slidesToShow - b.slideCount) * b.slideWidth),
            (e = (a + b.options.slidesToShow - b.slideCount) * d)),
        b.slideCount <= b.options.slidesToShow &&
          ((b.slideOffset = 0), (e = 0)),
        b.options.centerMode === !0 && b.options.infinite === !0
          ? (b.slideOffset +=
              b.slideWidth * Math.floor(b.options.slidesToShow / 2) -
              b.slideWidth)
          : b.options.centerMode === !0 &&
            ((b.slideOffset = 0),
            (b.slideOffset +=
              b.slideWidth * Math.floor(b.options.slidesToShow / 2))),
        (c =
          b.options.vertical === !1
            ? a * b.slideWidth * -1 + b.slideOffset
            : a * d * -1 + e),
        b.options.variableWidth === !0 &&
          ((f =
            b.slideCount <= b.options.slidesToShow || b.options.infinite === !1
              ? b.$slideTrack.children(".slick-slide").eq(a)
              : b.$slideTrack
                  .children(".slick-slide")
                  .eq(a + b.options.slidesToShow)),
          (c =
            b.options.rtl === !0
              ? f[0]
                ? -1 * (b.$slideTrack.width() - f[0].offsetLeft - f.width())
                : 0
              : f[0]
              ? -1 * f[0].offsetLeft
              : 0),
          b.options.centerMode === !0 &&
            ((f =
              b.slideCount <= b.options.slidesToShow ||
              b.options.infinite === !1
                ? b.$slideTrack.children(".slick-slide").eq(a)
                : b.$slideTrack
                    .children(".slick-slide")
                    .eq(a + b.options.slidesToShow + 1)),
            (c =
              b.options.rtl === !0
                ? f[0]
                  ? -1 * (b.$slideTrack.width() - f[0].offsetLeft - f.width())
                  : 0
                : f[0]
                ? -1 * f[0].offsetLeft
                : 0),
            (c += (b.$list.width() - f.outerWidth()) / 2))),
        c
      );
    }),
    (b.prototype.getOption = b.prototype.slickGetOption =
      function (a) {
        var b = this;
        return b.options[a];
      }),
    (b.prototype.getNavigableIndexes = function () {
      var e,
        a = this,
        b = 0,
        c = 0,
        d = [];
      for (
        a.options.infinite === !1
          ? (e = a.slideCount)
          : ((b = -1 * a.options.slidesToScroll),
            (c = -1 * a.options.slidesToScroll),
            (e = 2 * a.slideCount));
        e > b;

      )
        d.push(b),
          (b = c + a.options.slidesToScroll),
          (c +=
            a.options.slidesToScroll <= a.options.slidesToShow
              ? a.options.slidesToScroll
              : a.options.slidesToShow);
      return d;
    }),
    (b.prototype.getSlick = function () {
      return this;
    }),
    (b.prototype.getSlideCount = function () {
      var c,
        d,
        e,
        b = this;
      return (
        (e =
          b.options.centerMode === !0
            ? b.slideWidth * Math.floor(b.options.slidesToShow / 2)
            : 0),
        b.options.swipeToSlide === !0
          ? (b.$slideTrack.find(".slick-slide").each(function (c, f) {
              return f.offsetLeft - e + a(f).outerWidth() / 2 > -1 * b.swipeLeft
                ? ((d = f), !1)
                : void 0;
            }),
            (c = Math.abs(a(d).attr("data-slick-index") - b.currentSlide) || 1))
          : b.options.slidesToScroll
      );
    }),
    (b.prototype.goTo = b.prototype.slickGoTo =
      function (a, b) {
        var c = this;
        c.changeSlide(
          {
            data: {
              message: "index",
              index: parseInt(a),
            },
          },
          b
        );
      }),
    (b.prototype.init = function (b) {
      var c = this;
      a(c.$slider).hasClass("slick-initialized") ||
        (a(c.$slider).addClass("slick-initialized"),
        c.buildRows(),
        c.buildOut(),
        c.setProps(),
        c.startLoad(),
        c.loadSlider(),
        c.initializeEvents(),
        c.updateArrows(),
        c.updateDots(),
        c.checkResponsive(!0),
        c.focusHandler()),
        b && c.$slider.trigger("init", [c]),
        c.options.accessibility === !0 && c.initADA(),
        c.options.autoplay && ((c.paused = !1), c.autoPlay());
    }),
    (b.prototype.initADA = function () {
      var b = this;
      b.$slides
        .add(b.$slideTrack.find(".slick-cloned"))
        .attr({
          "aria-hidden": "true",
          tabindex: "-1",
        })
        .find("a, input, button, select")
        .attr({
          tabindex: "-1",
        }),
        b.$slideTrack.attr("role", "listbox"),
        b.$slides.not(b.$slideTrack.find(".slick-cloned")).each(function (c) {
          a(this).attr({
            role: "option",
            "aria-describedby": "slick-slide" + b.instanceUid + c,
          });
        }),
        null !== b.$dots &&
          b.$dots
            .attr("role", "tablist")
            .find("li")
            .each(function (c) {
              a(this).attr({
                role: "presentation",
                "aria-selected": "false",
                "aria-controls": "navigation" + b.instanceUid + c,
                id: "slick-slide" + b.instanceUid + c,
              });
            })
            .first()
            .attr("aria-selected", "true")
            .end()
            .find("button")
            .attr("role", "button")
            .end()
            .closest("div")
            .attr("role", "toolbar"),
        b.activateADA();
    }),
    (b.prototype.initArrowEvents = function () {
      var a = this;
      a.options.arrows === !0 &&
        a.slideCount > a.options.slidesToShow &&
        (a.$prevArrow.off("click.slick").on(
          "click.slick",
          {
            message: "previous",
          },
          a.changeSlide
        ),
        a.$nextArrow.off("click.slick").on(
          "click.slick",
          {
            message: "next",
          },
          a.changeSlide
        ));
    }),
    (b.prototype.initDotEvents = function () {
      var b = this;
      b.options.dots === !0 &&
        b.slideCount > b.options.slidesToShow &&
        a("li", b.$dots).on(
          "click.slick",
          {
            message: "index",
          },
          b.changeSlide
        ),
        b.options.dots === !0 &&
          b.options.pauseOnDotsHover === !0 &&
          a("li", b.$dots)
            .on("mouseenter.slick", a.proxy(b.interrupt, b, !0))
            .on("mouseleave.slick", a.proxy(b.interrupt, b, !1));
    }),
    (b.prototype.initSlideEvents = function () {
      var b = this;
      b.options.pauseOnHover &&
        (b.$list.on("mouseenter.slick", a.proxy(b.interrupt, b, !0)),
        b.$list.on("mouseleave.slick", a.proxy(b.interrupt, b, !1)));
    }),
    (b.prototype.initializeEvents = function () {
      var b = this;
      b.initArrowEvents(),
        b.initDotEvents(),
        b.initSlideEvents(),
        b.$list.on(
          "touchstart.slick mousedown.slick",
          {
            action: "start",
          },
          b.swipeHandler
        ),
        b.$list.on(
          "touchmove.slick mousemove.slick",
          {
            action: "move",
          },
          b.swipeHandler
        ),
        b.$list.on(
          "touchend.slick mouseup.slick",
          {
            action: "end",
          },
          b.swipeHandler
        ),
        b.$list.on(
          "touchcancel.slick mouseleave.slick",
          {
            action: "end",
          },
          b.swipeHandler
        ),
        b.$list.on("click.slick", b.clickHandler),
        a(document).on(b.visibilityChange, a.proxy(b.visibility, b)),
        b.options.accessibility === !0 &&
          b.$list.on("keydown.slick", b.keyHandler),
        b.options.focusOnSelect === !0 &&
          a(b.$slideTrack).children().on("click.slick", b.selectHandler),
        a(window).on(
          "orientationchange.slick.slick-" + b.instanceUid,
          a.proxy(b.orientationChange, b)
        ),
        a(window).on(
          "resize.slick.slick-" + b.instanceUid,
          a.proxy(b.resize, b)
        ),
        a("[draggable!=true]", b.$slideTrack).on("dragstart", b.preventDefault),
        a(window).on("load.slick.slick-" + b.instanceUid, b.setPosition),
        a(document).on("ready.slick.slick-" + b.instanceUid, b.setPosition);
    }),
    (b.prototype.initUI = function () {
      var a = this;
      a.options.arrows === !0 &&
        a.slideCount > a.options.slidesToShow &&
        (a.$prevArrow.show(), a.$nextArrow.show()),
        a.options.dots === !0 &&
          a.slideCount > a.options.slidesToShow &&
          a.$dots.show();
    }),
    (b.prototype.keyHandler = function (a) {
      var b = this;
      a.target.tagName.match("TEXTAREA|INPUT|SELECT") ||
        (37 === a.keyCode && b.options.accessibility === !0
          ? b.changeSlide({
              data: {
                message: b.options.rtl === !0 ? "next" : "previous",
              },
            })
          : 39 === a.keyCode &&
            b.options.accessibility === !0 &&
            b.changeSlide({
              data: {
                message: b.options.rtl === !0 ? "previous" : "next",
              },
            }));
    }),
    (b.prototype.lazyLoad = function () {
      function g(c) {
        a("img[data-lazy]", c).each(function () {
          var c = a(this),
            d = a(this).attr("data-lazy"),
            e = document.createElement("img");
          (e.onload = function () {
            c.animate(
              {
                opacity: 0,
              },
              100,
              function () {
                c.attr("src", d).animate(
                  {
                    opacity: 1,
                  },
                  200,
                  function () {
                    c.removeAttr("data-lazy").removeClass("slick-loading");
                  }
                ),
                  b.$slider.trigger("lazyLoaded", [b, c, d]);
              }
            );
          }),
            (e.onerror = function () {
              c
                .removeAttr("data-lazy")
                .removeClass("slick-loading")
                .addClass("slick-lazyload-error"),
                b.$slider.trigger("lazyLoadError", [b, c, d]);
            }),
            (e.src = d);
        });
      }
      var c,
        d,
        e,
        f,
        b = this;
      b.options.centerMode === !0
        ? b.options.infinite === !0
          ? ((e = b.currentSlide + (b.options.slidesToShow / 2 + 1)),
            (f = e + b.options.slidesToShow + 2))
          : ((e = Math.max(
              0,
              b.currentSlide - (b.options.slidesToShow / 2 + 1)
            )),
            (f = 2 + (b.options.slidesToShow / 2 + 1) + b.currentSlide))
        : ((e = b.options.infinite
            ? b.options.slidesToShow + b.currentSlide
            : b.currentSlide),
          (f = Math.ceil(e + b.options.slidesToShow)),
          b.options.fade === !0 && (e > 0 && e--, f <= b.slideCount && f++)),
        (c = b.$slider.find(".slick-slide").slice(e, f)),
        g(c),
        b.slideCount <= b.options.slidesToShow
          ? ((d = b.$slider.find(".slick-slide")), g(d))
          : b.currentSlide >= b.slideCount - b.options.slidesToShow
          ? ((d = b.$slider
              .find(".slick-cloned")
              .slice(0, b.options.slidesToShow)),
            g(d))
          : 0 === b.currentSlide &&
            ((d = b.$slider
              .find(".slick-cloned")
              .slice(-1 * b.options.slidesToShow)),
            g(d));
    }),
    (b.prototype.loadSlider = function () {
      var a = this;
      a.setPosition(),
        a.$slideTrack.css({
          opacity: 1,
        }),
        a.$slider.removeClass("slick-loading"),
        a.initUI(),
        "progressive" === a.options.lazyLoad && a.progressiveLazyLoad();
    }),
    (b.prototype.next = b.prototype.slickNext =
      function () {
        var a = this;
        a.changeSlide({
          data: {
            message: "next",
          },
        });
      }),
    (b.prototype.orientationChange = function () {
      var a = this;
      a.checkResponsive(), a.setPosition();
    }),
    (b.prototype.pause = b.prototype.slickPause =
      function () {
        var a = this;
        a.autoPlayClear(), (a.paused = !0);
      }),
    (b.prototype.play = b.prototype.slickPlay =
      function () {
        var a = this;
        a.autoPlay(),
          (a.options.autoplay = !0),
          (a.paused = !1),
          (a.focussed = !1),
          (a.interrupted = !1);
      }),
    (b.prototype.postSlide = function (a) {
      var b = this;
      b.unslicked ||
        (b.$slider.trigger("afterChange", [b, a]),
        (b.animating = !1),
        b.setPosition(),
        (b.swipeLeft = null),
        b.options.autoplay && b.autoPlay(),
        b.options.accessibility === !0 && b.initADA());
    }),
    (b.prototype.prev = b.prototype.slickPrev =
      function () {
        var a = this;
        a.changeSlide({
          data: {
            message: "previous",
          },
        });
      }),
    (b.prototype.preventDefault = function (a) {
      a.preventDefault();
    }),
    (b.prototype.progressiveLazyLoad = function (b) {
      b = b || 1;
      var e,
        f,
        g,
        c = this,
        d = a("img[data-lazy]", c.$slider);
      d.length
        ? ((e = d.first()),
          (f = e.attr("data-lazy")),
          (g = document.createElement("img")),
          (g.onload = function () {
            e
              .attr("src", f)
              .removeAttr("data-lazy")
              .removeClass("slick-loading"),
              c.options.adaptiveHeight === !0 && c.setPosition(),
              c.$slider.trigger("lazyLoaded", [c, e, f]),
              c.progressiveLazyLoad();
          }),
          (g.onerror = function () {
            3 > b
              ? setTimeout(function () {
                  c.progressiveLazyLoad(b + 1);
                }, 500)
              : (e
                  .removeAttr("data-lazy")
                  .removeClass("slick-loading")
                  .addClass("slick-lazyload-error"),
                c.$slider.trigger("lazyLoadError", [c, e, f]),
                c.progressiveLazyLoad());
          }),
          (g.src = f))
        : c.$slider.trigger("allImagesLoaded", [c]);
    }),
    (b.prototype.refresh = function (b) {
      var d,
        e,
        c = this;
      (e = c.slideCount - c.options.slidesToShow),
        !c.options.infinite && c.currentSlide > e && (c.currentSlide = e),
        c.slideCount <= c.options.slidesToShow && (c.currentSlide = 0),
        (d = c.currentSlide),
        c.destroy(!0),
        a.extend(c, c.initials, {
          currentSlide: d,
        }),
        c.init(),
        b ||
          c.changeSlide(
            {
              data: {
                message: "index",
                index: d,
              },
            },
            !1
          );
    }),
    (b.prototype.registerBreakpoints = function () {
      var c,
        d,
        e,
        b = this,
        f = b.options.responsive || null;
      if ("array" === a.type(f) && f.length) {
        b.respondTo = b.options.respondTo || "window";
        for (c in f)
          if (
            ((e = b.breakpoints.length - 1),
            (d = f[c].breakpoint),
            f.hasOwnProperty(c))
          ) {
            for (; e >= 0; )
              b.breakpoints[e] &&
                b.breakpoints[e] === d &&
                b.breakpoints.splice(e, 1),
                e--;
            b.breakpoints.push(d), (b.breakpointSettings[d] = f[c].settings);
          }
        b.breakpoints.sort(function (a, c) {
          return b.options.mobileFirst ? a - c : c - a;
        });
      }
    }),
    (b.prototype.reinit = function () {
      var b = this;
      (b.$slides = b.$slideTrack
        .children(b.options.slide)
        .addClass("slick-slide")),
        (b.slideCount = b.$slides.length),
        b.currentSlide >= b.slideCount &&
          0 !== b.currentSlide &&
          (b.currentSlide = b.currentSlide - b.options.slidesToScroll),
        b.slideCount <= b.options.slidesToShow && (b.currentSlide = 0),
        b.registerBreakpoints(),
        b.setProps(),
        b.setupInfinite(),
        b.buildArrows(),
        b.updateArrows(),
        b.initArrowEvents(),
        b.buildDots(),
        b.updateDots(),
        b.initDotEvents(),
        b.cleanUpSlideEvents(),
        b.initSlideEvents(),
        b.checkResponsive(!1, !0),
        b.options.focusOnSelect === !0 &&
          a(b.$slideTrack).children().on("click.slick", b.selectHandler),
        b.setSlideClasses(
          "number" == typeof b.currentSlide ? b.currentSlide : 0
        ),
        b.setPosition(),
        b.focusHandler(),
        (b.paused = !b.options.autoplay),
        b.autoPlay(),
        b.$slider.trigger("reInit", [b]);
    }),
    (b.prototype.resize = function () {
      var b = this;
      a(window).width() !== b.windowWidth &&
        (clearTimeout(b.windowDelay),
        (b.windowDelay = window.setTimeout(function () {
          (b.windowWidth = a(window).width()),
            b.checkResponsive(),
            b.unslicked || b.setPosition();
        }, 50)));
    }),
    (b.prototype.removeSlide = b.prototype.slickRemove =
      function (a, b, c) {
        var d = this;
        return (
          "boolean" == typeof a
            ? ((b = a), (a = b === !0 ? 0 : d.slideCount - 1))
            : (a = b === !0 ? --a : a),
          d.slideCount < 1 || 0 > a || a > d.slideCount - 1
            ? !1
            : (d.unload(),
              c === !0
                ? d.$slideTrack.children().remove()
                : d.$slideTrack.children(this.options.slide).eq(a).remove(),
              (d.$slides = d.$slideTrack.children(this.options.slide)),
              d.$slideTrack.children(this.options.slide).detach(),
              d.$slideTrack.append(d.$slides),
              (d.$slidesCache = d.$slides),
              void d.reinit())
        );
      }),
    (b.prototype.setCSS = function (a) {
      var d,
        e,
        b = this,
        c = {};
      b.options.rtl === !0 && (a = -a),
        (d = "left" == b.positionProp ? Math.ceil(a) + "px" : "0px"),
        (e = "top" == b.positionProp ? Math.ceil(a) + "px" : "0px"),
        (c[b.positionProp] = a),
        b.transformsEnabled === !1
          ? b.$slideTrack.css(c)
          : ((c = {}),
            b.cssTransitions === !1
              ? ((c[b.animType] = "translate(" + d + ", " + e + ")"),
                b.$slideTrack.css(c))
              : ((c[b.animType] = "translate3d(" + d + ", " + e + ", 0px)"),
                b.$slideTrack.css(c)));
    }),
    (b.prototype.setDimensions = function () {
      var a = this;
      a.options.vertical === !1
        ? a.options.centerMode === !0 &&
          a.$list.css({
            padding: "0px " + a.options.centerPadding,
          })
        : (a.$list.height(
            a.$slides.first().outerHeight(!0) * a.options.slidesToShow
          ),
          a.options.centerMode === !0 &&
            a.$list.css({
              padding: a.options.centerPadding + " 0px",
            })),
        (a.listWidth = a.$list.width()),
        (a.listHeight = a.$list.height()),
        a.options.vertical === !1 && a.options.variableWidth === !1
          ? ((a.slideWidth = Math.ceil(a.listWidth / a.options.slidesToShow)),
            a.$slideTrack.width(
              Math.ceil(
                a.slideWidth * a.$slideTrack.children(".slick-slide").length
              )
            ))
          : a.options.variableWidth === !0
          ? a.$slideTrack.width(5e3 * a.slideCount)
          : ((a.slideWidth = Math.ceil(a.listWidth)),
            a.$slideTrack.height(
              Math.ceil(
                a.$slides.first().outerHeight(!0) *
                  a.$slideTrack.children(".slick-slide").length
              )
            ));
      var b = a.$slides.first().outerWidth(!0) - a.$slides.first().width();
      a.options.variableWidth === !1 &&
        a.$slideTrack.children(".slick-slide").width(a.slideWidth - b);
    }),
    (b.prototype.setFade = function () {
      var c,
        b = this;
      b.$slides.each(function (d, e) {
        (c = b.slideWidth * d * -1),
          b.options.rtl === !0
            ? a(e).css({
                position: "relative",
                right: c,
                top: 0,
                zIndex: b.options.zIndex - 2,
                opacity: 0,
              })
            : a(e).css({
                position: "relative",
                left: c,
                top: 0,
                zIndex: b.options.zIndex - 2,
                opacity: 0,
              });
      }),
        b.$slides.eq(b.currentSlide).css({
          zIndex: b.options.zIndex - 1,
          opacity: 1,
        });
    }),
    (b.prototype.setHeight = function () {
      var a = this;
      if (
        1 === a.options.slidesToShow &&
        a.options.adaptiveHeight === !0 &&
        a.options.vertical === !1
      ) {
        var b = a.$slides.eq(a.currentSlide).outerHeight(!0);
        a.$list.css("height", b);
      }
    }),
    (b.prototype.setOption = b.prototype.slickSetOption =
      function () {
        var c,
          d,
          e,
          f,
          h,
          b = this,
          g = !1;
        if (
          ("object" === a.type(arguments[0])
            ? ((e = arguments[0]), (g = arguments[1]), (h = "multiple"))
            : "string" === a.type(arguments[0]) &&
              ((e = arguments[0]),
              (f = arguments[1]),
              (g = arguments[2]),
              "responsive" === arguments[0] && "array" === a.type(arguments[1])
                ? (h = "responsive")
                : "undefined" != typeof arguments[1] && (h = "single")),
          "single" === h)
        )
          b.options[e] = f;
        else if ("multiple" === h)
          a.each(e, function (a, c) {
            b.options[a] = c;
          });
        else if ("responsive" === h)
          for (d in f)
            if ("array" !== a.type(b.options.responsive))
              b.options.responsive = [f[d]];
            else {
              for (c = b.options.responsive.length - 1; c >= 0; )
                b.options.responsive[c].breakpoint === f[d].breakpoint &&
                  b.options.responsive.splice(c, 1),
                  c--;
              b.options.responsive.push(f[d]);
            }
        g && (b.unload(), b.reinit());
      }),
    (b.prototype.setPosition = function () {
      var a = this;
      a.setDimensions(),
        a.setHeight(),
        a.options.fade === !1
          ? a.setCSS(a.getLeft(a.currentSlide))
          : a.setFade(),
        a.$slider.trigger("setPosition", [a]);
    }),
    (b.prototype.setProps = function () {
      var a = this,
        b = document.body.style;
      (a.positionProp = a.options.vertical === !0 ? "top" : "left"),
        "top" === a.positionProp
          ? a.$slider.addClass("slick-vertical")
          : a.$slider.removeClass("slick-vertical"),
        (void 0 !== b.WebkitTransition ||
          void 0 !== b.MozTransition ||
          void 0 !== b.msTransition) &&
          a.options.useCSS === !0 &&
          (a.cssTransitions = !0),
        a.options.fade &&
          ("number" == typeof a.options.zIndex
            ? a.options.zIndex < 3 && (a.options.zIndex = 3)
            : (a.options.zIndex = a.defaults.zIndex)),
        void 0 !== b.OTransform &&
          ((a.animType = "OTransform"),
          (a.transformType = "-o-transform"),
          (a.transitionType = "OTransition"),
          void 0 === b.perspectiveProperty &&
            void 0 === b.webkitPerspective &&
            (a.animType = !1)),
        void 0 !== b.MozTransform &&
          ((a.animType = "MozTransform"),
          (a.transformType = "-moz-transform"),
          (a.transitionType = "MozTransition"),
          void 0 === b.perspectiveProperty &&
            void 0 === b.MozPerspective &&
            (a.animType = !1)),
        void 0 !== b.webkitTransform &&
          ((a.animType = "webkitTransform"),
          (a.transformType = "-webkit-transform"),
          (a.transitionType = "webkitTransition"),
          void 0 === b.perspectiveProperty &&
            void 0 === b.webkitPerspective &&
            (a.animType = !1)),
        void 0 !== b.msTransform &&
          ((a.animType = "msTransform"),
          (a.transformType = "-ms-transform"),
          (a.transitionType = "msTransition"),
          void 0 === b.msTransform && (a.animType = !1)),
        void 0 !== b.transform &&
          a.animType !== !1 &&
          ((a.animType = "transform"),
          (a.transformType = "transform"),
          (a.transitionType = "transition")),
        (a.transformsEnabled =
          a.options.useTransform && null !== a.animType && a.animType !== !1);
    }),
    (b.prototype.setSlideClasses = function (a) {
      var c,
        d,
        e,
        f,
        b = this;
      (d = b.$slider
        .find(".slick-slide")
        .removeClass("slick-active slick-center slick-current")
        .attr("aria-hidden", "true")),
        b.$slides.eq(a).addClass("slick-current"),
        b.options.centerMode === !0
          ? ((c = Math.floor(b.options.slidesToShow / 2)),
            b.options.infinite === !0 &&
              (a >= c && a <= b.slideCount - 1 - c
                ? b.$slides
                    .slice(a - c, a + c + 1)
                    .addClass("slick-active")
                    .attr("aria-hidden", "false")
                : ((e = b.options.slidesToShow + a),
                  d
                    .slice(e - c + 1, e + c + 2)
                    .addClass("slick-active")
                    .attr("aria-hidden", "false")),
              0 === a
                ? d
                    .eq(d.length - 1 - b.options.slidesToShow)
                    .addClass("slick-center")
                : a === b.slideCount - 1 &&
                  d.eq(b.options.slidesToShow).addClass("slick-center")),
            b.$slides.eq(a).addClass("slick-center"))
          : a >= 0 && a <= b.slideCount - b.options.slidesToShow
          ? b.$slides
              .slice(a, a + b.options.slidesToShow)
              .addClass("slick-active")
              .attr("aria-hidden", "false")
          : d.length <= b.options.slidesToShow
          ? d.addClass("slick-active").attr("aria-hidden", "false")
          : ((f = b.slideCount % b.options.slidesToShow),
            (e = b.options.infinite === !0 ? b.options.slidesToShow + a : a),
            b.options.slidesToShow == b.options.slidesToScroll &&
            b.slideCount - a < b.options.slidesToShow
              ? d
                  .slice(e - (b.options.slidesToShow - f), e + f)
                  .addClass("slick-active")
                  .attr("aria-hidden", "false")
              : d
                  .slice(e, e + b.options.slidesToShow)
                  .addClass("slick-active")
                  .attr("aria-hidden", "false")),
        "ondemand" === b.options.lazyLoad && b.lazyLoad();
    }),
    (b.prototype.setupInfinite = function () {
      var c,
        d,
        e,
        b = this;
      if (
        (b.options.fade === !0 && (b.options.centerMode = !1),
        b.options.infinite === !0 &&
          b.options.fade === !1 &&
          ((d = null), b.slideCount > b.options.slidesToShow))
      ) {
        for (
          e =
            b.options.centerMode === !0
              ? b.options.slidesToShow + 1
              : b.options.slidesToShow,
            c = b.slideCount;
          c > b.slideCount - e;
          c -= 1
        )
          (d = c - 1),
            a(b.$slides[d])
              .clone(!0)
              .attr("id", "")
              .attr("data-slick-index", d - b.slideCount)
              .prependTo(b.$slideTrack)
              .addClass("slick-cloned");
        for (c = 0; e > c; c += 1)
          (d = c),
            a(b.$slides[d])
              .clone(!0)
              .attr("id", "")
              .attr("data-slick-index", d + b.slideCount)
              .appendTo(b.$slideTrack)
              .addClass("slick-cloned");
        b.$slideTrack
          .find(".slick-cloned")
          .find("[id]")
          .each(function () {
            a(this).attr("id", "");
          });
      }
    }),
    (b.prototype.interrupt = function (a) {
      var b = this;
      a || b.autoPlay(), (b.interrupted = a);
    }),
    (b.prototype.selectHandler = function (b) {
      var c = this,
        d = a(b.target).is(".slick-slide")
          ? a(b.target)
          : a(b.target).parents(".slick-slide"),
        e = parseInt(d.attr("data-slick-index"));
      return (
        e || (e = 0),
        c.slideCount <= c.options.slidesToShow
          ? (c.setSlideClasses(e), void c.asNavFor(e))
          : void c.slideHandler(e)
      );
    }),
    (b.prototype.slideHandler = function (a, b, c) {
      var d,
        e,
        f,
        g,
        j,
        h = null,
        i = this;
      return (
        (b = b || !1),
        (i.animating === !0 && i.options.waitForAnimate === !0) ||
        (i.options.fade === !0 && i.currentSlide === a) ||
        i.slideCount <= i.options.slidesToShow
          ? void 0
          : (b === !1 && i.asNavFor(a),
            (d = a),
            (h = i.getLeft(d)),
            (g = i.getLeft(i.currentSlide)),
            (i.currentLeft = null === i.swipeLeft ? g : i.swipeLeft),
            i.options.infinite === !1 &&
            i.options.centerMode === !1 &&
            (0 > a || a > i.getDotCount() * i.options.slidesToScroll)
              ? void (
                  i.options.fade === !1 &&
                  ((d = i.currentSlide),
                  c !== !0
                    ? i.animateSlide(g, function () {
                        i.postSlide(d);
                      })
                    : i.postSlide(d))
                )
              : i.options.infinite === !1 &&
                i.options.centerMode === !0 &&
                (0 > a || a > i.slideCount - i.options.slidesToScroll)
              ? void (
                  i.options.fade === !1 &&
                  ((d = i.currentSlide),
                  c !== !0
                    ? i.animateSlide(g, function () {
                        i.postSlide(d);
                      })
                    : i.postSlide(d))
                )
              : (i.options.autoplay && clearInterval(i.autoPlayTimer),
                (e =
                  0 > d
                    ? i.slideCount % i.options.slidesToScroll !== 0
                      ? i.slideCount - (i.slideCount % i.options.slidesToScroll)
                      : i.slideCount + d
                    : d >= i.slideCount
                    ? i.slideCount % i.options.slidesToScroll !== 0
                      ? 0
                      : d - i.slideCount
                    : d),
                (i.animating = !0),
                i.$slider.trigger("beforeChange", [i, i.currentSlide, e]),
                (f = i.currentSlide),
                (i.currentSlide = e),
                i.setSlideClasses(i.currentSlide),
                i.options.asNavFor &&
                  ((j = i.getNavTarget()),
                  (j = j.slick("getSlick")),
                  j.slideCount <= j.options.slidesToShow &&
                    j.setSlideClasses(i.currentSlide)),
                i.updateDots(),
                i.updateArrows(),
                i.options.fade === !0
                  ? (c !== !0
                      ? (i.fadeSlideOut(f),
                        i.fadeSlide(e, function () {
                          i.postSlide(e);
                        }))
                      : i.postSlide(e),
                    void i.animateHeight())
                  : void (c !== !0
                      ? i.animateSlide(h, function () {
                          i.postSlide(e);
                        })
                      : i.postSlide(e))))
      );
    }),
    (b.prototype.startLoad = function () {
      var a = this;
      a.options.arrows === !0 &&
        a.slideCount > a.options.slidesToShow &&
        (a.$prevArrow.hide(), a.$nextArrow.hide()),
        a.options.dots === !0 &&
          a.slideCount > a.options.slidesToShow &&
          a.$dots.hide(),
        a.$slider.addClass("slick-loading");
    }),
    (b.prototype.swipeDirection = function () {
      var a,
        b,
        c,
        d,
        e = this;
      return (
        (a = e.touchObject.startX - e.touchObject.curX),
        (b = e.touchObject.startY - e.touchObject.curY),
        (c = Math.atan2(b, a)),
        (d = Math.round((180 * c) / Math.PI)),
        0 > d && (d = 360 - Math.abs(d)),
        45 >= d && d >= 0
          ? e.options.rtl === !1
            ? "left"
            : "right"
          : 360 >= d && d >= 315
          ? e.options.rtl === !1
            ? "left"
            : "right"
          : d >= 135 && 225 >= d
          ? e.options.rtl === !1
            ? "right"
            : "left"
          : e.options.verticalSwiping === !0
          ? d >= 35 && 135 >= d
            ? "down"
            : "up"
          : "vertical"
      );
    }),
    (b.prototype.swipeEnd = function (a) {
      var c,
        d,
        b = this;
      if (
        ((b.dragging = !1),
        (b.interrupted = !1),
        (b.shouldClick = b.touchObject.swipeLength > 10 ? !1 : !0),
        void 0 === b.touchObject.curX)
      )
        return !1;
      if (
        (b.touchObject.edgeHit === !0 &&
          b.$slider.trigger("edge", [b, b.swipeDirection()]),
        b.touchObject.swipeLength >= b.touchObject.minSwipe)
      ) {
        switch ((d = b.swipeDirection())) {
          case "left":
          case "down":
            (c = b.options.swipeToSlide
              ? b.checkNavigable(b.currentSlide + b.getSlideCount())
              : b.currentSlide + b.getSlideCount()),
              (b.currentDirection = 0);
            break;
          case "right":
          case "up":
            (c = b.options.swipeToSlide
              ? b.checkNavigable(b.currentSlide - b.getSlideCount())
              : b.currentSlide - b.getSlideCount()),
              (b.currentDirection = 1);
        }
        "vertical" != d &&
          (b.slideHandler(c),
          (b.touchObject = {}),
          b.$slider.trigger("swipe", [b, d]));
      } else
        b.touchObject.startX !== b.touchObject.curX &&
          (b.slideHandler(b.currentSlide), (b.touchObject = {}));
    }),
    (b.prototype.swipeHandler = function (a) {
      var b = this;
      if (
        !(
          b.options.swipe === !1 ||
          ("ontouchend" in document && b.options.swipe === !1) ||
          (b.options.draggable === !1 && -1 !== a.type.indexOf("mouse"))
        )
      )
        switch (
          ((b.touchObject.fingerCount =
            a.originalEvent && void 0 !== a.originalEvent.touches
              ? a.originalEvent.touches.length
              : 1),
          (b.touchObject.minSwipe = b.listWidth / b.options.touchThreshold),
          b.options.verticalSwiping === !0 &&
            (b.touchObject.minSwipe = b.listHeight / b.options.touchThreshold),
          a.data.action)
        ) {
          case "start":
            b.swipeStart(a);
            break;
          case "move":
            b.swipeMove(a);
            break;
          case "end":
            b.swipeEnd(a);
        }
    }),
    (b.prototype.swipeMove = function (a) {
      var d,
        e,
        f,
        g,
        h,
        b = this;
      return (
        (h = void 0 !== a.originalEvent ? a.originalEvent.touches : null),
        !b.dragging || (h && 1 !== h.length)
          ? !1
          : ((d = b.getLeft(b.currentSlide)),
            (b.touchObject.curX = void 0 !== h ? h[0].pageX : a.clientX),
            (b.touchObject.curY = void 0 !== h ? h[0].pageY : a.clientY),
            (b.touchObject.swipeLength = Math.round(
              Math.sqrt(Math.pow(b.touchObject.curX - b.touchObject.startX, 2))
            )),
            b.options.verticalSwiping === !0 &&
              (b.touchObject.swipeLength = Math.round(
                Math.sqrt(
                  Math.pow(b.touchObject.curY - b.touchObject.startY, 2)
                )
              )),
            (e = b.swipeDirection()),
            "vertical" !== e
              ? (void 0 !== a.originalEvent &&
                  b.touchObject.swipeLength > 4 &&
                  a.preventDefault(),
                (g =
                  (b.options.rtl === !1 ? 1 : -1) *
                  (b.touchObject.curX > b.touchObject.startX ? 1 : -1)),
                b.options.verticalSwiping === !0 &&
                  (g = b.touchObject.curY > b.touchObject.startY ? 1 : -1),
                (f = b.touchObject.swipeLength),
                (b.touchObject.edgeHit = !1),
                b.options.infinite === !1 &&
                  ((0 === b.currentSlide && "right" === e) ||
                    (b.currentSlide >= b.getDotCount() && "left" === e)) &&
                  ((f = b.touchObject.swipeLength * b.options.edgeFriction),
                  (b.touchObject.edgeHit = !0)),
                b.options.vertical === !1
                  ? (b.swipeLeft = d + f * g)
                  : (b.swipeLeft =
                      d + f * (b.$list.height() / b.listWidth) * g),
                b.options.verticalSwiping === !0 && (b.swipeLeft = d + f * g),
                b.options.fade === !0 || b.options.touchMove === !1
                  ? !1
                  : b.animating === !0
                  ? ((b.swipeLeft = null), !1)
                  : void b.setCSS(b.swipeLeft))
              : void 0)
      );
    }),
    (b.prototype.swipeStart = function (a) {
      var c,
        b = this;
      return (
        (b.interrupted = !0),
        1 !== b.touchObject.fingerCount ||
        b.slideCount <= b.options.slidesToShow
          ? ((b.touchObject = {}), !1)
          : (void 0 !== a.originalEvent &&
              void 0 !== a.originalEvent.touches &&
              (c = a.originalEvent.touches[0]),
            (b.touchObject.startX = b.touchObject.curX =
              void 0 !== c ? c.pageX : a.clientX),
            (b.touchObject.startY = b.touchObject.curY =
              void 0 !== c ? c.pageY : a.clientY),
            void (b.dragging = !0))
      );
    }),
    (b.prototype.unfilterSlides = b.prototype.slickUnfilter =
      function () {
        var a = this;
        null !== a.$slidesCache &&
          (a.unload(),
          a.$slideTrack.children(this.options.slide).detach(),
          a.$slidesCache.appendTo(a.$slideTrack),
          a.reinit());
      }),
    (b.prototype.unload = function () {
      var b = this;
      a(".slick-cloned", b.$slider).remove(),
        b.$dots && b.$dots.remove(),
        b.$prevArrow &&
          b.htmlExpr.test(b.options.prevArrow) &&
          b.$prevArrow.remove(),
        b.$nextArrow &&
          b.htmlExpr.test(b.options.nextArrow) &&
          b.$nextArrow.remove(),
        b.$slides
          .removeClass("slick-slide slick-active slick-visible slick-current")
          .attr("aria-hidden", "true")
          .css("width", "");
    }),
    (b.prototype.unslick = function (a) {
      var b = this;
      b.$slider.trigger("unslick", [b, a]), b.destroy();
    }),
    (b.prototype.updateArrows = function () {
      var b,
        a = this;
      (b = Math.floor(a.options.slidesToShow / 2)),
        a.options.arrows === !0 &&
          a.slideCount > a.options.slidesToShow &&
          !a.options.infinite &&
          (a.$prevArrow
            .removeClass("slick-disabled")
            .attr("aria-disabled", "false"),
          a.$nextArrow
            .removeClass("slick-disabled")
            .attr("aria-disabled", "false"),
          0 === a.currentSlide
            ? (a.$prevArrow
                .addClass("slick-disabled")
                .attr("aria-disabled", "true"),
              a.$nextArrow
                .removeClass("slick-disabled")
                .attr("aria-disabled", "false"))
            : a.currentSlide >= a.slideCount - a.options.slidesToShow &&
              a.options.centerMode === !1
            ? (a.$nextArrow
                .addClass("slick-disabled")
                .attr("aria-disabled", "true"),
              a.$prevArrow
                .removeClass("slick-disabled")
                .attr("aria-disabled", "false"))
            : a.currentSlide >= a.slideCount - 1 &&
              a.options.centerMode === !0 &&
              (a.$nextArrow
                .addClass("slick-disabled")
                .attr("aria-disabled", "true"),
              a.$prevArrow
                .removeClass("slick-disabled")
                .attr("aria-disabled", "false")));
    }),
    (b.prototype.updateDots = function () {
      var a = this;
      null !== a.$dots &&
        (a.$dots
          .find("li")
          .removeClass("slick-active")
          .attr("aria-hidden", "true"),
        a.$dots
          .find("li")
          .eq(Math.floor(a.currentSlide / a.options.slidesToScroll))
          .addClass("slick-active")
          .attr("aria-hidden", "false"));
    }),
    (b.prototype.visibility = function () {
      var a = this;
      a.options.autoplay &&
        (document[a.hidden] ? (a.interrupted = !0) : (a.interrupted = !1));
    }),
    (a.fn.slick = function () {
      var f,
        g,
        a = this,
        c = arguments[0],
        d = Array.prototype.slice.call(arguments, 1),
        e = a.length;
      for (f = 0; e > f; f++)
        if (
          ("object" == typeof c || "undefined" == typeof c
            ? (a[f].slick = new b(a[f], c))
            : (g = a[f].slick[c].apply(a[f].slick, d)),
          "undefined" != typeof g)
        )
          return g;
      return a;
    });
});
(function () {
  var c = jQuery,
    e = function (a, d) {
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
          "undefined" === typeof d ||
          ("alerta" !== d.toLowerCase() && "aviso" !== d.toLowerCase())
        )
          if ("undefined" !== typeof d && "info" === d.toLowerCase())
            try {
              console.info.apply(console, b);
            } catch (c) {
              try {
                console.info(b.join("\n"));
              } catch (e) {}
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
          } catch (l) {
            try {
              console.warn(b.join("\n"));
            } catch (m) {}
          }
      }
    };
  "function" !== typeof c.QD_scrollToggle &&
    ((c.QD_scrollToggle = function (a) {
      var d = [];
      if (("string" !== typeof a && "number" !== typeof a) || "auto" === a)
        if ("auto" === a) d.push(c(window).height());
        else
          return e(
            "Não foi informado o limite de scroll necessário para adicionar o atributo."
          );
      else {
        var b = a.split(","),
          f;
        for (f in b)
          "function" !== typeof b[f] &&
            ((a = parseInt(b[f].trim())), isNaN(a) || d.push(a));
      }
      if (!d.length)
        return e(
          "Aaeeeeeeee irmão! Não consegui encontrar nenhum valor para calcular o scroll"
        );
      if (
        !document ||
        !document.body ||
        "undefined" === typeof document.body.setAttribute
      )
        return e('"document.body.setAttribute" Não é uma função :(');
      if (
        !document ||
        !document.body ||
        "undefined" === typeof document.body.removeAttribute
      )
        return e('"document.body.removeAttribute" Não é uma função :(');
      if (
        !document ||
        !document.body ||
        "undefined" === typeof document.body.getAttribute
      )
        return e('"document.body.getAttribute" Não é uma função :(');
      if (!c(window).scrollTop || isNaN(parseInt(c(window).scrollTop())))
        return e(
          '"$(window).scrollTop" não esta retornando um número inteiro :('
        );
      try {
        document.body.setAttribute("data-qd-scroll", 1),
          document.body.getAttribute("data-qd-scroll"),
          document.body.removeAttribute("data-qd-scroll"),
          document.body.getAttribute("data-qd-scroll");
      } catch (g) {
        e(
          "Não foi possível fazer o passo a passo de consultar, adicionar e remover um atributo",
          g.message
        );
      }
      c(window).scroll(function () {
        for (var a = 0; a < d.length; a++)
          c(window).scrollTop() > d[a]
            ? document.body.getAttribute("data-qd-scroll-" + a) ||
              document.body.setAttribute("data-qd-scroll-" + a, 1)
            : document.body.getAttribute("data-qd-scroll-" + a) &&
              document.body.removeAttribute("data-qd-scroll-" + a);
      });
    }),
    c(function () {
      var a = c("body[data-qd-scroll-limit]");
      a.length && c.QD_scrollToggle(a.attr("data-qd-scroll-limit"));
    }));
})();
