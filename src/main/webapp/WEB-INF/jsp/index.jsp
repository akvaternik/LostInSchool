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
                root@ubuntu-server:~Lost In School
            </div>
            <nav id="menu">
                <ul>
                    <li id="home" onclick="location.reload()">>accueil</li>
                    <li id="subscribe" onclick="chargeView('subscribe')">>s'inscrire</li>
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
                <img src="../../img/croix.png" style="right: 0px; width: 45px; z-index: 51; position: absolute" onclick="quit_achievements()">
                <table>
                    <tbody id="achievements_table">
                        <tr>
                            <td><img class="achievement" src="../../img/inconnu.png" name="Bienvenue_dans_le_monde_virtuel!" title="?"></td>
                            <td><img class="achievement" src="../../img/inconnu.png" name="test" title="?"></td>
                            <td><img class="achievement" src="../../img/inconnu.png" name="test" title="?"></td>
                            <td><img class="achievement" src="../../img/inconnu.png" name="test" title="?"></td>
                            <td><img class="achievement" src="../../img/inconnu.png" name="test" title="?"></td>
                            <td><img class="achievement" src="../../img/inconnu.png" name="test" title="?"></td>
                            <td><img class="achievement" src="../../img/inconnu.png" name="test" title="?"></td>
                            <td><img class="achievement" src="../../img/inconnu.png" name="test" title="?"></td>
                            <td><img class="achievement" src="../../img/inconnu.png" name="test" title="?"></td>
                        </tr>
                        <tr>
                            <td><img class="achievement" src="../../img/inconnu.png" name="test" title="?"></td>
                            <td><img class="achievement" src="../../img/inconnu.png" name="test" title="?"></td>
                            <td><img class="achievement" src="../../img/inconnu.png" name="test" title="?"></td>
                            <td><img class="achievement" src="../../img/inconnu.png" name="test" title="?"></td>
                            <td><img class="achievement" src="../../img/inconnu.png" name="test" title="?"></td>
                            <td><img class="achievement" src="../../img/inconnu.png" name="test" title="?"></td>
                            <td><img class="achievement" src="../../img/inconnu.png" name="test" title="?"></td>
                            <td><img class="achievement" src="../../img/inconnu.png" name="test" title="?"></td>
                            <td><img class="achievement" src="../../img/inconnu.png" name="test" title="?"></td>
                        </tr>
                        <tr>
                            <td><img class="achievement" src="../../img/inconnu.png" name="test" title="?"></td>
                            <td><img class="achievement" src="../../img/inconnu.png" name="test" title="?"></td>
                            <td><img class="achievement" src="../../img/inconnu.png" name="test" title="?"></td>
                            <td><img class="achievement" src="../../img/inconnu.png" name="test" title="?"></td>
                            <td><img class="achievement" src="../../img/inconnu.png" name="test" title="?"></td>
                            <td><img class="achievement" src="../../img/inconnu.png" name="test" title="?"></td>
                            <td><img class="achievement" src="../../img/inconnu.png" name="test" title="?"></td>
                            <td><img class="achievement" src="../../img/inconnu.png" name="test" title="?"></td>
                            <td><img class="achievement" src="../../img/inconnu.png" name="test" title="?"></td>
                        </tr>
                        <tr>
                            <td><img class="achievement" src="../../img/inconnu.png" name="test" title="?"></td>
                            <td><img class="achievement" src="../../img/inconnu.png" name="test" title="?"></td>
                            <td><img class="achievement" src="../../img/inconnu.png" name="test" title="?"></td>
                            <td><img class="achievement" src="../../img/inconnu.png" name="test" title="?"></td>
                            <td><img class="achievement" src="../../img/inconnu.png" name="test" title="?"></td>
                            <td><img class="achievement" src="../../img/inconnu.png" name="test" title="?"></td>
                            <td><img class="achievement" src="../../img/inconnu.png" name="test" title="?"></td>
                            <td><img class="achievement" src="../../img/inconnu.png" name="test" title="?"></td>
                            <td><img class="achievement" src="../../img/inconnu.png" name="test" title="?"></td>
                        </tr>
                        <tr>
                            <td><img class="achievement" src="../../img/inconnu.png" name="test" title="?"></td>
                            <td><img class="achievement" src="../../img/inconnu.png" name="test" title="?"></td>
                            <td><img class="achievement" src="../../img/inconnu.png" name="test" title="?"></td>
                            <td><img class="achievement" src="../../img/inconnu.png" name="test" title="?"></td>
                            <td><img class="achievement" src="../../img/inconnu.png" name="test" title="?"></td>
                            <td><img class="achievement" src="../../img/inconnu.png" name="test" title="?"></td>
                            <td><img class="achievement" src="../../img/inconnu.png" name="test" title="?"></td>
                            <td><img class="achievement" src="../../img/inconnu.png" name="test" title="?"></td>
                            <td><img class="achievement" src="../../img/inconnu.png" name="test" title="?"></td>
                        </tr>
                        <tr>
                            <td><img class="achievement" src="../../img/inconnu.png" name="test" title="?"></td>
                            <td><img class="achievement" src="../../img/inconnu.png" name="test" title="?"></td>
                            <td><img class="achievement" src="../../img/inconnu.png" name="test" title="?"></td>
                            <td><img class="achievement" src="../../img/inconnu.png" name="test" title="?"></td>
                            <td><img class="achievement" src="../../img/inconnu.png" name="test" title="?"></td>
                            <td><img class="achievement" src="../../img/inconnu.png" name="test" title="?"></td>
                            <td><img class="achievement" src="../../img/inconnu.png" name="test" title="?"></td>
                            <td><img class="achievement" src="../../img/inconnu.png" name="test" title="?"></td>
                            <td><img class="achievement" src="../../img/inconnu.png" name="test" title="?"></td>
                        </tr>
                        <tr>
                            <td><img class="achievement" src="../../img/inconnu.png" name="test" title="?"></td>
                            <td><img class="achievement" src="../../img/inconnu.png" name="test" title="?"></td>
                            <td><img class="achievement" src="../../img/inconnu.png" name="test" title="?"></td>
                            <td><img class="achievement" src="../../img/inconnu.png" name="test" title="?"></td>
                            <td><img class="achievement" src="../../img/inconnu.png" name="test" title="?"></td>
                            <td><img class="achievement" src="../../img/inconnu.png" name="test" title="?"></td>
                            <td><img class="achievement" src="../../img/inconnu.png" name="test" title="?"></td>
                            <td><img class="achievement" src="../../img/inconnu.png" name="test" title="?"></td>
                            <td><img class="achievement" src="../../img/inconnu.png" name="test" title="?"></td>
                        </tr>
                    </tbody>
                </table>
            </div>

		</div>
		
		
    </body>
</html>
