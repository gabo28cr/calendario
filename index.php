<?php
    header("Content-type:text/html;charset=\"utf-8\"");
    $feriados = ""; $error="";
    if (array_key_exists('country',$_GET))
    {
        $urlContents = file_get_contents("https://holidayapi.com/v1/holidays?key=f9ade6c0-32c5-48ef-8a8d-c80f2cbb8d56&country=".urlencode($_GET['country'])."&year=2008");
        $array = json_decode($urlContents,true);
        foreach ($array as $arry => $value) {
          if($arry == 'holidays'){
            $feriados = "Los feriados en ".$_GET['country']." son: <br>";
            foreach ($array[$arry] as $arr) {
                $feriados .= "- ".$arr[0]['date']." : ".$arr[0]['name']."<br>";                
            }
            
          }
            
        }
        
    }
?>
<!DOCTYPE html>
<html>
<head>
  <title></title>
  <meta charset="utf-8">
  <link rel="stylesheet" type="text/css" href="style.css">
  <script type="text/javascript" src="jquery-3.2.1.min.js"></script>
  <script type="text/javascript" src="script.js"></script>
</head>
<body>

<div>
        <form>
          <fieldset class="form-group">
            <table>
              <tr>
                <td>
                  <label>Fecha de Inicio: </label>
                </td>
                <td>
                  <input type="date" name="fechaInicio" id="fechaInicio">
                </td>
              </tr>
              <tr>
                <td>
                  <label>Número de días para mostrar: </label>
                </td>
                <td>
                  <input type="text" name="numeroDias" id="numeroDias">
                </td>
              </tr>
              <tr>
                <td>
                  <label for="country">Código de país: </label>
                </td>
                <td>
                  <input type="country" name="country" id="country" placeholder="Por ej. US (Estados Unidos)" value="<? 
                          if (array_key_exists('country',$_GET)) {
                              echo $_GET['country'];} ?>">
                </td>
              </tr>
              <tr>
                <td colspan="2" id="tdBoton">
                  <button type="submit" id="btnHecho">Hecho</button>
                </td>     
              </tr>
            </table>
          </fieldset>          
        </form>
  
    
</div>
<div id="calendarios">
  
</div>
<div id="feriados">
            <?php
                if ($feriados)
                {
                    echo '<div>'.$feriados.'</div>';
                }
                else if ($error!="")
                {
                    echo '<div>'.$error.'</div>';
                }
            ?>
 </div>

</body>
</html>