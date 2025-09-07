<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="2.0"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  xmlns:tei="http://www.tei-c.org/ns/1.0"
  exclude-result-prefixes="tei">

  <xsl:output method="html" indent="yes" encoding="UTF-8"/>

  <!-- Template per la radice TEI -->
  <xsl:template match="tei:TEI">
    <html>
      <head>
        <title>
          <xsl:value-of select="tei:teiHeader/tei:fileDesc/tei:titleStmt/tei:title"/>
        </title>
        <style>
          body {
            font-family: Georgia, serif;
            line-height: 1.5;
            max-width: 95%;
            margin: auto;
            padding: 1em;
            background-color: #beb3a4;
          }
          .persName { font-weight: bold; color: darkblue; }
          .placeName { font-weight: bold; color: #0C9F43; }
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
        .figure-block {
    margin: 1em 0;
    max-width: 40%;
    clear: both;
}

.figure-block img {
    width: 100%;
    height: auto;
    display: block;
    margin: 0 auto;
}

.figure-block figcaption {
    font-size: 0.85em;
    color: #555;
    text-align: center;
    margin-top: 0.5em;
}

/* Forza tutto ciò che segue una figura in una nuova riga */
figure + * {
    clear: both;
}
    .readability-mode {
            font-family: "Georgia", serif;
            font-size: 1. 1 em;
            line-height: 3;
            background-color:rgba(253, 246, 227, 0.51); /* sfondo chiaro e poco affaticante */
            color: #333333;
            max-width: 60%;
            margin: auto;
            padding: 2em;
            text-align:center;
            word-spacing: 0.5em; 
            }

button{
    background-color:#635548;
    color: #beb3a4;
}
.readability-mode figure {
  margin: 1em auto; /* margine verticale e centro orizzontale */
  max-width: 40%;    /* opzionale, limita larghezza figura */
}

.readability-mode figure img {
  display: block;
  margin: 0 auto;  /* centra immagine dentro figure */
  width: 100%;     /* per adattarsi al max-width del figure */
  height: auto;
}

.readability-mode figure figcaption {
  font-size: 0.85em;
  color: #555;
  text-align: center;
  margin-top: 0.5em;
}

#bigphoto{
    max-height: 5px;
    width: auto;
}

        </style>


        <script>
      window.onload = function() {
        document.getElementById("toggleReadability").addEventListener("click", function() {
          document.body.classList.toggle("readability-mode");
        });
      };
  </script>
      </head>
      <body>
 <button id="toggleReadability" type="button">Better readability<i class="bi bi-eyeglasses"></i></button>
 <br/>
 <br/>
  <xsl:apply-templates select="tei:text/tei:body"/>
</body>
    </html>
  </xsl:template>

  <!-- Mantieni tutti gli altri template come prima -->

  <!-- Template per il body -->
  <xsl:template match="tei:body">
    <xsl:apply-templates/>
  </xsl:template>

  <!-- Template per fw -->
  <xsl:template match="tei:fw">
    <h3>
      <xsl:apply-templates/>
    </h3>
  </xsl:template>

  <!-- Template per div con tipo chapter -->
  <xsl:template match="tei:div[@type='chapter']">
    <div class="chapter">
      <h2>
        <xsl:value-of select="@n"/>
      </h2>
      <xsl:apply-templates/>
    </div>
  </xsl:template>

  <!-- Template per div standard (senza type)-->
  <xsl:template match="tei:div[not(@type)]">
    <div>
      <xsl:apply-templates/>
    </div>
  </xsl:template>

  <xsl:template match="head">
    <h1><xsl:value-of select="."/></h1>
  </xsl:template>

  <!-- Template per paragrafo -->
  <xsl:template match="tei:p">
    <p>
      <xsl:apply-templates/>
    </p>
  </xsl:template>

  <!-- Trasformazione di lb in <br class="lineBreak"/> -->
  <xsl:template match="tei:lb">
    <br class="lineBreak"/>
  </xsl:template>

  <!-- Trasformazione di pb (page break) in scritta "page N" con classe pageBreak -->
  <xsl:template match="tei:pb">
    <div class="pageBreak">
      <strong>Page <xsl:value-of select="@n"/></strong>
    </div>
  </xsl:template>

   <!-- Template per placeName, con classe placeName -->
  <xsl:template match="tei:placeName">
    <span class="placeName">
      <xsl:apply-templates/>
    </span>
  </xsl:template>
  <xsl:template match="tei:persName">
    <span class="persName ">
      <xsl:apply-templates/>
    </span>
  </xsl:template>
  <xsl:template match="tei:date">
    <span class="date">
      <xsl:apply-templates/>
    </span>
  </xsl:template>

   <!-- Template unico per figure -->
    <xsl:template match="tei:figure">
        <figure class="figure-block">
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
             <xsl:attribute name="bigphoto">
                <xsl:value-of select="bigphoto"/>
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


  <!-- Default: copia testo -->
  <xsl:template match="text()">
    <xsl:value-of select="."/>
  </xsl:template>

</xsl:stylesheet>
