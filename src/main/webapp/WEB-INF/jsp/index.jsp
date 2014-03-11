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
		<div id="jeu">
			<div id="ecran_principal">
				
			</div>
			<div id="inventaire" hidden>
				
				<table>
					<tbody id="liste">
					</tbody>
				</table>

			</div>
            <div id="unsubscribe">
                <input type="button" value="Unsubscribe" onclick="chargeView('unsubscribe')">
            </div>
            <div id="logout" hidden>
                <input type="button" value="Logout" onclick="logout()">
            </div>
			<div id="achievements">
                <input type="button" value="Succ&egrave;s" onclick="achievements_screen()">
			</div>
            <div id="achievements_screen" style="display: none">
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
