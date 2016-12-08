<?php

include 'base.php';

/*Écrit le code de la connexion dans la div main de la structure de base*/
function loadRegister(){
    echo "
        <div class='pageConnexion'>
            <!-- zone de connexion -->
            <div class='connexion-inscription'>
                <form method='post' action='#connexion'>
                    <div>
                        <div>
                            <label for='identifier1'>Identifiant</label>
                            <input type='text' id='identifier1' size='20'/>
                        </div>
                        <div>
                            <label for='password1'>Mot de passe</label>
                            <input type='password' id='password1'/>
                        </div>
                    </div>

                    <div>
                        <input id='connexionSubmit' type='submit' value='Connexion'/>
                    </div>
                </form>
            </div>

            <!-- zone d'inscription -->
            <div class='connexion-inscription'>
                <form  method='post' action='#inscription'>
                    <div>
                        <div>
                            <label for='identifier2'>Nom d'utilisateur</label>
                            <input type='text' id='identifier2' name='identifier2' size='20'/>
                        </div>
                        <div>
                            <label for='password2'>Mot de passe</label>
                            <input type='password' id='password2' name='password2' />
                        </div>
                        <div>
                            <label for='password3'>Confirmation</label>
                            <input type='password' id='password3' name='password3' />
                        </div>
                        <div>
                            <label for='email'>Adresse email</label>
                            <input type='text' id='email' name='email' />
                        </div>
                    </div>

                    <div>
                        <input id='inscriptionSubmit' type='submit' value='Inscription'/>
                    </div>
                </form>
            </div>
        </div>
    ";
}