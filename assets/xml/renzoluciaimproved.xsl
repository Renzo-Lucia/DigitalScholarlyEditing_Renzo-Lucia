<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
    xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns:tei="http://www.tei-c.org/ns/1.0"
    exclude-result-prefixes="tei">

    <xsl:output method="html" encoding="UTF-8" indent="yes"/>

    <xsl:template match="/">
        <html>
            <head>
                <title>2 texts comparison page</title>
                <style>
                    body {
                        font-family: Georgia, serif;
                        line-height: 1.5;
                        max-width: 95%;
                        margin: auto;
                        padding: 1em;
                        background-color: #beb3a4
                    }
                    .columns {
                        display: flex;
                        gap: 2em;
                        align-items: flex-start;
                    }
                    .column {
                        flex: 1;
                        min-width: 0;
                    }
                    h2 {
                        text-align: center;
                        margin-top: 0;
                    }
                    .persName { font-weight: bold; color: darkblue; }
                    .placeName { font-weight: bold; color: #0C9F43 ; }
                    .date { font-weight: bold; color: #DC19A3; }
                    .lineBreak { display: inline; }
                    .pageBreak {
                        margin: 2em 0;
                        padding-top: 1em;
                        border-top: 1px solid #ccc;
                        text-align: center;
                        font-size: 0.9em;
                        font-style: italic;
                        color: #777;
                    }
                    .subtitle{
                        color: #A1243B;
                    }
                    .inline-figure {
                        float: left; /* oppure right, se preferisci */
                        margin: 0 1em 1em 0; /* spazio attorno all'immagine */
                        max-width: 40%; /* opzionale, per limitare larghezza */
                    }

                    .inline-figure img {
                        width: 100%;
                        height: auto;
                    }

                    .inline-figure figcaption {
                        font-size: 0.85em;
                        color: #555;
                    }
                    .image-placeholder {
                        width: 40%;
                        height: 200px; 
                        border: 2px dashed #999;
                        background-color: #f2f2f2;
                        color: #777;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        float: left; /* oppure right, come per le figure */
                        margin: 0 1em 1em 0;
                        font-style: italic;
                    }

                    .page {
                        min-height: 300px; /* oppure un valore adeguato alla tua pagina */
                        box-sizing: border-box;
                        margin-bottom: 2em;
                        display: flex;
                        flex-direction: column;
                        justify-content: flex-start;
                    }

                    .add-image{
                        width: 350px;        
                        height: 200px;
                        border: 2px solid #3399ff;
                        background-color: #cce6ff; /* azzurro */
                        margin: 1em 0;
                    }
                    .missingfigure{
                        font-family: Georgia, serif;
                        line-height: 1.5;
                        margin-top:40px;
                        margin-left:10px;
                        cursor: pointer;
                    }
                    .yellowadd{
                        background-color:hsl(50, 85.50%, 48.60%); 
                    }
                    .redgap{
                        background-color: #c46f71;
                    }
                    .unclearword{
                        color: gray;
                        font-weight: bold;
                        text-decoration: underline wavy gray;
                    }
                    .corrisplink{
                        font-weight: bold;
                        color: black;
                        text-decoration: none;
                    }
                    .abbreviate{
                        background-color: #5ce1e6; 
                    }
                    .mod{
                        background-color: #cb6ce6; 
                    }

                    .tooltip {
                        position: relative;
                        display: inline; /* resta inline, non sposta il testo */
                    }

                    .tooltip .tooltiptext {
                        visibility: hidden;
                        width: 200px;
                        background-color: #635548;
                        color: #fff;
                        text-align: center;
                        padding: 4px 6px;
                        border-radius: 6px;
                        position: absolute;   /* si stacca dal flusso */
                        z-index: 1;
                        bottom: 125%;         /* appare sopra */
                        font-weight: normal;
                        transform: translateX(-50%);
                        font-size: 0.8em;
                        white-space: normal;  /* va a capo se serve */
                        margin-left: 60px;
                    }

                    .tooltip:hover .tooltiptext {
                        visibility: visible;
                    }

                    .idiom{
                        background-color: #c1ff72; 
                    }

                    .legend-container {
                        margin-bottom: 1em;
                        font-family: sans-serif;
                        }

                    /* checkbox nascosto */
                    .legend-checkbox {
                        display: none;
                    }

                    /* bottone */
                    .legend-toggle {
                        display: inline-block;
                        background-color: #635548;
                        color: #f4fafd;
                        padding: 8px 16px;
                        cursor: pointer;
                        font-weight: bold;
                        border-radius: 6px;
                    }

                    /* contenuto della legenda */
                    .legend-content {
                        max-height: 0;
                        overflow: hidden;
                        transition: max-height 0.3s ease;
                        border: 1px solid #ccc;
                        padding: 0 10px;
                        background-color: #ffffff;
                        border-radius: 10px;
                        margin-top: 5px;
                        width:600px;
                        
                        }

                    /* quando il checkbox è selezionato, apri la legenda */
                    .legend-checkbox:checked + .legend-toggle + .legend-content {
                        max-height: 800px; /* abbastanza per contenuto */
                        padding: 10px;
                    }
                    #legend-smallbox{
                        width:300px;
                        height:20px;
                    }

                </style>
            </head>
            <body>

            <div class="legend-container">
                <input type="checkbox" id="legend-toggle" class="legend-checkbox"/>
                <label for="legend-toggle" class="legend-toggle">Legenda</label>
                <div class="legend-content">
                    <p class="persName"> Characters</p>
                    <p class="placeName"> Places</p>
                    <p class="date"> Dates</p>
                    <p class="unclearword"> Unclear word</p>
                    <p class="legend-color add-image" id="legend-smallbox"> Added image in Manzoni's work</p>
                    <p class="legend-color yellowadd"> (a) Spanish Additions</p>
                    <p class="legend-color redgap"> (g) Spanish omissions</p>
                    <p class="legend-color abbreviate"> (ab) Spanish abbreviated names</p>
                    <p class="legend-color mod"> (m) Spanish modifications and different interpretations</p>
                    <p class="legend-color mod"> (Mm) Spanish modifications and different interpretations studied by Muñiz Muñiz</p> 
                    <p class="legend-color idiom"> (Im) Spanish idiomatic expressions studied by Pecchiari</p>
                </div>
                </div>

                <div class="columns">
                    <div class="column">
                        <h2>I promessi sposi by Manzoni</h2>
                        <xsl:apply-templates select="/tei:TEI/tei:text/tei:body"/>
                    </div>
                    <div class="column">
                        <h2>Los novios by Gallego</h2>
                        <xsl:apply-templates 
                            select="document('los_novios_TEI_completo_full.xml')/tei:TEI/tei:text/tei:body"/>
                    </div>
                </div>
            </body>
        </html>
    </xsl:template>

    <!-- Chiavi per contenuto pagina -->
    <xsl:key name="page-content-it" match="tei:pb" use="@n"/>
    <xsl:key name="page-content-es" match="tei:pb" use="@n"/>

    <!-- Recupera contenuto dalla pagina fino alla prossima pb -->
    <xsl:template match="tei:pb">
        <xsl:variable name="n" select="@n"/>
        <xsl:for-each select="following-sibling::*[not(self::tei:pb)][
            count(preceding-sibling::tei:pb) = count(current()/preceding-sibling::tei:pb)
        ]">
            <xsl:apply-templates select="."/>
        </xsl:for-each>
    </xsl:template>

   

    <xsl:template match="tei:img">
        <img>
            <xsl:attribute name="src">
                <xsl:value-of select="@src"/>
            </xsl:attribute>
            <xsl:attribute name="alt">
                <xsl:value-of select="../tei:figDesc"/>
            </xsl:attribute>
        </img>
    </xsl:template>

    <xsl:template match="tei:add[@rend='nofigure']">
        <div class="add-image">
            <span class="missingfigure"> 
                <xsl:apply-templates/>
            </span>
        </div>
    </xsl:template>

    <!-- Elementi speciali -->
    <xsl:template match="tei:persName">
        <span class="persName"><xsl:apply-templates/></span>
    </xsl:template>

    <xsl:template match="tei:placeName">
        <span class="placeName"><xsl:apply-templates/></span>
    </xsl:template>

    <xsl:template match="tei:date">
        <span class="date"><xsl:apply-templates/></span>
    </xsl:template>

    <!-- Line break -->
    <xsl:template match="tei:lb">
        <br class="lineBreak"/>
    </xsl:template>

    <!-- Page break -->
    <xsl:template match="tei:pb">
        <div class="pageBreak">Page <xsl:value-of select="@n"/></div>
    </xsl:template>

    <xsl:template match="tei:figure">
        <figure style="margin: 1em 0; ">
            <xsl:apply-templates select="tei:img"/>
        <figcaption style="font-size: 0.85em; color: #555; margin-top: 0.3em;">
            <xsl:apply-templates select="tei:figDesc"/>
        </figcaption>
  </figure>
    </xsl:template>

    <xsl:template match="tei:img">
        <img style="max-width: 100%; height: auto;" >
    <xsl:attribute name="src">
      <xsl:value-of select="@src"/>
    </xsl:attribute>
    <xsl:attribute name="alt">
      <xsl:value-of select="../tei:figDesc"/>
    </xsl:attribute>
    </img>
    </xsl:template>

    <xsl:template match="tei:pb">
  <div class="page">
    <xsl:variable name="n" select="@n"/>
    <xsl:for-each select="following-sibling::*[not(self::tei:pb)][
        count(preceding-sibling::tei:pb) = count(current()/preceding-sibling::tei:pb)
    ]">
        <xsl:apply-templates select="."/>
    </xsl:for-each>
    <div class="pageBreak">Page <xsl:value-of select="$n"/></div>
  </div>
