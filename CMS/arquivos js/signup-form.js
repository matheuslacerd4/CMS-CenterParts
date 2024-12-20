function phoneMask(value) {
	return value
		.replace(/\D/g, "")
		.replace(/(\d{2})(\d)/, "($1) $2")
		.replace(/(\d{4})(\d)/, "$1-$2")
		.replace(/(\d{4})-(\d{1})(\d{4})/, "$1$2-$3")
		.replace(/(-\d{4})\d+$/, "$1");
}

function renderForm() {
	$("#registerFormCNPJ")?.append(`
		<div id="app">
				<div class="register">
						<div class="register">
								<div class="register__modal-mask" style="z-index: 23">
										<div class="register__modal-wrapper">
												<div class="register__modal-body">
														<div class="register__header">
																<div class="header__register"><a class="header__register--close"><i class="icon-times-circle"></i></a>
																		<h1 class="header__register-title">NOVO USUÁRIO</h1>
																		<p class="header__register-description">
																				Cadastre-se e aproveite as vantagens de ser cliente da Center Parts.
																		</p>
																		<div class="header__register-alert">
																				<h3 class="register__alert-title">Algumas Informações:</h3>
																				<p class="header__register-alert-text">
																						- O cadastro só será liberado para pessoa Jurídica habilitada no
																						cadastro do SINTEGRA.
																				</p>
																				<p class="header__register-alert-text">
																						- No cadastro do CNPJ no Ministério da Fazenda, o ramo de
																						atividade principal ou secundária da empresa deve ser o comércio
																						de autopeças.
																				</p>
																				<p class="header__register-alert-text">
																						- O limite da compra estará sujeito a análise após o fechamento
																						de cada compra.
																				</p>
																		</div>
																		<p class="header__register-user--login">
																				já é cadastrado?
		
																				<a href="/login" class="user-login--link"> Clique aqui </a></p>
																</div>
														</div>
														<div class="register__form">
																<img id="loadingFormCNPJ" src="/arquivos/Loading_2.gif" style="width: 50px; display: flex; margin: 20px auto; display: none" />
																<form class="form__register">
																		<div class="form__register-row">
																				<div class="form__register-col">
																						<p class="form__register-label">CNPJ*</p>
																						<input id="form_document" name="form_document" type="text" class="form__register-field"
																								data-gtm-form-interact-field-id="0" />
																				</div>
																				<div class="form__register-col">
																						<p class="form__register-label">E-mail*</p>
																						<input id="form_email" name="form_email" type="text" class="form__register-field" disabled />
																				</div>
																		</div>
																		<div class="form__register-row" style="margin-top: 20px">
																				<div class="form__register-col">
																						<p class="form__register-label">Telefone</p>
																						<input id="form_phone" name="form_phone" type="text" class="form__register-field" disabled />
																				</div>
																				<div class="form__register-col">
																						<p class="form__register-label">Celular*</p>
																						<input id="form_cellphone" name="form_cellphone" class="form__register-field" type="text" disabled />
																				</div>
																		</div>
																		<div class="form__register-row" style="margin-top: 20px">
																				<div class="form__register-col">
																						<p class="form__register-label">Nome do Contato*</p>
																						<input id="form_external_rep" name="form_external_rep" type="text" class="form__register-field" disabled />
																				</div>
																				<div class="form__register-col">
																						<p class="form__register-label">Código Vendedor</p>
																						<input id="form_seller" name="form_seller" class="form__register-field" type="text" disabled />
																				</div>
																		</div>
																		<div class="form__register-row">
																				<button class="form__register--btn">CONTINUAR</button>
																		</div>
																		<!---->
																</form>
														</div>
														<div class="register__footer">
																<div class="footer__register">
																		<p class="footer__register-text">
																				Em caso de dúvidas ligue para
		
																				<strong>0800 020 1744 (opção 1)</strong> de
		
																				<strong>
																						a 5a feira das 8:00h às 18:00h. 6a f das 8:00h às 17:00h.
																				</strong></p>
																</div>
														</div>
														<div class="vue-notification-group" style="width: 585px; bottom: 0px; left: calc(50% - 292.5px);">
																<span></span></div>
												</div>
										</div>
								</div>
						</div>
				</div>
		</div>
	`);
}

