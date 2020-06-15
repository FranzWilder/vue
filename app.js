var vm = new Vue({
    el: "#app",
    data: {
        tipo_mant: [
            { id: 1, descripcion: "preventivo", id_estado: 1 },
            { id: 2, descripcion: "correcto", id_estado: 0 }
        ],
        marcas: [
            { id: 1, descripcion: "Toyota" },
            { id: 2, descripcion: "Audi" },
            { id: 3, descripcion: "Mercedes-Benz" },
            { id: 4, descripcion: "Kia" }
        ],
        modelos: [
            { id: 1, id_marca: 1, descripcion: "Auris" },
            { id: 2, id_marca: 1, descripcion: "Hilux" },
            { id: 3, id_marca: 2, descripcion: "Audi A1" },
            { id: 4, id_marca: 2, descripcion: "Audi A3" },
            { id: 5, id_marca: 3, descripcion: "Clase A" },
            { id: 6, id_marca: 3, descripcion: "Clase B" },
            { id: 7, id_marca: 4, descripcion: "Niro" },
            { id: 8, id_marca: 4, descripcion: "Picanto" }
        ],
        mantenimientos: [
            // {id:4,placa:"AAU112",id_tipo_mant:1,descripcion_tipo:"preventivo",fecha:"20/07/2020"}
        ],
        vehiculos: [
            {id:1,placa:"AAU112",marca:"Toyota",id_marca:1,modelo:"Auris",id_modelo:1,fecha:"20/07/2020"}
        ],
        vehiModelos: this.modelos,
        vehiPlaca: "",
        vehiSeMarca: null,
        vehiSeModelo: null,
        showBtnVehiCancelar: true,
        showBtnVehiGuardar: true,
        showBtnVehiEditar: true,
        submitVehi: false,
        vehiculo: null,
        placa: "",
        modalVehiculo: false
    },
    methods: {
        eligeVehiMarca: function (event) {
            this.vehiModelos = this.modelos.filter(modelo => modelo.id_marca == this.vehiSeMarca);
            this.vehiSeModelo = null;
        },
        limpiarCamposVehi: function () {
            this.submitVehi = false;
            this.validVehiPlaca = null;
            this.validVehiMarca = null;
            this.validVehiModelo = null;
            this.vehiPlaca = "";
            this.vehiSeMarca = null;
            this.vehiSeModelo = null;
        },
        cModalAgregar: function () {
            this.limpiarCamposVehi();

            this.showBtnVehiCancelar = true;
            this.showBtnVehiGuardar = true;
            this.showBtnVehiEditar = false;
            this.modalVehiculo = true;
        },
        
        cancelarVehiculo: function () {
            this.limpiarCamposVehi();

            this.modalVehiculo = false;
        },
        guardarVehiculo: function () {
            this.submitVehi = true;

            if (this.validVehiPlaca && this.validVehiMarca && this.validVehiModelo) {
                var vehiculo = new Object();
                vehiculo.id = this.vehiculos.length + 1;
                vehiculo.placa = this.vehiPlaca;

                vehiculo.id_marca = this.vehiSeMarca;
                var marca = this.marcas.filter(marca => marca.id == this.vehiSeMarca);
                vehiculo.marca = marca[0].descripcion;

                vehiculo.id_modelo = this.vehiSeModelo;
                var modelo = this.modelos.filter(modelo => modelo.id == this.vehiSeModelo);
                vehiculo.modelo = modelo[0].descripcion;

                var f = new Date();
                vehiculo.fecha = f.getDate() + "/" + (f.getMonth() + 1) + "/" + f.getFullYear();

                this.vehiculos.push(vehiculo);

                this.modalVehiculo = false;

                this.limpiarCamposVehi();
            } else {

            }

        },
        cModalEditar: function (id) {
            this.limpiarCamposVehi();
            
            this.showBtnVehiCancelar = true;
            this.showBtnVehiGuardar = false;
            this.showBtnVehiEditar = true;
            this.modalVehiculo = true;

            this.vehiculo = this.vehiculos.filter(vehiculo => vehiculo.id == id)[0];

            
            this.vehiPlaca = this.vehiculo.placa;
            this.vehiSeMarca = this.vehiculo.id_marca;

            this.vehiModelos = this.modelos.filter(modelo => modelo.id_marca == this.vehiSeMarca);
            this.vehiSeModelo = this.vehiculo.id_modelo;
        },
        editarVehiculo: function () {
            this.submitVehi = true;

            if (this.validVehiPlaca && this.validVehiMarca && this.validVehiModelo) {
                for (var ind in this.vehiculos) {
                    if (this.vehiculos[ind].id == this.vehiculo.id) {
                        this.vehiculos[ind].placa = this.vehiPlaca;

                        this.vehiculos[ind].id_marca = this.vehiSeMarca;
                        var marca = this.marcas.filter(marca => marca.id == this.vehiSeMarca);
                        console.log(marca);
                        this.vehiculos[ind].marca = marca[0].descripcion;

                        this.vehiculos[ind].id_modelo = this.vehiSeModelo;
                        var modelo = this.modelos.filter(modelo => modelo.id == this.vehiSeModelo);
                        console.log(modelo);
                        this.vehiculos[ind].modelo = modelo[0].descripcion;
                    }
                }

                this.modalVehiculo = false;
                this.limpiarCamposVehi();
            } else {

            }
        }
    },
    computed: {
        validVehiPlaca: function () {
            if (this.vehiPlaca == "" && !this.submitVehi) {
                return null;
            } else if (this.vehiPlaca.length > 5 && this.vehiPlaca.length < 8) {
                return true;
            } else {
                return false;
            }
        },
        validVehiMarca: function () {
            if (this.vehiSeMarca == null && !this.submitVehi) {
                return null;
            } else if (this.vehiSeMarca == null) {
                return false;
            } else {
                return true;
            }
        },
        validVehiModelo: function () {
            if (this.vehiSeModelo == null && !this.submitVehi) {
                return null;
            } else if (this.vehiSeModelo == null) {
                return false;
            } else {
                return true;
            }
        }
    }
});