</xsl:template>

<xsl:template match="said">
  <p class="speech">
    <span class="speaker">
      <strong><xsl:value-of select="@who"/>:</strong>
    </span>
    <span class="utterance">
      «<xsl:value-of select="."/>»
    </span>
    <xsl:if test="@toWhom">
      <span class="toWhom"> (to <xsl:value-of select="@toWhom"/>)</span>
    </xsl:if>
  </p>
</xsl:template>

<!-- ADDITION Caso testo spagnolo (con xml:id) -->
<xsl:template match="tei:add[@xml:id and @reason='addition']">
  <span class="yellowadd" id="{@xml:id}-es">
    <a href="#{@xml:id}-it" class="corrisplink">
      <xsl:apply-templates select="tei:seg"/>
    </a>
    <xsl:apply-templates select="node()[not(self::tei:seg)]"/>
  </span>
</xsl:template>

<!-- Punto corrispondente addition testo italiano (con corresp) -->
<xsl:template match="tei:add[@corresp and @reason='addition']">
  <span class="yellowadd" id="{substring(@corresp,2)}-it">
    <a href="#{substring(@corresp,2)}-es" class="corrisplink">
      <xsl:apply-templates select="tei:seg"/>
    </a>
    <xsl:apply-templates select="node()[not(self::tei:seg)]"/>
  </span>
