$(document).ready(function(){
		$("#btnHecho").click(function(){
			var html = "";
			var fecha = new Date(document.getElementById("fechaInicio").value);
			var date = sumarDias(fecha,1);
			//var dateConvertida = convertDate(date);
			//var date = sumaFecha(1,fecha);
			var date2 = new Date(fecha);
			

			var weekdays = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
			var meses = ["","January","February","March","April","May","June","July","August","September","October","November","December"];
			var numDiasMes = [0,31,28,31,30,31,30,31,31,30,31,30,31];

			var weekday = weekdays[date2.getDay()];
			var month = date.getMonth() + 1;
			var year = date.getYear();
			
			var dias = document.getElementById("numeroDias").value;
			var fechaInicial = convertDate(date2);
			var ultFecha = convertDate(sumarDias(date2,-1));
			var ultimaFecha = sumaFecha(dias,ultFecha);
			var tempDia = ultimaFecha.toString().substring(0,2);
			var tempMes = ultimaFecha.toString().substring(3,5);
			var tempYear = ultimaFecha.toString().substring(6,10);
			var nuevaFecha = tempMes + "/" + tempDia + "/" + tempYear;
			var nuevaFechaInt = parseInt(tempYear+tempMes+tempDia);
			var temp = new Date(nuevaFecha);
			var weekdayFinal = weekdays[temp.getDay()];
			

			//alert("Fecha: " + fechaInicial + " Días: " + dias + " Día Semana: " + weekday + " Mes: " + month + " Año: " + year + " Última fecha: " + ultimaFecha + " Día semana final: " + weekdayFinal);

			var yearInicial = fechaInicial.toString().substring(6,10);
			var mesInicial = fechaInicial.toString().substring(3,5);
			var diaInicial = fechaInicial.toString().substring(0,2);

			var yearFinal = ultimaFecha.toString().substring(6,10);
			var mesFinal = ultimaFecha.toString().substring(3,5);
			var diaFinal = ultimaFecha.toString().substring(0,2);

			var yearInicialInt = parseInt(yearInicial);
			var mesInicialInt = parseInt(mesInicial);
			var diaInicialInt = parseInt(diaInicial);

			var yearFinalInt = parseInt(yearFinal);
			var mesFinalInt = parseInt(mesFinal);
			var diaFinalInt = parseInt(diaFinal);

			var encabezado = "<div id=\"calendario\">	<div class=\"month\"><ul><li>";
			//mes
			var encabezado2 = "<br><span style=\"font-size:18px\">";
			//year
			var encabezado3 = "</span></li></ul></div><ul class=\"weekdays\"><li>Su</li><li>Mo</li><li>Tu</li><li>We</li><li>Th</li><li>Fr</li><li>Sa</li></ul><ul class=\"days\">";
			var formatoDia1 = "<li class=\"";
			//clase
			var formatoDia2 = "\">";
			//dia
			var formatoDia3 = "</li>";
			var pieCalendario = "</ul></div>";

			//alert("yearInicial: " + yearInicialInt + " mesInicial: " + mesInicialInt + " diaInicial: " + diaInicialInt + " yearFinal: " + yearFinalInt + " mesFinal: " + mesFinalInt + " diaFinal: " + diaFinalInt);

			var primeraVez = true;

			for (i=yearInicialInt; i <= yearFinalInt; i++)
			{
				if(yearInicialInt == yearFinalInt){
					for(j =mesInicialInt; j<=mesFinalInt; j++)
					{						
						var stringFechaPrimerDiaMes = devuelveMesString(j) + "/01/" + i; 
						var fechaPrimerDiaMes = new Date(stringFechaPrimerDiaMes);
						var primerDiaMes = fechaPrimerDiaMes.getDay();
						html+=encabezado;
						html+=meses[j];
						html+=encabezado2;
						html+=i;
						html+=encabezado3;
						var primerDia = 0;
						var numeroDia = 1;
						while(primerDia < primerDiaMes)
						{
							html+=formatoDia1;
							html+="EnGris";
							html+=formatoDia2;
							html+=".";
							html+=formatoDia3;

							primerDia++;
						}
						if(primeraVez == true){
							var diaInicio = 1;
							while(diaInicio < diaInicialInt)
							{
								html+=formatoDia1;
								html+="EnGris";
								html+=formatoDia2;
								html+=".";
								html+=formatoDia3;

								diaInicio++;
							}
							primeraVez = false;
							numeroDia = diaInicio;
						}

						var numeroDiasMes = parseInt(numDiasMes[j]);
						if(j == 2)
						{
							if(esBisiesto(i)==true)
							{
								numeroDiasMes = 29;

							}							
						}
						while(numeroDia <= numeroDiasMes)
						{							
							html+=formatoDia1;
							var formatoStringFecha = devuelveMesString(j) + "/" + devuelveDiaString(numeroDia) + "/" + i;
							var formatoFecha = new Date(formatoStringFecha);
							var diaSemana = formatoFecha.getDay();
							var formatoStringFinal = "" + i + devuelveMesString(j) + devuelveDiaString(numeroDia);
							var formatoFechaInt = parseInt(formatoStringFinal);
							
							if(formatoFechaInt>nuevaFechaInt){
								html+="EnGris";
							}
							else{
								if(diaSemana == 0 || diaSemana == 6){
									html+="FinSemana";
								}
								else{
									html+="EntreSemana";
								}	
							}
														
							html+=formatoDia2;
							if(formatoFechaInt>nuevaFechaInt){
								html+=".";								
							}
							else{
								html+=numeroDia;	
							}
							html+=formatoDia3;

							numeroDia++;
						}

						
						var stringFechaUltimoDiaMes = devuelveMesString(j) + "/" + numeroDiasMes + "/" + i; 
						var fechaUltimoDiaMes = new Date(stringFechaUltimoDiaMes);
						var ultimoDiaMes = fechaUltimoDiaMes.getDay();

						while(ultimoDiaMes < 6)
						{
							html+=formatoDia1;
							html+="EnGris";
							html+=formatoDia2;
							html+=".";
							html+=formatoDia3;

							ultimoDiaMes++;
						}
						html+=pieCalendario;
						html+="<br>";
					}
				}
				else{
					switch(i) {
					    case yearInicialInt:
					        for(j=mesInicialInt; j<=12;j++)
							{
								var stringFechaPrimerDiaMes = devuelveMesString(j) + "/01/" + i; 
								var fechaPrimerDiaMes = new Date(stringFechaPrimerDiaMes);
								var primerDiaMes = fechaPrimerDiaMes.getDay();
								html+=encabezado;
								html+=meses[j];
								html+=encabezado2;
								html+=i;
								html+=encabezado3;
								var primerDia = 0;
								var numeroDia = 1;
								while(primerDia < primerDiaMes)
								{
									html+=formatoDia1;
									html+="EnGris";
									html+=formatoDia2;
									html+=".";
									html+=formatoDia3;

									primerDia++;
								}
								if(primeraVez == true){
									var diaInicio = 1;
									while(diaInicio < diaInicialInt)
									{
										html+=formatoDia1;
										html+="EnGris";
										html+=formatoDia2;
										html+=".";
										html+=formatoDia3;

										diaInicio++;
									}
									primeraVez = false;
									numeroDia = diaInicio;
								}

								var numeroDiasMes = parseInt(numDiasMes[j]);
								if(j == 2)
								{
									if(esBisiesto(i)==true)
									{
										numeroDiasMes = 29;

									}
									
								}
								while(numeroDia <= numeroDiasMes)
								{							
									html+=formatoDia1;
									var formatoStringFecha = devuelveMesString(j) + "/" + devuelveDiaString(numeroDia) + "/" + i;
									var formatoFecha = new Date(formatoStringFecha);
									var diaSemana = formatoFecha.getDay();
									var formatoStringFinal = "" + i + devuelveMesString(j) + devuelveDiaString(numeroDia);
									var formatoFechaInt = parseInt(formatoStringFinal);
									
									if(formatoFechaInt>nuevaFechaInt){
										html+="EnGris";
									}
									else{
										if(diaSemana == 0 || diaSemana == 6){
											html+="FinSemana";
										}
										else{
											html+="EntreSemana";
										}	
									}
																
									html+=formatoDia2;
									if(formatoFechaInt>nuevaFechaInt){
										html+=".";								
									}
									else{
										html+=numeroDia;	
									}
									html+=formatoDia3;

									numeroDia++;
								}

								
								var stringFechaUltimoDiaMes = devuelveMesString(j) + "/" + numeroDiasMes + "/" + i; 
								var fechaUltimoDiaMes = new Date(stringFechaUltimoDiaMes);
								var ultimoDiaMes = fechaUltimoDiaMes.getDay();

								while(ultimoDiaMes < 6)
								{
									html+=formatoDia1;
									html+="EnGris";
									html+=formatoDia2;
									html+=".";
									html+=formatoDia3;

									ultimoDiaMes++;
								}
								html+=pieCalendario;
								html+="<br>";

							}
					        break;
					    case yearFinalInt:
					        for(j=1; j<=mesFinalInt;j++)
							{
								var stringFechaPrimerDiaMes = devuelveMesString(j) + "/01/" + i; 
								var fechaPrimerDiaMes = new Date(stringFechaPrimerDiaMes);
								var primerDiaMes = fechaPrimerDiaMes.getDay();
								html+=encabezado;
								html+=meses[j];
								html+=encabezado2;
								html+=i;
								html+=encabezado3;
								var primerDia = 0;
								var numeroDia = 1;
								while(primerDia < primerDiaMes)
								{
									html+=formatoDia1;
									html+="EnGris";
									html+=formatoDia2;
									html+=".";
									html+=formatoDia3;

									primerDia++;
								}
								if(primeraVez == true){
									var diaInicio = 1;
									while(diaInicio < diaInicialInt)
									{
										html+=formatoDia1;
										html+="EnGris";
										html+=formatoDia2;
										html+=".";
										html+=formatoDia3;

										diaInicio++;
									}
									primeraVez = false;
									numeroDia = diaInicio;
								}

								var numeroDiasMes = parseInt(numDiasMes[j]);
								if(j == 2)
								{
									if(esBisiesto(i)==true)
									{
										numeroDiasMes = 29;

									}
									
								}
								while(numeroDia <= numeroDiasMes)
								{							
									html+=formatoDia1;
									var formatoStringFecha = devuelveMesString(j) + "/" + devuelveDiaString(numeroDia) + "/" + i;
									var formatoFecha = new Date(formatoStringFecha);
									var diaSemana = formatoFecha.getDay();
									var formatoStringFinal = "" + i + devuelveMesString(j) + devuelveDiaString(numeroDia);
									var formatoFechaInt = parseInt(formatoStringFinal);
									
									if(formatoFechaInt>nuevaFechaInt){
										html+="EnGris";
									}
									else{
										if(diaSemana == 0 || diaSemana == 6){
											html+="FinSemana";
										}
										else{
											html+="EntreSemana";
										}	
									}
																
									html+=formatoDia2;
									if(formatoFechaInt>nuevaFechaInt){
										html+=".";								
									}
									else{
										html+=numeroDia;	
									}
									html+=formatoDia3;

									numeroDia++;
								}

								
								var stringFechaUltimoDiaMes = devuelveMesString(j) + "/" + numeroDiasMes + "/" + i; 
								var fechaUltimoDiaMes = new Date(stringFechaUltimoDiaMes);
								var ultimoDiaMes = fechaUltimoDiaMes.getDay();

								while(ultimoDiaMes < 6)
								{
									html+=formatoDia1;
									html+="EnGris";
									html+=formatoDia2;
									html+=".";
									html+=formatoDia3;

									ultimoDiaMes++;
								}
								html+=pieCalendario;
								html+="<br>";
							}
					        break;
					    default:
					        for(j=1; j<=12;j++)
							{
								var stringFechaPrimerDiaMes = devuelveMesString(j) + "/01/" + i; 
								var fechaPrimerDiaMes = new Date(stringFechaPrimerDiaMes);
								var primerDiaMes = fechaPrimerDiaMes.getDay();
								html+=encabezado;
								html+=meses[j];
								html+=encabezado2;
								html+=i;
								html+=encabezado3;
								var primerDia = 0;
								var numeroDia = 1;
								while(primerDia < primerDiaMes)
								{
									html+=formatoDia1;
									html+="EnGris";
									html+=formatoDia2;
									html+=".";
									html+=formatoDia3;

									primerDia++;
								}
								
								var numeroDiasMes = parseInt(numDiasMes[j]);
								if(j == 2)
								{
									if(esBisiesto(i)==true)
									{
										numeroDiasMes = 29;

									}
									
								}
								while(numeroDia <= numeroDiasMes)
								{							
									html+=formatoDia1;
									var formatoStringFecha = devuelveMesString(j) + "/" + devuelveDiaString(numeroDia) + "/" + i;
									var formatoFecha = new Date(formatoStringFecha);
									var diaSemana = formatoFecha.getDay();
									var formatoStringFinal = "" + i + devuelveMesString(j) + devuelveDiaString(numeroDia);
									var formatoFechaInt = parseInt(formatoStringFinal);
																		
									if(diaSemana == 0 || diaSemana == 6){
										html+="FinSemana";
									}
									else{
										html+="EntreSemana";
									}	
															
									html+=formatoDia2;
									if(formatoFechaInt>nuevaFechaInt){
										html+=".";								
									}
									else{
										html+=numeroDia;	
									}
									html+=formatoDia3;

									numeroDia++;
								}

								
								var stringFechaUltimoDiaMes = devuelveMesString(j) + "/" + numeroDiasMes + "/" + i; 
								var fechaUltimoDiaMes = new Date(stringFechaUltimoDiaMes);
								var ultimoDiaMes = fechaUltimoDiaMes.getDay();

								while(ultimoDiaMes < 6)
								{
									html+=formatoDia1;
									html+="EnGris";
									html+=formatoDia2;
									html+=".";
									html+=formatoDia3;

									ultimoDiaMes++;
								}
								html+=pieCalendario;
								html+="<br>";


							}
					}
					 
				}				
			}

			var totalDias = dias;
			//while (totalDias > 0) {
 				 //saber cuantos dìas tiene un mes
 				 //saber si un año es bisiesto
 				 //restar a totalDias el tiempo transcurrido cada mes 
			//}







			$("#calendarios").html(html);
		});		
});

