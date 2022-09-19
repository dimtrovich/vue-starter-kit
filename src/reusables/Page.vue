<template>
<div class="content-wrapper">
	<div class="content-header row">
		<div class="content-header-left col-md-6 col-12 mb-1">
			<div class="d-flex align-items-center">
				<button class="btn-icon btn btn-blue shadow" type="button"><i :class="'fa fa-'+icon+' bg-c-blue'"></i> </button>
				<div class="ml-1">
					<h4 class="content-header-title m-0">{{ title }}</h4>
					<p class="text-muted m-0">{{ description }}</p>
				</div>
			 </div>
            
          </div>
          <div class="content-header-right breadcrumbs-right breadcrumbs-top col-md-6 col-12">
            <div class="breadcrumb-wrapper col-12">
				<ul class="breadcrumb breadcrumb-title">
					<li class="breadcrumb-item"><b-link to="/"><i class="fa fa-home"></i></b-link></li>
					<li class="breadcrumb-item" v-for="(p, i) in path" :key="i"><b-link href="#" onclick="return false">{{ p }}</b-link></li>
				</ul>
            </div>
          </div>
	</div>

	<div class="content-body">
		<slot/>
	</div>
</div>
</template>

<script>
export default {
	props: {
        title: {type: String},
        description: {type: String},
        icon: {type: String, default: 'file-alt'},
        path: {type: Array, default: () => []}
    }
}
</script>
