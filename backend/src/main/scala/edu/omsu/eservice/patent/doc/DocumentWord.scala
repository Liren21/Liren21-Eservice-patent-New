package edu.omsu.eservice.patent.doc

import edu.omsu.eservice.patent.entity.{Demand, RIDAuthor}
import org.apache.poi.xwpf.usermodel._

import java.io._
import java.util._
import scala.collection.JavaConversions._

@throws(classOf[Exception])
object DocumentWord {
  val EMPTY_RIDAuthor: RIDAuthor = RIDAuthor(
    id = 0,
    peopleId = None,
    peopleDate = "",
    surname = "",
    name = "",
    lastname = "",
    birthday = " . .   ",
    address = "",
    email = "",
    phone = "",
    work = "",
    position = "",
    department = "",
    series = "",
    number = "",
    whoGave = "",
    date = "",
    citizenship = "",
    contribution = "",
    isCreator = 0,
    isLeader = 0)

  def doWord(out: OutputStream, application: Demand, i: Int): Unit = {
    val template = new XWPFDocument(getClass.getResourceAsStream("/Согласие_на_указание_сведений.docx"))
    val paragraphList: List[XWPFTable] = template.getTables()
    val authList: List[RIDAuthor] = application.authors

    replace("!название", application.name, paragraphList)
    replace("!ФИО", authList.get(i).surname + " " + authList.get(i).name + " " + authList.get(i).lastname, paragraphList)
    replace("!ФамИО", authList.get(i).surname + " " + authList.get(i).name.charAt(0) + "." + authList.get(i).lastname.charAt(0) + ".", paragraphList)
    replace("!правообладатель", application.owner, paragraphList)
    replace("!числодр", " " + authList.get(i).birthday.split('.').apply(0), paragraphList)
    replace("!месяцдр", " " + authList.get(i).birthday.split('.').apply(1), paragraphList)
    replace("!годдр", " " + authList.get(i).birthday.split('.').apply(2), paragraphList)
    replace("!гражданство", authList.get(i).citizenship, paragraphList)
    replace("!адрес", authList.get(i).address, paragraphList)
    replace("!краткоеописание", " " + authList.get(i).contribution, paragraphList)

    template.write(out)
  }

  def demandRev(out: OutputStream, application: Demand, authorIdOpt: Option[Int]): Unit = {
    val template = new XWPFDocument(getClass.getResourceAsStream("/заявлениеобр.docx"))
    val paragraphList: List[XWPFTable] = template.getTables()
    val author: RIDAuthor = authorIdOpt.flatMap { authorId => application.authors.find(x => x.id == authorId) }.getOrElse(EMPTY_RIDAuthor)

    replace("!колво", application.authors.length.toString(), paragraphList)
    replace("!ФИО", author.surname + " " + author.name + " " + author.lastname, paragraphList)
    replace("!заявитель", application.owner, paragraphList)
    replace("!числодр", author.birthday.split('.').apply(0), paragraphList)
    replace("!месяцдр", author.birthday.split('.').apply(1), paragraphList)
    replace("!годдр", author.birthday.split('.').apply(2), paragraphList)
    replace("!гражданство", author.citizenship, paragraphList)
    replace("!адрес", author.address, paragraphList)
    replace("!краткоеописание", author.contribution, paragraphList)

    template.write(out)
  }

  def report(out: OutputStream, application: Demand): Unit = {
    val template = new XWPFDocument(getClass.getResourceAsStream("/реферат.docx"))
    val paragraphList: List[XWPFParagraph] = template.getParagraphs()

    var authors: String = ""
    var index = 0
    for (index <- 0 until application.authors.length) {
      authors += application.authors.apply(index).surname + " " + application.authors.apply(index).name.charAt(0) + "." + application.authors.apply(index).lastname.charAt(0) + "."
      if (index != (application.authors.length - 1))
        authors += ", "
    }

    replaceText("!название", application.name, paragraphList)
    replaceText("!заявитель", application.owner, paragraphList)
    replaceText("!авторы", authors, paragraphList)
    replaceText("!аннотация", application.annotation, paragraphList)
    replaceText("!пктип", application.pcType, paragraphList)
    replaceText("!язык", application.language, paragraphList)
    replaceText("!ос", application.OS, paragraphList)
    replaceText("!объем", application.size.toString, paragraphList)


    template.write(out)
  }

