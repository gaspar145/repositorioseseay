<template>
  <v-app id="App">
    <v-navigation-drawer
      fixed
      :clipped="$vuetify.breakpoint.lgAndUp"
      app
      v-model="drawer"
      v-if="logueado"
    >
      <v-list dense>
        <template v-if="esAdministrador || esSecretaria">
          <v-list-item>
            <v-list-item-action>
              <v-icon>account_box</v-icon>
            </v-list-item-action>
            <v-list-item-title>
              <v-text-field readonly v-model="this.$store.state.usuario.email">
              </v-text-field>
            </v-list-item-title>
          </v-list-item>
        </template>
        <v-divider></v-divider>
        <template v-if="esAdministrador || esSecretaria">
          <v-list-item :to="{ name: 'home' }">
            <v-list-item-action>
              <v-icon>home</v-icon>
            </v-list-item-action>
            <v-list-item-title> Inicio </v-list-item-title>
          </v-list-item>
        </template>
        
        <template v-if="esAdministrador">
          <v-list-group>
            <v-list-item slot="activator">
              <v-list-item-content>
                <v-list-item-title> Información </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item :to="{ name: 'cargadoc' }">
              <v-list-item-action>
                <v-icon>cloud_upload</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title> Carga de Documentos </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-group>
        </template>

        <template v-if="esAdministrador">
          <v-list-group>
            <v-list-item  slot="activator">
              <v-list-item-content>
                <v-list-item-title> Repositorios </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item :to="{ name: 'agregarepositorio' }">
              <v-list-item-action>
                <v-icon>add</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title> Agregar Repositorio </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item :to="{ name: 'primerforo' }">
              <v-list-item-action>
                <v-icon>info</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title> Primer Foro </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item :to="{ name: 'segundoforo' }">
              <v-list-item-action>
                <v-icon>info</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title> Segundo Foro </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item :to="{ name: 'blindaje' }">
              <v-list-item-action>
                <v-icon>https</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title> Blindaje Electoral </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-group>
        </template>
        
        

        <template v-if="esAdministrador">
          <v-list-group>
            <v-list-item slot="activator">
              <v-list-item-content>
                <v-list-item-title> Usuarios </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item :to="{ name: 'usuario' }">
              <v-list-item-action>
                <v-icon>supervisor_account</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title> Usuarios </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            
          </v-list-group>
        </template>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      :clipped-left="$vuetify.breakpoint.lgAndUp"
      app
      dense
      color="#0E4146"
      dark
    >
      <v-toolbar-title style="width: 300px" class="ml-0 pl-0">
        <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
        <span class="hidden-sm-and-down">seseay</span>
      </v-toolbar-title>

      <v-spacer></v-spacer>
      <v-btn @click="salir()" icon v-if="logueado">
        <v-icon>logout</v-icon> Salir
      </v-btn>
      <v-btn :to="{ name: 'login' }" icon v-else>
        <v-icon>apps</v-icon>
      </v-btn>
    </v-app-bar>
    <v-content>
      <v-container fluid fill-height>
        <v-slide-y-transition mode="out-in">
          <router-view />
        </v-slide-y-transition>
      </v-container>
    </v-content>
    <v-card height="150">
      <v-footer color="#0E4146" absolute class="font-weight-medium"> </v-footer>
    </v-card>
  </v-app>
</template>

<script>
import axios from "axios";
export default {
  name: "App",
  data() {
    return {
      drawer: true,
    };
  },
  computed: {
    logueado() {
      return this.$store.state.usuario;
    },
    esAdministrador() {
      return (
        this.$store.state.usuario &&
        this.$store.state.usuario.rol == "Administrador"
      );
    },
    esSecretaria() {
      return (
        this.$store.state.usuario &&
        this.$store.state.usuario.rol == "Secretaria"
      );
    },
   
  },
  created() {
    this.$store.dispatch("autoLogin");
  },
  methods: {
    salir() {
      this.$store.dispatch("salir");
    },
  },
};
</script>
