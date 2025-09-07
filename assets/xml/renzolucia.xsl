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
             <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet"/>
             <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons/font/bootstrap-icons.css" rel="stylesheet"/>
                
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
                    high-readability {
                font-family: "Arial", sans-serif; /* oppure OpenDyslexic se disponibile */
                font-size: 1.2em;
                line-height: 1.8;
                }

                #Btnips{
                color: #f4fafd;
                background-color: #635548;
                height: 40px;
                width: 40px;
                }

                #Btnln{
                color: #f4fafd;
                background-color: #635548;
                height: 40px;
                width: 40px;
                }

                #fullscreenBtnips{
                color: #f4fafd;
                background-color: #635548;
                height: 40px;
                width: 40px;
                }

                #fullscreenBtnln{
                color: #f4fafd;
                background-color: #635548;
                height: 40px;
                width: 40px;
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
                        width:200px;
                        
                        }

                    /* quando il checkbox è selezionato, apri la legenda */
                    .legend-checkbox:checked + .legend-toggle + .legend-content {
                        max-height: 800px; /* abbastanza per contenuto */
                        padding: 10px;
                    }
                    
                </style>
                 <!-- Favicons -->
            </head>
            <body>
             <div class="legend-container">
                <input type="checkbox" id="legend-toggle" class="legend-checkbox"/>
                <label for="legend-toggle" class="legend-toggle">Legend</label>
                <div class="legend-content">
                    <p class="persName"> Characters</p>
                    <p class="placeName"> Places</p>
                    <p class="date"> Dates</p>
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
                            select="document('simpleLN.xml')/tei:TEI/tei:text/tei:body"/>
                    </div>
                </div>
            </body>
        </html>
    </xsl:template>

    <!-- Template unico per figure -->
    <xsl:template match="tei:figure">
        <figure class="inline-figure">
            <xsl:apply-templates select="tei:img"/>
            <figcaption>
                <xsl:apply-templates select="tei:figDesc"/>
            </figcaption>
        </figure>
    </xsl:template>

    <!-- Template per img -->
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
