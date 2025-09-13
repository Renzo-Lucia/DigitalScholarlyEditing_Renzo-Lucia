from lxml import etree

# Percorsi ai file
xml_file = '/Users/alicep/Documents/GitHub/DigitalScholarlyEditing_Renzo-Lucia/assets/xml/ipromessisposi_cap1.xml'          # il tuo XML principale
xsl_file = '/Users/alicep/Documents/GitHub/DigitalScholarlyEditing_Renzo-Lucia/assets/xml/renzoluciaimproved.xsl'

# Carica i file
xml = etree.parse(xml_file)
xsl = etree.parse(xsl_file)

# Crea la trasformazione XSLT
transform = etree.XSLT(xsl)

# Applica la trasformazione
result = transform(xml)

# Salva l’output in un file HTML
output_file = 'improvedoutput.html'
with open(output_file, 'wb') as f:
    f.write(etree.tostring(result, pretty_print=True, method='html', encoding='UTF-8'))

print(f"File salvato come {output_file}. Aprilo con un browser per vedere il risultato.")