function devuelveMesString(mes)
{
	if(mes>=10)
	{
		return mes;
	}
	else{
		return "0" + mes;
	}
}

function devuelveDiaString(dia)
{
	if(dia>=10)
	{
		return dia;
	}
	else{
		return "0" + dia;
	}
}

function sumarDias(fechaP, diasP){
	fechaP.setDate(fechaP.getDate() + diasP);
    return fechaP;
}

sumaFecha = function(d, fecha)
{
	 var Fecha = new Date();
	 var sFecha = fecha || (Fecha.getDate() + "/" + (Fecha.getMonth() +1) + "/" + Fecha.getFullYear());
	 var result = sFecha.toString();
	 var sep = result.indexOf("/") != -1 ? "/" : "-"; 
	 var aFecha = result.split(sep);
	 var fecha = aFecha[2]+'/'+aFecha[1]+"/"+aFecha[0];
	 fecha= new Date(fecha);
	 fecha.setDate(fecha.getDate()+parseInt(d));
	 var anno=fecha.getFullYear();
	 var mes= fecha.getMonth()+1;
	 var dia= fecha.getDate();
	 mes = (mes < 10) ? ("0" + mes) : mes;
	 dia = (dia < 10) ? ("0" + dia) : dia;
	 var fechaFinal = dia+sep+mes+sep+anno;
	 return (fechaFinal);
 }

 function convertDate(inputFormat) {
  function pad(s) { return (s < 10) ? '0' + s : s; }
  var d = new Date(inputFormat);
  return [pad(d.getDate()), pad(d.getMonth()+1), d.getFullYear()].join('/');
}

