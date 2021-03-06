<!DOCTYPE html>

<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
        <link rel="stylesheet" href="../../css/style.css" type="text/css" />

        <script type="text/javascript" src="../../js/jquery-2.0.3.min.js"></script>
	    <script type="text/javascript" src="../../js/script.js"></script>
        <script type="text/javascript" src="../../soundmanager/script/soundmanager2.js"></script>
        <script type="text/javascript">
            soundManager.url = "../../soundmanager/swf/";
            soundManager.debugMode = false;
            soundManager.setup({
                defaultOptions: {
                    autoLoad: true,
                    onfinish: function() {
                        this.destruct();
                    }
                }
            });
        </script>
        <title>Lost In School</title>
    </head>
    <body>
        <header>
            <div id="titre">
                root@pro-zac-2000:~Lost In School
            </div>
            <nav id="menu">
                <ul>
                    <li id="home" onclick="location.reload()">>accueil</li>
                    <li id="subscribe" onclick="chargeView('subscribe')">>inscription</li>
                    <li id="achievements" style="display: none" onclick="achievements_screen()">>succ&egrave;s</li>
                    <li id="logout" style="display: none" onclick="logout()">>se d&eacute;connecter</li>
                    <li id="reset" style="display: none" onclick="chargeView('reset')">>recommencer</li>
                    <li id="unsubscribe" style="display: none" onclick="chargeView('unsubscribe')">>se d&eacute;sinscrire</li>
                 </ul>
            </nav>
        </header>
        <div id="jeu">
			<div id="ecran_principal">
				
			</div>
			<div id="inventaire" hidden>
				
				<table>
					<tbody id="liste">
					</tbody>
				</table>

			</div>
            <div id="achievements_screen" style="display: none">
                <div id="achievements_title">Succ&egrave;s</div>
                <img id="cross_achievements" src="../../img/croix.png" onclick="quit_achievements()">
                <table>
                    <tbody id="achievements_table">
                        <tr>
                            <td><img class="achievement" src="../../img/inconnu.png" name="Bienvenue_dans_le_monde_virtuel!" title="?"></td>
                            <td><img class="achievement" src="../../img/inconnu.png" name="Paradoxe_temporel" title="?"></td>
                            <td><img class="achievement" src="../../img/inconnu.png" name="Im_Batman!" title="?"></td>
                            <td><img class="achievement" src="../../img/inconnu.png" name="Error_404_Achievement_Not_Found" title="?"></td>
                            <td><img class="achievement" src="../../img/inconnu.png" name="Foi_en_l_humanite_restauree" title="?"></td>
                            <td><img class="achievement" src="../../img/inconnu.png" name="La_puissance_de_la_justice" title="?"></td>
                            <td><img class="achievement" src="../../img/inconnu.png" name="Viens_au_pays_des_schtroumpfs!" title="?"></td>
                            <td><img class="achievement" src="../../img/inconnu.png" name="Angelique" title="?"></td>
                        </tr>
                        <tr>
                            <td><img class="achievement" src="../../img/inconnu.png" name="Demoniaque" title="?"></td>
                            <td><img class="achievement" src="../../img/inconnu.png" name="Vandale" title="?"></td>
                            <td><img class="achievement" src="../../img/inconnu.png" name="Pigeon" title="?"></td>
                            <td><img class="achievement" src="../../img/inconnu.png" name="Maladroit" title="?"></td>
                            <td><img class="achievement" src="../../img/inconnu.png" name="Soigneux" title="?"></td>
                            <td><img class="achievement" src="../../img/inconnu.png" name="Mac_Gyver" title="?"></td>
                            <td><img class="achievement" src="../../img/inconnu.png" name="La_consigne!!" title="?"></td>
                            <td><img class="achievement" src="../../img/inconnu.png" name="Really_lost_in_school" title="?"></td>
                        </tr>
                        <tr>
                            <td><img class="achievement" src="../../img/inconnu.png" name="Fin_du_monde" title="?"></td>
                            <td><img class="achievement" src="../../img/inconnu.png" name="Chef_cuistot" title="?"></td>
                            <td><img class="achievement" src="../../img/inconnu.png" name="Victoire_de_Zac" title="?"></td>
                            <td><img class="achievement" src="../../img/inconnu.png" name="Lieu_de_sieste" title="?"></td>
                            <td><img class="achievement" src="../../img/inconnu.png" name="Rat_de_bibliotheque" title="?"></td>
                            <td><img class="achievement" src="../../img/inconnu.png" name="Pompier_dans_l_ame" title="?"></td>
                        </tr>
                    </tbody>
                </table>
            </div>

		</div>
		
		
    </body>
</html>
