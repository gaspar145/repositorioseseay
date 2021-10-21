<template>
  <v-layout align-start>
    <v-flex class="inicio">
      <v-toolbar v-if="formulariodocumentos == 0" text color="white">
        <v-toolbar-title>Carga de documentos</v-toolbar-title>
        <v-divider class="mx-2" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-text-field
          class="text-xs-center"
          v-model="search"
          append-icon="search"
          label="Búsqueda"
          single-line
          hide-details
        ></v-text-field>
        <v-spacer></v-spacer>
        <v-btn color="primary" @click="cargardocumento()" dark class="mb-2"
          >Nuevo</v-btn
        >
      </v-toolbar>
      <br />
      <!-- ....................grupos desplegables.................... -->

      <v-expansion-panels v-if="formulariodocumentos == 0">
        <v-expansion-panel>
          <v-expansion-panel-header>
            <strong>Primer Foro</strong>
            <template v-slot:actions>
              <v-chip
                class="ml-0 mr-2 black--text"
                label
                small
                v-if="totalDocumentosPrimerForo == 0"
              >
                No hay documentos
              </v-chip>
              <v-chip
                class="ml-0 mr-2 black--text"
                label
                small
                v-if="totalDocumentosPrimerForo == 1"
              >
                {{ totalDocumentosPrimerForo }} Documento
              </v-chip>
              <v-chip
                class="ml-0 mr-2 black--text"
                label
                small
                v-if="totalDocumentosPrimerForo > 1"
              >
                {{ totalDocumentosPrimerForo }} Documentos
              </v-chip>
            </template>
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-data-table
              :headers="headerDocumentos"
              :items="documentosPrimer"
              :search="search"
              :items-per-page="5"
              class="elevation-1"
            >
              <template v-slot:item.fecha="{ item }">
                <div>
                  <span>{{ format_date(item.createdAt) }}</span>
                </div>
              </template>

              <template v-slot:item.opciones="{ item }">
                <v-btn style="margin-left: 2px" small @click="editItem(item)">
                  <v-icon small> cloud_download </v-icon>
                </v-btn>
                <v-btn style="margin-left: 2px" small @click="editarDocumento(item)">
                  <v-icon small> edit </v-icon>
                </v-btn>
              </template>
              <template v-slot:no-data>
                <v-btn color="primary" @click="listar()">Resetear</v-btn>
              </template>
            </v-data-table>
          </v-expansion-panel-content>
        </v-expansion-panel>

        <v-expansion-panel>
          <v-expansion-panel-header disable-icon-rotate>
            <strong>Segundo Foro</strong>
            <template v-slot:actions>
              <v-chip
                class="ml-0 mr-2 black--text"
                label
                small
                v-if="totalDocumentosSegundoForo == 0"
              >
                No hay documentos
              </v-chip>
              <v-chip
                class="ml-0 mr-2 black--text"
                label
                small
                v-if="totalDocumentosSegundoForo == 1"
              >
                {{ totalDocumentosSegundoForo }} Documento
              </v-chip>
              <v-chip
                class="ml-0 mr-2 black--text"
                label
                small
                v-if="totalDocumentosSegundoForo > 1"
              >
                {{ totalDocumentosSegundoForo }} Documentos
              </v-chip>
            </template>
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-data-table
              :headers="headerDocumentos"
              :items="documentosSegundo"
              :search="search"
              class="elevation-1"
              v-if="formulariodocumentos == 0"
            >
              <template v-slot:item.fecha="{ item }">
                <div>
                  <span>{{ format_date(item.createdAt) }}</span>
                </div>
              </template>

              <template v-slot:item.opciones="{ item }">
                <v-btn style="margin-left: 2px" small @click="editItem(item)">
                  <v-icon small> cloud_download </v-icon>
                </v-btn>
                <v-btn style="margin-left: 2px" small @click="editarDocumento(item)">
                  <v-icon small> edit </v-icon>
                </v-btn>
              </template>
              <template v-slot:no-data>
                <v-btn color="primary" @click="listar()">Resetear</v-btn>
              </template>
            </v-data-table>
          </v-expansion-panel-content>
        </v-expansion-panel>

        <v-expansion-panel>
          <v-expansion-panel-header disable-icon-rotate>
            <strong>Blindaje Electoral</strong>
            <template v-slot:actions>
              <v-chip
                class="ml-0 mr-2 black--text"
                label
                small
                v-if="totalDocumentosBlindaje == 0"
              >
                No hay documentos
              </v-chip>
              <v-chip
                class="ml-0 mr-2 black--text"
                label
                small
                v-if="totalDocumentosBlindaje == 1"
              >
                {{ totalDocumentosBlindaje }} Documento
              </v-chip>
              <v-chip
                class="ml-0 mr-2 black--text"
                label
                small
                v-if="totalDocumentosBlindaje > 1"
              >
                {{ totalDocumentosBlindaje }} Documentos
              </v-chip>
            </template>
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-data-table
              :headers="headerDocumentos"
              :items="documentosBlindaje"
              :search="search"
              class="elevation-1"
              v-if="formulariodocumentos == 0"
            >
              <template v-slot:item.fecha="{ item }">
                <div>
                  <span>{{ format_date(item.createdAt) }}</span>
                </div>
              </template>

              <template v-slot:item.opciones="{ item }">
                <v-btn style="margin-left: 2px" small @click="editItem(item)">
                  <v-icon small> cloud_download </v-icon>
                </v-btn>
                <v-btn style="margin-left: 2px" small @click="editarDocumento(item)">
                  <v-icon small> edit </v-icon>
                </v-btn>
              </template>
              <template v-slot:no-data>
                <v-btn color="primary" @click="listar()">Resetear</v-btn>
              </template>
            </v-data-table>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>

      <!-- ....................formulario carga de documentos.................... -->
      <v-card v-if="formulariodocumentos == 1">
        <v-system-bar></v-system-bar>
        <v-toolbar flat>
          <v-toolbar-title>Cargar Documentos</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-banner single-line>
          Complete los campos y seleccione su documento.
        </v-banner>
        <v-card-text class="grey lighten-4">
          <v-sheet max-width="800" height="300" class="mx-auto">
            <v-card-text>
              <v-text-field
                ref="titulo"
                v-model="titulo"
                label="Titulo"
                placeholder="Titulo del docuemnto"
                required
              ></v-text-field>

              <v-text-field
                ref="city"
                v-model="descripcion"
                label="Descripción"
                placeholder="Descripcion del documento"
                required
              ></v-text-field>

              <v-select
                v-model="repositorio"
                :items="repositorios"
                label="Seleccione un Repositorio"
              >
              </v-select>

              <br />
              <v-file-input
                ref="file"
                name="docs"
                type="file"
                @input.native="obetenerImagen"
                placeholder="Seleccionar"
                prepend-icon="camera"
                dense
                label="Selecciona un Documento "
              ></v-file-input>
            </v-card-text>
          </v-sheet>
          <v-container fluid>
            <v-row align="center" justify="space-around">
              <v-btn color="error" @click="close()">Cancelar</v-btn>
              <v-btn color="success" @click="guardar()" class="ma-2 white--text"
                >Cargar <v-icon right dark> cloud_upload </v-icon></v-btn
              >
            </v-row>
          </v-container>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>