</xsl:template>


<!-- OMISSION Caso testo spagnolo (con xml:id) -->
<xsl:template match="tei:gap[@xml:id and @reason='omission']">
  <span class="redgap" id="{@xml:id}-es">
    <a href="#{@xml:id}-it" class="corrisplink">
      <xsl:apply-templates select="tei:seg"/>
    </a>
    <xsl:apply-templates select="node()[not(self::tei:seg)]"/>
  </span>
</xsl:template>

<!-- Punto corrispondente omission testo italiano (con corresp) -->
<xsl:template match="tei:gap[@corresp and @reason='omission']">
  <span class="redgap" id="{substring(@corresp,2)}-it">
    <a href="#{substring(@corresp,2)}-es" class="corrisplink">
      <xsl:apply-templates select="tei:seg"/>
    </a>
    <xsl:apply-templates select="node()[not(self::tei:seg)]"/>
  </span>
</xsl:template>


<!-- ABBR -->
<xsl:template match="tei:abbr[@xml:id and @reason='abbre']">
  <span class="abbreviate" id="{@xml:id}-es">
    <a href="#{@xml:id}-it"  class="corrisplink">
      <xsl:apply-templates select="tei:seg"/>
    </a>
    <xsl:apply-templates select="node()[not(self::tei:seg)]"/>
  </span>
</xsl:template>

<!-- Punto corrispondente abbr testo italiano -->
<xsl:template match="tei:abbr[@corresp and @reason='abbre']">
  <span class="abbreviate" id="{substring(@corresp,2)}-it">
    <a href="#{substring(@corresp,2)}-es"  class="corrisplink">
      <xsl:apply-templates select="tei:seg"/>
    </a>
    <xsl:apply-templates select="node()[not(self::tei:seg)]"/>
  </span>
</xsl:template>

<!-- MODIFICATION -->
<xsl:template match="tei:mod[@xml:id and @reason='interpretation']">
  <span class="mod" id="{@xml:id}-es">
    <a href="#{@xml:id}-it" class="corrisplink">
      <xsl:apply-templates select="tei:seg"/>
    </a>
    <xsl:apply-templates select="node()[not(self::tei:seg)]"/>
  </span>
</xsl:template>

<!-- Punto corrispondente abbr testo italiano con tooltip -->
<xsl:template match="tei:mod[@corresp and @reason='interpretation']">
  <span class="mod" id="{substring(@corresp,2)}-it">
    <a href="#{substring(@corresp,2)}-es" class="corrisplink">
      <xsl:apply-templates select="tei:seg"/>
    </a>
    <xsl:apply-templates select="node()[not(self::tei:seg)]"/>
  </span>
