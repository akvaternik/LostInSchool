<!DOCTYPE html>

<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
        <link rel="stylesheet" href="../../css/style2.css" type="text/css" />
        <script type="text/javascript" src="../../js/jquery-2.0.3.min.js"></script>
	    <script type="text/javascript" src="../../js/script.js"></script>
        <script type="text/javascript" src="../../soundmanager/script/soundmanager2.js"></script>
        <script type="text/javascript">
            soundManager.url = "../../soundmanager/swf/";
            soundManager.debugMode = false;
        </script>
        <title>Lost In School</title>
    </head>
    <body>
		<div id="jeu">
			<div id="ecran_principal">
				
			</div>
			<div id="inventaire">
				
				<table>
					<tbody id="liste">
					</tbody>
				</table>

			</div>	
			<div id="sauvegarde" hidden>
                <input type="button" value="Save" onclick="save()">
			</div>
            <div id="logout" hidden>
                <input type="button" value="Logout" onclick="logout()">
            </div>
			<div id="achievements">
                <input type="button" value="Succ&egrave;s" onclick="achievements_screen()">
			</div>
            <div id="unlock">
                <input type="button" value="Unlock" onclick="unlock_achievement('smile')">
            </div>
            <div id="achievements_screen" style="display: none">
                <table>
                    <tbody id="achievements_table">
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
                            <td><img class="achievement" src="../../img/inconnu.png" name="smile" title="?"></td>
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
