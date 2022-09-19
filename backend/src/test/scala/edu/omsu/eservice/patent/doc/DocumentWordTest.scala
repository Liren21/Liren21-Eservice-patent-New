package edu.omsu.eservice.patent.doc

import java.io.FileOutputStream
import java.util.List

import edu.omsu.eservice.patent.doc.DocumentWord.{getClass, replace}
import org.apache.poi.xwpf.usermodel.{XWPFDocument, XWPFTable}
import org.scalatest.FunSpec

class DocumentWordTest extends FunSpec {
  it("should replace address") {
    val template = new XWPFDocument(getClass.getResourceAsStream("/заявление.docx"))
    val paragraphList: List[XWPFTable] = template.getTables

    replace("!название", "Application name", paragraphList)
    replace("!заявитель", "Application creator", paragraphList)
    replace("!адресзаяв", "Creator address", paragraphList)
    replace("!годсозд", "01.01.2019".split('.').apply(2), paragraphList)

    val out = new FileOutputStream("target/test.docx")
    template.write(out)
    out.close()
  }
}
