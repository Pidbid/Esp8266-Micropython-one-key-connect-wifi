import { createApp } from 'vue'
import { Router, createRouter } from 'vue-router'
declare module "@vue/runtime-core" { 
	interface ComponentCustomProperties { 
	  $myProperty: string;
	}
  }
