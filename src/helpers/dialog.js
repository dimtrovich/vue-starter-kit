import i18n from "@/plugins/i18n";

export default {
	/**
	 * Display an system error
	 * 
	 * @param {String} erreur
	 * @param {String} titre
	 */
	error(erreur, titre) {
		$.alert({
			title: (!titre || typeof titre == 'undefined') ? i18n.t('erreur') : titre,
			content: erreur,
			type: 'red'
		});
	},

	/**
	 * Show an information message
	 * 
	 * @param {String} message 
	 * @param {String} titre 
	 */
	info(message, titre) {
		$.alert({
			title: (!titre || typeof titre == 'undefined') ? 'Informations !' : titre,
			content: message,
			type: 'blue'
		});
	},

	/**
	 * Display an fail message
	 * 
	 * @param {String} message 
	 * @param {Object} options 
	 */
	alertError(message, options) {
		let parametres = $.extend({
			title: i18n.t('erreur'),
			callback: function() {}
		}, options);

		$.confirm({
			icon: 'fa fa-times',
			theme: 'modern',
			closeIcon: false,
			animation: 'scale',
			type: 'red',
			title: parametres.title,
			content: message,
			buttons: {
				formSubmit: { text: 'Ok', btnClass: 'btn-info', action: function() { return parametres.callback(); } },
			}
		});
	},

	/**
	 * Display an fail message
	 * 
	 * @param {String} message 
	 * @param {Object} options 
	 */
	alertInfo(message, options) {
		let parametres = $.extend({
			title: 'Info',
			callback: function() {}
		}, options);

		$.confirm({
			icon: 'fa fa-exclamation-circle',
			theme: 'modern',
			closeIcon: false,
			animation: 'scale',
			type: 'blue',
			title: parametres.title,
			content: message,
			buttons: {
				formSubmit: { text: 'Ok', btnClass: 'btn-info', action: function() { return parametres.callback(); } },
			}
		});
	},

	/**
	 * Display an success message
	 * 
	 * @param {String} message 
	 * @param {Object} options 
	 */
	alertSuccess(message, options) {
		let parametres = $.extend({
			title: i18n.t('succes'),
			callback: function() {}
		}, options);

		$.confirm({
			icon: 'fa fa-check',
			theme: 'modern',
			closeIcon: false,
			animation: 'scale',
			type: 'green',
			title: parametres.title,
			content: message,
			buttons: {
				formSubmit: { text: 'Ok', btnClass: 'btn-info', action: function() { return parametres.callback(); } },
			}
		});
	},

	/**
	 * Display an confirmation dialog
	 * 
	 * @param {String} message 
	 * @param {Object} options 
	 */
	confirm(message, options) {
		if (typeof options.buttons == 'undefined') {
			options.buttons = {}
		}

		const parametres = $.extend({
			title: 'Confirmation',
			confirm: function() {},
			cancel: function() {},
		}, options);

		parametres.buttons = $.extend({
			cancel: { text: i18n.t('non'), btnClass: 'btn-danger', action: function() { return parametres.cancel() } },
			confirm: { text: i18n.t('oui'), btnClass: 'btn-success', action: function() { return parametres.confirm() } },
		}, parametres.buttons)

		return $.confirm({
			title: parametres.title,
			content: message,
			buttons: parametres.buttons
		});
	},

	/**
	 * Affiche une boite de saisie
	 * 
	 * @param {String} message 
	 * @param {Object} options 
	 */
	prompt(message, options) {
		const parametres = $.extend({
			title: 'Prompt !',
			submit: function() {},
			cancel: function() {},
		}, options)

		$.confirm({
			title: parametres.title,
			content: '<form action="" class="formName">' + message + '</form>',
			buttons: {
				cancel: { text: i18n.t('annuler'), action: function() { return parametres.cancel() } },
				submit: { text: i18n.t('valider'), btnClass: 'btn-blue', action: function() { return parametres.submit() } },
			},
			onContentReady: function() {
				var jc = this;
				this.$content.find('form').on('submit', function(e) {
					e.preventDefault();
					jc.$$formSubmit.trigger('click');
				});
			}
		});
	},

	/**
	 * Ask a question
	 * 
	 * @param {String} question 
	 * @param {Object} options 
	 */
	question(question, options) {
		let parametres = $.extend({
			title: 'Question !',
			buttons: {
				yes: { text: i18n.t('oui'), btnClass: 'btn-blue', action: function() {} },
				no: { text: i18n.t('non'), btnClass: 'btn-red', action: function() {} }
			},
		}, options)

		$.confirm({
			title: parametres.title,
			content: question,
			buttons: parametres.buttons,
			closeIcon: true,
		});
	},

	notifyError(message, title, options) {
		toastr.error(message, title || i18n.t('erreur'), notifyOptions(options))
	},

	notifyInfos(message, title, options) {
		toastr.info(message, title || 'Infos', notifyOptions(options))
	},

	notifySuccess(message, title, options) {
		toastr.success(message, title || i18n.t('succes'), notifyOptions(options))
	},
}

const notifyOptions = (options) => {
	return $.extend({
		showMethod: "slideDown",
		hideMethod: "slideUp",
		closeButton: !0,
		timeOut: 2e3
	}, options)
}