function inputMask(){
	$(".form__register input").css("width", "180px")

	var inputPhone = document.querySelector("#form_phone");
	var inputCellphone = document.querySelector("#form_cellphone");
	var inputCnpj = document.querySelector("#form_document");
	var inputEmail = document.querySelector("#form_email");

	inputCellphone?.addEventListener("input", (e) => {
		inputCellphone.value = phoneMask(e.target.value);
	});

	inputPhone?.addEventListener("input", (e) => {
		inputPhone.value = phoneMask(e.target.value);
	});

	inputCnpj?.addEventListener("input", (e) => {
		let value = e.target.value;
		value = value.replace(/\D/g, "");

		if (value.length > 14) {
			value = value.substring(0, 14);
		}

		value = value.replace(/^(\d{2})(\d)/, "$1.$2");
		value = value.replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3");
		value = value.replace(/\.(\d{3})(\d)/, ".$1/$2");
		value = value.replace(/(\d{4})(\d)/, "$1-$2");
		e.target.value = value;
	});

	inputEmail?.addEventListener("input", (e) => {
		e.target.style.border = '1px solid #e0e0e0';
		if($("#validateEmailError"))
			$("#validateEmailError").remove();
	});

	inputCnpj?.addEventListener("input", (e) => {
		e.target.style.border = '1px solid #e0e0e0';
	});

	inputCnpj?.addEventListener("focusout", async (e) => {
		let value = e.target.value;
		value = value.replace(/\D/g, "");

		if (value.length == 14) {
			try{
				$("#loadingFormCNPJ").css("display", "flex");

				const validationResult = await fetch(`https://signup-centerparts.inovaki.com.br/document_validate/${value}`)
				const res = await validationResult.text();

				$("#loadingFormCNPJ").css("display", "none");

				if(res == "false"){
					Swal.fire({
						title: "Ops!",
						text: "O seu CNAE não se enquadra no ramo de atividade Comercial permitido para compra, ou CNPJ inválido.",
						icon: "error"
					});
					e.target.style.border = '2px solid red';
					e.target.value = "";
				} 
				else
					$(".register__form input").removeAttr("disabled");

			} catch(err) {
				console.error(err);
			}	
		}
		else
			e.target.style.border = '2px solid red';
	});
}

$(document).on('click', '#signIn', () => {
	renderForm();
	inputMask();
});

$(document).on('click', '.header__register--close > i:nth-child(1)', () => {
	$('#registerFormCNPJ').html('');
})

$(document).on('click', '.form__register--btn', async (e) => {
	e.preventDefault()
	
	var inputCnpj = document.querySelector("#form_document");
	cnpj = inputCnpj.value.replace(/\D/g, "");

	if (cnpj.length == 14) {

		const form = $('.form__register')
		const formData = new FormData(form[0]);

		const data = {
			corporateDocument: formData.get('form_document').replace(/\D/g, ""),
			email: formData.get('form_email'),
			businessPhone: formData.get('form_phone').replace(/\D/g, ""),
			cellPhone: formData.get('form_cellphone').replace(/\D/g, ""),
			externalRep : formData.get('form_external_rep'),
			sellerReference: formData.get('form_seller'),
			newsletter: true
		};

		const emailInput = $('#form_email');
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

		if (!emailRegex.test(data.email)) {
      emailInput.css('border', '2px solid red');
			emailInput.after(`<div id="validateEmailError" style="
													position: absolute;
													font-size: 10px;
													color: red;
													top: 32px;
													right: 158px;
												">Inserir um email válido</div>`)
			return;
    }

		try {

			$("#loadingFormCNPJ").css("display", "flex");

			const response = await fetch('https://signup-centerparts.inovaki.com.br/signup', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(data)
			});

			$("#loadingFormCNPJ").css("display", "none");

			switch (response.status) {
				case 200:
					Swal.fire({
						title: "Sucesso!",
						text: "Cadastro realizado com sucesso.",
						icon: "success"
					});
					$('#registerFormCNPJ').html('');
					window.location.href = `/login?email=${data.email}&setPw=true`;

					break;

				case 409:
					Swal.fire({
						title: "Ops!",
						text: "Cliente já cadastrado. Verifique as informações.",
						icon: "error"
					});
					break;

				case 400:
					Swal.fire({
						title: "Ops!",
						text: "Verifique os campos digitados.",
						icon: "error"
					});
					break;

				case 422:
					Swal.fire({
						title: "Ops!",
						text: "Campo obrigatório não preenchido ou incorreto.",
						icon: "error"
					});
					break;
			
				default:
					break;
			}
		} catch (error) {

			Swal.fire({
				title: "Ops!",
				text: "Algo deu errado, aguarde uns minutos e tente novamente.",
				icon: "error"
			});
			console.error("Erro", error.result.detail)
		}
	}	
});

window.addEventListener('load', function () {
	const urlParams = new URLSearchParams(window.location.search);
	const savedEmail = urlParams?.get('email');
	const setPw = urlParams?.get('setPw')?.toLowerCase()
	
	if(window.location.href.match(/\/cadastro/)){
		renderForm();
		inputMask();
		$("#app > div > div > div > div > div > div.register__header > div > a").remove()
	}

	if (savedEmail && setPw === "true") {
		document.querySelector('[data-i18n="vtexid.forgotPswdHelper"]').click()
	}      
});	