<script>
import axios from "axios";
import moment from "moment";
export default {
  data() {
    return {
      editedIndex: -1,
      formulariodocumentos: 0,
      titulo: "",
      descripcion: "",
      file: "",
      totalDocumentosPrimerForo: "",
      totalDocumentosSegundoForo: "",
      totalDocumentosBlindaje: "",
      repositorio: "",
      search: "",
      repositorios: ["Primer Foro", "Segundo Foro", "Blindaje Electoral"],
      documentosPrimer: [],
      documentosSegundo: [],
      documentosBlindaje: [],
      headerDocumentos: [
        { text: "Titulo", value: "titulo", sortable: true },
        { text: "Descripcion", value: "descripcion", sortable: true },
        { text: "Fecha", value: "fecha", sortable: true },
        { text: "Acciones", value: "opciones", sortable: false },
      ],
    };
  },
  computed: {},
  watch: {},
  created() {
    this.listar();
  },
  methods: {
    cargardocumento() {
      this.formulariodocumentos = 1;
    },
    obetenerImagen(e) {
      let file = e.target.files[0];
      console.log(file);
      this.file = file;
    },
    format_date(value) {
      if (value) {
        moment.locale("es");
        return moment(String(value)).format("LL");
      }
    },
    format_dateFull(value) {
      if (value) {
        moment.locale("es");
        return moment(String(value)).format("LLLL");
      }
    },

    guardar() {
      const formData = new FormData();

      formData.append("file", this.file);
      formData.append("titulo", this.titulo);
      formData.append("descripcion", this.descripcion);
      formData.append("repositorio", this.repositorio);
      let me = this;
      let header = { Token: this.$store.state.token };
      let configuracion = { headers: header };
      console.log(this.idconsulta);
      if (this.editedIndex > -1) {
      axios
        .put(
          "documentos/update",
          {
            _id: this.idconsulta,
            titulo: this.titulo,
            descripcion: this.descripcion,
            repositorio: this.repositorio

            
          },
          configuracion
        )
        .then(function (response) {
          me.close();
          me.listar();
        })
        .catch(function (error) {
          console.log(error);
        });
        } else {
          axios
        .post("documentos/add",formData, configuracion)
        .then(function (response) {
          me.close();
          me.listar();
        })
        .catch(function (error) {
          console.log(error);
        });
        }
    },

    editarDocumento(item) {
      this.limpiar();
      this.idconsulta = item._id;
      this.titulo = item.titulo;
      this.descripcion = item.descripcion;
      this.repositorio = item.repositorio;
      this.formulariodocumentos = 1;
      this.editedIndex = 1;
    },



    listar() {
      let me = this;
      let header = { Token: this.$store.state.token };
      let configuracion = { headers: header };
      axios
        .get("documentos/listDocumentosPrimerForo", configuracion)
        .then(function (response) {
          me.documentosPrimer = response.data;
          me.totalDocumentosPrimerForo = response.data.length;
        })
        .catch(function (error) {
          console.log(error);
        });
      axios
        .get("documentos/listDocumentosSegundoForo", configuracion)
        .then(function (response) {
          me.documentosSegundo = response.data;
          me.totalDocumentosSegundoForo = response.data.length;
        })
        .catch(function (error) {
          console.log(error);
        });
      axios
        .get("documentos/listDocumentosBlindaje", configuracion)
        .then(function (response) {
          me.documentosBlindaje = response.data;
          me.totalDocumentosBlindaje = response.data.length;
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    close() {
      this.formulariodocumentos = 0;
      this.titulo = "";
      this.descripcion = "";
      this.repositorio = "";
    },
    limpiar() {
      
      this.titulo = "";
      this.descripcion = "";
      this.repositorio = "";
    },

  },
};
</script>

<style>
</style>