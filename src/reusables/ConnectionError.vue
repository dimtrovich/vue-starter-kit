<template>
	<b-alert show variant="info" class="text-center">
		<div class="d-flex align-items-center justify-content-center">
			<i class="fa fa-exclamation-circle fa-3x"></i>
			<h3 class="h2 ml-2">{{ title }}</h3>
		</div>
		<div class="mt-2">
			<p class="fa-lg">{{ message }}</p>
				<b-button size="sm" @click.prevent="$emit('retry')"><i class="fa fa-refresh"></i> &nbsp; {{ $t('reesayer') }}</b-button>
			</div>
		</b-alert>
</template>

<script>
import i18n from '@/plugins/i18n';

export default {
	props: {
		message: {type: String, default: i18n.t('impossible_de_recuperer_les_donnees')},
		title: {type: String, default: i18n.t('erreur_de_connexion_au_serveur')},
	}
}
</script>