function duration(since, until) {
	alert("since: " + since + " until: " + until);
	//if first date is greater that the first, we fix the order
	if (since > until) {
		var temp = since;
		since = until;
		until = temp;
	}

	var years,months,days;
	
	//Years
	years = (until.getFullYear() - since.getFullYear());
	if (until.getMonth() == since.getMonth()){
		if (since.getDate() < (until.getDate()-1)) {
			years += 1;
		}
		if(since.getDate()==until.getDate()){
				years+= 1;
		}
	}
	if(since.getMonth() > until.getMonth()){
			years = (years - 1);
	}
	//Months
	if(since.getDate() > until.getDate()){
		if(since.getMonth() > (until.getMonth()-1)){
			months = 11 - (since.getMonth() - until.getMonth());
			if (since.getMonth() == until.getMonth()){
				months = 11;
			}
		}else{
			months = until.getMonth() - since.getMonth() - 1;
		}
	}else{
		if(since.getMonth() > until.getMonth()){
			months = 12 - (until.getMonth() - since.getMonth());
		}else{
			months = until.getMonth() - since.getMonth();
		}
	}
	//Days
	if(since.getDate() > (until.getDate()-1)){
		var days_pm = dayssInmonths(until.getMonth(until.getMonth()-1));
		days =  days_pm - since.getDate() + until.getDate();
		if((since.getMonth() == until.getMonth()) & (since.getDate()==until.getDate())){			
			days = 0;
		}
	}else{
		days = until.getDate() - since.getDate();
	}
	
	return ({"years":years,"months":months,"days":days});
}

function dayssInmonths(date){
	date = new Date(date);
	return 32 - new Date(date.getFullYear(), date.getMonth(), 32).getDate();
}

function esBisiesto(year){
	if ((((year%100)!=0)&&((year%4)==0))||((year%400)==0)){

		  return true;

		 }

	 else{return false;}

}