  def demand(out: OutputStream, application: Demand): Unit = {
    val template = new XWPFDocument(getClass.getResourceAsStream("/заявление.docx"))
    val paragraphList: List[XWPFTable] = template.getTables()

    replace("!название", application.name, paragraphList)
    replace("!заявитель", application.owner, paragraphList)
    replace("!адресзаяв", application.addressDemand, paragraphList)
    replace("!годсозд", application.createDate.split('.').apply(2), paragraphList)

    template.write(out)
  }

  def demandDop(out: OutputStream, application: Demand, authorIdOpt: Option[Int]): Unit = {
    val author: RIDAuthor = authorIdOpt.flatMap { authorId => application.authors.find(x => x.id == authorId) }.getOrElse(EMPTY_RIDAuthor)
    val template = new XWPFDocument(getClass.getResourceAsStream("/заявлениедоп.docx"))
    val paragraphList: List[XWPFTable] = template.getTables()

    replace("!название", application.name, paragraphList)
    replace("!ФИО", author.surname + " " + author.name + " " + author.lastname, paragraphList)
    replace("!заявитель", application.owner, paragraphList)
    replace("!адресзаяв", application.addressDemand, paragraphList)
    replace("!числодр", author.birthday.split('.').apply(0), paragraphList)
    replace("!месяцдр", author.birthday.split('.').apply(1), paragraphList)
    replace("!годдр", author.birthday.split('.').apply(2), paragraphList)
    replace("!гражданство", author.citizenship, paragraphList)
    replace("!адресс", author.address, paragraphList)
    replace("!краткоеописание", author.contribution, paragraphList)

    template.write(out)
  }


  def demandDopRev(out: OutputStream, application: Demand, authorIdOpt: Option[Int], authorId2Opt: Option[Int]): Unit = {
    val auth1 = authorIdOpt.flatMap(authorId => application.authors.find(x => x.id == authorId)).getOrElse(EMPTY_RIDAuthor)
    val auth2 = authorId2Opt.flatMap(authorId => application.authors.find(x => x.id == authorId)).getOrElse(EMPTY_RIDAuthor)
    val template = new XWPFDocument(getClass.getResourceAsStream("/заявлениедопобр.docx"))
    val paragraphList: List[XWPFTable] = template.getTables

    replace("!ФИО", auth1.surname + " " + auth1.name + " " + auth1.lastname, paragraphList)
    replace("!числодр", auth1.birthday.split('.').apply(0), paragraphList)
    replace("!месяцдр", auth1.birthday.split('.').apply(1), paragraphList)
    replace("!годдр", auth1.birthday.split('.').apply(2), paragraphList)
    replace("!гражданство", auth1.citizenship, paragraphList)
    replace("!адрес", auth1.address, paragraphList)
    replace("!краткоеописание", auth1.contribution, paragraphList)

    replace("!1ФИО", auth2.surname + " " + auth2.name + " " + auth2.lastname, paragraphList)
    replace("!1числодр", auth2.birthday.split('.').apply(0), paragraphList)
    replace("!1месяцдр", auth2.birthday.split('.').apply(1), paragraphList)
    replace("!1годдр", auth2.birthday.split('.').apply(2), paragraphList)
    replace("!1гражданство", auth2.citizenship, paragraphList)
    replace("!1адрес", auth2.address, paragraphList)
    replace("!1краткоеописание", auth2.contribution, paragraphList)

    template.write(out)
  }

  def agreement(out: OutputStream, application: Demand, i: Int): Unit = {
    val template = new XWPFDocument(getClass.getResourceAsStream("/согласие_на_обработку.docx"))
    val paragraphList: List[XWPFParagraph] = template.getParagraphs()

    val authList: List[RIDAuthor] = application.authors

    replaceText("!название", " " + application.name, paragraphList)
    replaceText("!ФИО", " " + authList.get(i).surname + " " + authList.get(i).name + " " + authList.get(i).lastname, paragraphList)
    replaceText("!почтовыйадрес", " " + authList.get(i).address, paragraphList)
    replaceText("!серия", authList.get(i).series, paragraphList)
    replaceText("!номерпаспорта", authList.get(i).number, paragraphList)
    replaceText("!кемвыдан", " " + authList.get(i).whoGave, paragraphList)
    replaceText("!когдавыдан", " " + authList.get(i).date, paragraphList)
    replaceText("!ФамИО", authList.get(i).surname + " " + authList.get(i).name.charAt(0) + "." + authList.get(i).lastname.charAt(0) + ".", paragraphList)

    template.write(out)
  }

