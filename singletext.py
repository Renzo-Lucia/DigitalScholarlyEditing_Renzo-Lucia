from lxml import etree

# Carica il file XML TEI (input)
xml_file = 'assets/xml/ipromessisposi_cap1.xml'  # sostituisci con il percorso del tuo file XML

# Carica il file XSLT (foglio di stile)
xslt_file = 'assets/xml/visuaips.xsl'  # sostituisci con il percorso del tuo file XSLT

# Parsea i file
xml_doc = etree.parse(xml_file)
xslt_doc = etree.parse(xslt_file)

# Crea l'oggetto trasformazione
transform = etree.XSLT(xslt_doc)

# Applica la trasformazione
result = transform(xml_doc)

# Salva il risultato come file HTML
with open('visuaipsoutput.html', 'wb') as f:
    f.write(etree.tostring(result, pretty_print=True, method='html', encoding='UTF-8'))

print("Trasformazione completata, file output.html creato.")
