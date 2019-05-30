<template>
    <div class="astronauts">
        <h1>Kosmonauti</h1>
        <div id="astronauts-div">
            <table id="astronauts-table" class="table table-hover">
                <thead>
                <tr>
                    <td><b>Jméno</b></td>
                    <td><b>Přijmení</b></td>
                    <td><b>Datum narození</b></td>
                    <td><b>Superschopnost</b></td>
                </tr>
                </thead>
                <tbody>
                <tr v-for="astronaut in astronauts">
                    <td>
                        {{astronaut.first_name}}
                    </td>
                    <td>
                        {{astronaut.last_name}}
                    </td>
                    <td>
                        {{astronaut.birth_date}}
                    </td>
                    <td>
                        {{astronaut.superpower}}
                    </td>
                    <td>
                        <button v-on:click="setEditingAstronaut(astronaut)" type="button" class="btn btn-info">Uprav <i class='far fa-edit'></i></button>
                    </td>
                    <td>
                        <button v-on:click="deleteAstronaut(astronaut)" type="button" class="btn btn-danger">Smazat</button>
                    </td>
                </tr>
                </tbody>

            </table>
        </div>
        <div id="add-astronaut-div">
            <h3>Přidat kosmonauta</h3>
            <form v-on:submit.prevent="addAstronaut(newAstronaut)" id="add-astronaut-form">
                <div class="form-group">
                    <label for="first_name">Jméno:</label>
                    <input type="text" v-model="newAstronaut.first_name" class="form-control" id="first_name" placeholder="Jméno..." required>
                </div>
                <div class="form-group">
                    <label for="last_name">Přijmení:</label>
                    <input type="text" v-model="newAstronaut.last_name" class="form-control" id="last_name" placeholder="Přijmení..." required>
                </div>
                <div class="form-group">
                    <label for="birth_day">Narození:</label>
                    <input type="text" v-model="newAstronaut.birth_date" class="form-control" id="birth_day" placeholder="Datum narození..." required>
                </div>
                <div class="form-group">
                    <label for="superpower">Schopnost: </label>
                    <input type="text" v-model="newAstronaut.superpower" class="form-control" id="superpower" placeholder="Superschopnost..." required>
                </div>
                <div id="add-astronaut-button">
                    <button type="submit" class="btn btn-primary">Přidat kosmonauta</button>
                </div>
            </form>


            <form v-on:submit.prevent="editAstronaut(editedAstronaut)" id="edit-astronaut-form" v-show="editingAstronaut">
                <h3>Upravit kosmonauta</h3>
                <div class="form-group">
                    <label for="first-name">Jméno:</label>
                    <input type="text" v-model="editedAstronaut.first_name" class="form-control" id="first-name" placeholder="Jméno..." required>
                </div>
                <div class="form-group">
                    <label for="last-name">Přijmení:</label>
                    <input type="text" v-model="editedAstronaut.last_name" class="form-control" id="last-name" placeholder="Přijmení..." required>
                </div>
                <div class="form-group">
                    <label for="birth-day">Narození:</label>
                    <input type="text" v-model="editedAstronaut.birth_date" class="form-control" id="birth-day" placeholder="Datum narození..." required>
                </div>
                <div class="form-group">
                    <label for="super-power">Schopnost: </label>
                    <input type="text" v-model="editedAstronaut.superpower" class="form-control" id="super-power" placeholder="Superschopnost..." required>
                </div>
                <div id="edit-astronaut-button">
                    <button type="submit" class="btn btn-primary">Upravit kosmonauta</button>
                </div>
                <button v-on:click="hideEditWindow" id="close-button" type="button" class="btn btn-info">Zavřít upravovací okno <i class='far fa-edit'></i></button>
            </form>
        </div>

    </div>
</template>

<script>
    import 'bootstrap/dist/css/bootstrap.css'
    import 'bootstrap-vue/dist/bootstrap-vue.css'

    export default {
        name: "Astronauts",
        data() {
            return {
                newAstronaut:{},
                astronauts:[],
                editedAstronaut:{},
                editingAstronaut: false
            }
        },
        methods:{
            addAstronaut: function (newAstronaut) {
                console.log('adding astronaut...');
                this.$http.post('/astronauts', {
                    first_name: newAstronaut.first_name,
                    last_name: newAstronaut.last_name,
                    birth_date: newAstronaut.birth_date,
                    superpower: newAstronaut.superpower,
                }).then(() => {
                    this.$router.push({ name: 'Astronauts' });
                    window.location.reload();
                }, () => {
                    alert('Chyba registrace');
                });

            },
            deleteAstronaut: function (astronaut) {
                console.log('deleting astronaut '+astronaut.first_name + ' ' + astronaut.last_name, astronaut.id);
                this.$http.post('/delete-astronaut', {
                    id: astronaut.id,
                    first_name: astronaut.first_name,
                    last_name: astronaut.last_name,
                    birth_date: astronaut.birth_date,
                    superpower: astronaut.superpower
                }).then(() => {
                    this.$router.push({ name: 'Astronauts' });
                    window.location.reload();
                }, () => {
                    alert('Chyba mazání kosmonauta');
                });
            },
            editAstronaut:function(astronaut){
                console.log('deleting astronaut '+astronaut.first_name + ' ' + astronaut.last_name, astronaut.id);
                this.$http.post('/edit-astronaut', {
                    id: astronaut.id,
                    first_name: astronaut.first_name,
                    last_name: astronaut.last_name,
                    birth_date: astronaut.birth_date,
                    superpower: astronaut.superpower
                }).then(() => {
                    this.$router.push({ name: 'Astronauts' });
                    window.location.reload();
                }, () => {
                    alert('Chyba úpravy kosmonauta');
                });
            },
            setEditingAstronaut: function(astronaut){
                this.editedAstronaut = astronaut;
                if (!this.editingAstronaut){ this.editingAstronaut = true;}
            },
            hideEditWindow: function () {
                this.editingAstronaut = false;
            }
        },
        created: function () {
           this.$http.get('/astronauts')
               .then(response => {
                  console.log(response.data);
                   this.astronauts = response.data;
                   console.log(this.astronauts);
               });
        }
    }

</script>

<style scoped>
    #astronauts-table {
        width:100%;
    }
    #add-astronaut-form {
        width: 100%;
        display: inline;
    }

    .form-group {
    }

    .form-control{
        width: 30%;
        display: inline;
    }

    #astronauts-div {
        display: inline-block;
        width:45%;
        margin-top: 50px;
    }

    #add-astronaut-div {
        display: inline-block;
        width:45%;
        margin-top: 50px;
        float: right;
    }

    #add-astronaut-button {
        text-align: center;
    }

    #edit-astronaut-form {
        margin-top: 50px;
    }

    #edit-astronaut-button {
        text-align: center;

    }
    #close-button {
        margin-top: 20px;
    }
</style>