###### IM2 Dokumentation Projektarbeit 
# Eat your Destination
#### von Rebecca Baumberger mmp24b
---

 *Website* ➡️ [Eat your Destination](http://eatyourdestination.rebecca-baumberger.ch)

 ---

## Kurzbeschreibung des Projekts
Auf meiner Website haben wir eine nachhaltige Lösung für das Fliegen entwickelt 😉. Man kann die aktuellen Flüge vom Flughafen Genf und Zürich aufrufen und dann auf die gewünschte Verbindung klicken und erhält ein zufälliges Menue aus diesem Land. Da die API nur die Enddestination von Flügen freigibt, welche schon abgeflogen sind. Fand ich, wäre es auch eine geniale Lösung, um Menschen die gerade ihren Flug verpasst haben wenigsten die Freude zu bieten, sich in ihr Land zu kochen. So entstand die Idee zu Eat your destination.

*Beispiel*
Wenn man von Genf her fliegen will, kann man auf Genf klicken und die aktuellen Flüge der letzten 16 Stunden werden geladen (jedoch immer max 10 Stück). Nun kann man auf die Gewünschte Verbindung klicken zB. Barcelona und man erhält ein Rezept aus Spanien um sich in dieses Land zu kochen und das Fernweh zu stillen.

*Parameter*

Flugdaten
•⁠  ⁠Ankunftszeit
•⁠  ⁠Abflugzeit
•⁠  ⁠Destination (Stadt,Land)
•⁠  ⁠Callsign

Menuedaten
•⁠  Menue Name
•⁠  Zutaten
•⁠  Menue Bild
•⁠  Rezept anleitung


*API's*

•⁠  ⁠Flugdaten: OpenSky Network API
•⁠  ⁠Menuedaten: Free Meal API
•⁠  ⁠Länder zu Regionen sortieren: selbst erstellt mit Chat-cpt
•⁠  Icao Codes zu Stadt und Land: 
   https://raw.githubusercontent.com/jpatokal/openflights/master/data/airports-extended.dat

---

## Learnings und Schwierigkeiten
Ich habe sehr sehr viel gelernt in diesem Projekt und auch gemerkt, dass ich zwar die Grundkonzepte gut verstanden habe, aber wenn es komplizierter wurde relativ schnell an meine grenzen kam. Aber ich denke die gelernten Dinge direkt anzuwenden war sehr hilfreich! Das schwierigste war, die zwei API's miteindander zu verbinden. Da ich für jedes Land eine Region brauchte, musste ich erstens den icao Code der Flughäfen in Stadt und Land umwandeln. Danach musste ich jedem Land eine Region der Menue API zuteilen, da es nicht für jedes Land eine Region gab. Deshalb erhält man zum Beispiel bei deutschen Destinationen ein Menue aus Holland usw.
Ein anderes Problem war, dass ich nur eine gewisse anzahl Anfragen auf die API machen durfte. Daher habe ich im Entwicklungsprozess dummi Daten genommen um damit zu arbeiten.

Am 27.Mai war dann plötzlich ein fehler beim Laden der Flüge entstanden und mit Lea habe ich herausgefunden, dass die Flug API gerade down ist! Da ich nicht weiss ob dies zum Zeitpunkt des Bewertens auch so ist, habe ich in den jeweiligen js. dateien Dummi Daten hinterlegt auf der Zeile 66. Bitte versucht es dann mit diesen Daten!

---
## Benutzte Ressourcen und Prompts 
Ich habe oft die Logik auf gezeichnet auf ein Papier oder Ipad und dann anhand dessen versucht selbst die Funktion zu schreiben und dann meist ChatCPT dazu genommen und mir helfen lassen die Funktion zu vervollständigen. Wenn ich ihm gesagt habe, dass er mir jeden Schritt erklären soll habe ich auch noch sehr viel dazu gelernt.

Zudem waren Beni, Lea, Nick und Wolfgang eine grosse Hilfe beim entwirren meines Chaos im Kopf. 

---