</xsl:template>


<!-- MM MODIFICATION -->
<xsl:template match="tei:seg[@xml:id and @reason='Minterpretation']">
  <span class="tooltip" id="{@xml:id}-es">
    <xsl:apply-templates/> <!-- solo il testo del seg -->
    <span class="tooltiptext">Gallego inserts a few subtle twists in the narrative softening the critique of the clergy and the Spanish monarchy. Here he offset Don Abbondio’s moral shortcomings (Muñiz Muñiz, 2012, pp. 93-112.):</span>
  </span>
</xsl:template>

<!-- MM MODIFICATION: italiano -->
<xsl:template match="tei:seg[@corresp and @reason='Minterpretation']">
  <span class="tooltip" id="{substring(@corresp,2)}-it">
    <xsl:apply-templates/> <!-- solo il testo del seg -->
    <span class="tooltiptext">Manzoni offers critique of both the clergy and the Spanish monarchy</span>
  </span>
</xsl:template>

<!-- IDIOMATIC -->
<xsl:template match="tei:mod[@xml:id and @reason='idiomatic']">
  <span class="idiom" id="{@xml:id}-es">
    <a href="#{@xml:id}-it" class="corrisplink">
      <xsl:apply-templates select="tei:seg"/>
    </a>
    <xsl:apply-templates select="node()[not(self::tei:seg)]"/>
  </span>
</xsl:template>

<!-- Punto corrispondente idom testo italiano con tooltip -->
<xsl:template match="tei:mod[@corresp and @reason='idiomatic']">
  <span class="idiom" id="{substring(@corresp,2)}-it">
    <a href="#{substring(@corresp,2)}-es" class="corrisplink">
      <xsl:apply-templates select="tei:seg"/>
    </a>
    <xsl:apply-templates select="node()[not(self::tei:seg)]"/>
  </span>
</xsl:template>

<!-- IDIOMATIC MODIFICATION 1-->
<xsl:template match="tei:seg[@xml:id and @reason='TP1idiomatic']">
  <span class="tooltip" id="{@xml:id}-es">
    <xsl:apply-templates/> <!-- solo il testo del seg -->
    <span class="tooltiptext">Here the Perpetua’s folk wisdom finds new life in the Gallego's translation wrapped inside a spanish local saying (Pecchiari, 2014-2015, p. 34.):</span>
  </span>
</xsl:template>

<!-- IDIOMATIC MODIFICATION 1: italiano -->
<xsl:template match="tei:seg[@corresp and @reason='TP1idiomatic']">
  <span class="tooltip" id="{substring(@corresp,2)}-it">
    <xsl:apply-templates/> <!-- solo il testo del seg -->
    <span class="tooltiptext">Manzoni'work is modifed through Gallego's spanish modifications of local sayings and popular maxims.</span>
  </span>
</xsl:template>

<!-- IDIOMATIC MODIFICATION 2 -->
<xsl:template match="tei:seg[@xml:id and @reason='TP2idiomatic']">
  <span class="tooltip" id="{@xml:id}-es">
    <xsl:apply-templates/> <!-- solo il testo del seg -->
    <span class="tooltiptext">Here Gallego translates Perpetua’s 'pensare', as she advises the curate, by inserting a spanish local expression indicating the tendency of someone who does not make hasty decisions but reflects before acting. (Pecchiari, 2014-2015, pp. 33-34.):</span>
  </span>
</xsl:template>

<!-- IDIOMATIC MODIFICATION 2: italiano -->
<xsl:template match="tei:seg[@corresp and @reason='TP2idiomatic']">
  <span class="tooltip" id="{substring(@corresp,2)}-it">
    <xsl:apply-templates/> <!-- solo il testo del seg -->
    <span class="tooltiptext">Manzoni'work is modifed through Gallego's spanish modifications of local sayings and popular maxims.</span>
  </span>
</xsl:template>



<xsl:template match="tei:unclear" >
  <span class="unclearword"><xsl:apply-templates/></span>
</xsl:template>

    <!-- Copia altri elementi -->
    <xsl:template match="*">
        <xsl:element name="{local-name()}">
            <xsl:apply-templates/>
        </xsl:element>
    </xsl:template>

    <!-- Testo -->
    <xsl:template match="text()">
        <xsl:value-of select="."/>
    </xsl:template>

</xsl:stylesheet>