  def foldingSplitter(acc: (Int, Int, Int, ArrayList[XWPFRun], ArrayList[XWPFRun], ArrayList[XWPFRun]), run: XWPFRun): (Int, Int, Int, ArrayList[XWPFRun], ArrayList[XWPFRun], ArrayList[XWPFRun]) = {
    val pos1 = acc._1
    val pos2 = acc._2
    val cntr = acc._3
    val before = acc._4
    val contains = acc._5
    val after = acc._6
    val l = run.getText(0).length
    if (cntr + l <= pos1) {
      before.add(run)
    } else if (cntr >= pos2) {
      after.add(run)
    } else {
      contains.add(run)
    }
    (pos1, pos2, cntr + l, before, contains, after)
  }

  @throws(classOf[Exception])
  def replace(tag: String, data: String, paragraphList: java.util.List[XWPFTable]): Unit = {

    paragraphList.foreach { e: XWPFTable =>
      val text1: String = e.getText()
      if (text1 != null && text1.contains(tag)) {
        val r: List[XWPFTableRow] = e.getRows()
        r.foreach { row: XWPFTableRow =>
          val cells: List[XWPFTableCell] = row.getTableCells()
          cells.foreach { cell: XWPFTableCell =>
            val textCell: String = cell.getText()

            if (textCell != null && textCell.contains(tag)) {
              val pars: List[XWPFParagraph] = cell.getParagraphs()
              pars.foreach { p: XWPFParagraph =>
                val pos1 = p.getText.indexOf(tag)
                if (pos1 >= 0) {
                  val pos2 = pos1 + tag.length

                  val runs: List[XWPFRun] = p.getRuns()

                  var cntr = 0
                  var last: Option[XWPFRun] = None
                  runs.foreach { run: XWPFRun =>
                    val t = run.getText(0)
                    if (t != null) {
                      if (cntr + t.length >= pos1 && cntr <= pos2) {
                        if (last.nonEmpty) {
                          val lt = last.get.getText(0)
                          last.get.setText("", 0)
                          run.setText(lt + run.getText(0), 0)
                        }
                        last = Some(run)
                      }
                      cntr = cntr + t.length
                    }
                  }
                  //val(_:Int, _:Int, cntr: Int, before: ArrayList[XWPFRun], contains:ArrayList[XWPFRun], after: ArrayList[XWPFRun]) = runs.foldLeft((pos1, pos2, 0, new ArrayList[XWPFRun](), new ArrayList[XWPFRun](), new ArrayList[XWPFRun]()))(foldingSplitter)
                  //System.out.println("============ BEFORE =================")
                  //before.foreach({r => System.out.println(r.getText(0))})
                  //System.out.println("============ CONTAINS =================")
                  //contains.foreach({r => System.out.println(r.getText(0))})
                  //System.out.println("============ AFTER =================")
                  //after.foreach({r => System.out.println(r.getText(0))})
                  runs.foreach { run: XWPFRun =>
                    //System.out.println(run.getCTR)
                    val text: String = run.getText(0)
                    if (text != null && text.contains(tag)) {
                      //System.out.println(text)
                      val textTmp: String = text.replace(tag, data)
                      run.setText(textTmp, 0)
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }


  @throws(classOf[Exception])
  def replaceText(tag: String, data: String, paragraphList: java.util.List[XWPFParagraph]): Unit = {

    paragraphList.foreach { e: XWPFParagraph =>
      val runs: List[XWPFRun] = e.getRuns()
      runs.foreach { run: XWPFRun =>
        val text: String = run.getText(0)
        if (text != null && text.contains(tag)) {
          val textTmp: String = text.replace(tag, data)

          run.setText(textTmp, 0)
        }
      }
    }
  }
}
