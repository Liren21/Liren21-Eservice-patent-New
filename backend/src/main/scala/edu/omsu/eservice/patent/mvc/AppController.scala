package edu.omsu.eservice.patent.mvc

import edu.omsu.eservice.patent.conf.SparkAPI
import edu.omsu.eservice.patent.dao.Dao
import edu.omsu.eservice.patent.doc.DocumentWord
import edu.omsu.eservice.patent.entity.{Demand, RIDAuthor, Author, RIDStatuses}
import org.json4s.jackson.JsonMethods._
import org.json4s.jackson.Serialization
import org.json4s.{DefaultFormats, ShortTypeHints}
import org.slf4j.LoggerFactory
import scalikejdbc.config.DBs
import spark.{ExceptionHandler, Request, Response, Spark}

import scala.collection.mutable.ListBuffer

object AppController {

  implicit val formats = new DefaultFormats {
    //override def dateFormatter = new SimpleDateFormat("dd.MM.yyyy")
    Serialization.formats(ShortTypeHints(List(classOf[RIDAuthor])))
  }

  private val logger = LoggerFactory.getLogger(AppController.getClass)


  def isNewStatusAllowed(status: Int, newStatus: Int): Boolean = {

    // SECURITY
    if (newStatus != (status + 1) && newStatus != RIDStatuses.DRAFT) {
      return false
    }
    true
  }

  def main(args: Array[String]) {

    SparkAPI.init()
    DBs.setup('dbConnected)


    Spark.exception(classOf[Exception], new ExceptionHandler {
      override def handle(ex: Exception, request: Request, response: Response): Unit = {
        logger.error(ex.getMessage, ex)
      }
    })

    def globalAdmin(personId: Long): Boolean = Dao.isAdminRole(personId)

    def loadAuthors(personId: Long, req: Request, res: Response) = {
      val auths: List[RIDAuthor] = Dao.getAllAuthors()
      //        val authors = new ListBuffer[RIDAuthor]
      //        auths.foreach { a: RIDAuthor =>
      //          var testAuth: RIDAuthor = a
      //          var author: RIDAuthor = testAuth.copy(testAuth.id, testAuth.peopleId, testAuth.peopleDate, testAuth.surname, testAuth.name, testAuth.lastname, testAuth.birthday, testAuth.address, testAuth.email, testAuth.phone, testAuth.work, testAuth.position, testAuth.department, testAuth.series, testAuth.number, testAuth.whoGave, testAuth.date, testAuth.citizenship, testAuth.contribution, testAuth.isLeader, testAuth.isCreator)
      //          authors += author
      //        }
      Serialization.write(auths)
      ""
    }

    def loadDataBase(personId: Long, req: Request, res: Response) = {
      Serialization.write("1")
    }

    def document(personId: Long, req: Request, res: Response) = {
      val demandId = req.queryParams("demandId")
      var ap: List[Demand] = Dao.findApplicationbyId(demandId.toInt)
      var isCreator: Boolean = false

      if (Dao.creatorByDemandId(demandId.toInt).apply(0).peopleId.getOrElse(0) == personId)
        isCreator = true

      if ((!globalAdmin(personId) && isCreator != true) || ap.apply(0).status != RIDStatuses.SIGNED)
        null
      DocumentWord.demand(res.raw().getOutputStream, ap.apply(0))
      null
    }

    def documentRev(personId: Long, req: Request, res: Response) = {
      val id = req.queryParams("id")
      var ap: List[Demand] = Dao.findApplicationbyId(id.toInt)
      var app = ap.apply(0)
      var isCreator: Boolean = false

      if (Dao.creatorByDemandId(id.toInt).apply(0).peopleId.getOrElse(0) == personId)
        isCreator = true

      if ((!globalAdmin(personId) && isCreator != true) || app.status != RIDStatuses.SIGNED)
        null
      app = app.copy(app.id, app.objType, app.name, app.owner, app.createDate, app.pcType, app.language, app.annotation, app.OS, app.size, app.addressDemand, app.status, Dao.selectAuthorsByDemandId(app.id), app.existAuths, app.createAppDate, app.comment)

      DocumentWord.demandRev(res.raw().getOutputStream, app, app.authors.headOption.map { author => author.id })
      null
    }

    def report(personId: Long, req: Request, res: Response) = {
      val idd = req.queryParams("id")
      var ap: List[Demand] = Dao.findApplicationbyId(idd.toInt)
      var app = ap.apply(0)
      var isCreator: Boolean = false

      if (Dao.creatorByDemandId(idd.toInt).apply(0).peopleId.getOrElse(0) == personId)
        isCreator = true

      if ((!globalAdmin(personId) && isCreator != true) || app.status != RIDStatuses.SIGNED)
        null
      app = app.copy(app.id, app.objType, app.name, app.owner, app.createDate, app.pcType, app.language, app.annotation, app.OS, app.size, app.addressDemand, app.status, Dao.selectAuthorsByDemandId(app.id), app.existAuths, app.createAppDate, app.comment)

      DocumentWord.report(res.raw().getOutputStream, app)
      null
    }

    def documentDop(personId: Long, req: Request, res: Response) = {
      val idd = req.queryParams("id")
      val authorIdOpt = Some(req.queryParams("authorId").toInt)
      var ap: List[Demand] = Dao.findApplicationbyId(idd.toInt)
      var app = ap.apply(0)
      var isCreator: Boolean = false

      if (Dao.creatorByDemandId(idd.toInt).apply(0).peopleId.getOrElse(0) == personId)
        isCreator = true

      if ((!globalAdmin(personId) && isCreator != true) || app.status != RIDStatuses.SIGNED)
        null
      app = app.copy(app.id, app.objType, app.name, app.owner, app.createDate, app.pcType, app.language, app.annotation, app.OS, app.size, app.addressDemand, app.status, Dao.selectAuthorsByDemandId(app.id), app.existAuths, app.createAppDate, app.comment)

      DocumentWord.demandDop(res.raw().getOutputStream, app, authorIdOpt.find(id => id != 0))
      null
    }

    def changeStatus(personId: Long, req: Request, res: Response) = {
      val idd = req.queryParams("id")
      val status: Int = req.queryParams("status").toInt
      val isAdmin: Boolean = Dao.isAdminRole(personId)
      val ap: Demand = Dao.findApplicationbyId(idd.toInt).head
      val creator: RIDAuthor = Dao.creatorByDemandId(ap.id).head
      val isCreator: Boolean = creator.peopleId.getOrElse(0) == personId

      val currentStatus: Int = ap.status

      //FIXME!!
      if (isNewStatusAllowed(currentStatus, status.toInt)) {
        null
      }


      if (status != 0) {
        if (isAdmin) {
          if (isCreator) {
            if (currentStatus != RIDStatuses.DRAFT && currentStatus != RIDStatuses.READY_TO_CHECK && currentStatus != RIDStatuses.ON_CHECK)
              null
          }
          else {
            if (currentStatus != RIDStatuses.READY_TO_CHECK && currentStatus != RIDStatuses.ON_CHECK)
              null
          }
        }
        else {
          if (!isCreator) {
            null
          }
          else {
            if (currentStatus != RIDStatuses.DRAFT) {
              null
            }
          }
        }

        //FIXME!!
        if (currentStatus < RIDStatuses.SIGNED) {
          val status: Int = currentStatus + 1

          Dao.changeStatus(ap, status)
        }
      }
      else {

        if (isAdmin) {
          if (currentStatus == RIDStatuses.READY_TO_CHECK)
            null
        }
        else if (isCreator) {
          if (currentStatus == RIDStatuses.ON_CHECK)
            null
        }
        Dao.changeStatus(ap, 0)
      }
      Serialization.write("1")
    }

    //      def returnEdit(personId: Long, req: Request, res: Response) = {
    //        val idd = req.queryParams("id")
    //        var ap: List[RIDApplication] = Dao.findApplicationbyId(idd.toInt)
    //        Dao.changeStatus(ap.apply(0), 0)
    //        null
    //      }
    def getAuthorByPeopleId(personId: Long, req: Request, res: Response) = {
      val id = req.queryParams("id")
      var searchAuthors: List[RIDAuthor] = Dao.getAuthorByPeopleId(id.toLong)
      Serialization.write(searchAuthors.apply(0))
    }

    def documentDopRev(personId: Long, req: Request, res: Response) = {
      val idd = req.queryParams("id")
      val authorIdOpt = Some(req.queryParams("authorId").toInt)
      val authorId2Opt = Some(req.queryParams("authorId2").toInt)
      var ap: List[Demand] = Dao.findApplicationbyId(idd.toInt)
      var app = ap.apply(0)
      var isCreator: Boolean = false

      if (Dao.creatorByDemandId(idd.toInt).apply(0).peopleId.getOrElse(0) == personId)
        isCreator = true

      if ((!globalAdmin(personId) && isCreator != true) || app.status != RIDStatuses.SIGNED)
        null
      app = app.copy(app.id, app.objType, app.name, app.owner, app.createDate, app.pcType, app.language, app.annotation, app.OS, app.size, app.addressDemand, app.status, Dao.selectAuthorsByDemandId(app.id), app.existAuths, app.createAppDate, app.comment)

      DocumentWord.demandDopRev(res.raw().getOutputStream, app, authorIdOpt.find(id => id != 0), authorId2Opt.find(id => id != 0))
      null
    }

    def agreement(personId: Long, req: Request, res: Response) = {
      val id = req.queryParams("id")
      val idd = req.queryParams("appid")
      var ap: List[Demand] = Dao.findApplicationbyId(idd.toInt)
      var app = ap.apply(0)
      var isCreator: Boolean = false

      if (Dao.creatorByDemandId(idd.toInt).apply(0).peopleId.getOrElse(0) == personId)
        isCreator = true

      if ((!globalAdmin(personId) && isCreator != true) || app.status != RIDStatuses.SIGNED)
        null
      app = app.copy(app.id, app.objType, app.name, app.owner, app.createDate, app.pcType, app.language, app.annotation, app.OS, app.size, app.addressDemand, app.status, Dao.selectAuthorsByDemandId(app.id), app.existAuths, app.createAppDate, app.comment)

      DocumentWord.agreement(res.raw().getOutputStream, app, id.toInt)
      null
    }

    def agreementInfo(personId: Long, req: Request, res: Response) = {
      val id = req.queryParams("id")
      val idd = req.queryParams("appid")
      var ap: List[Demand] = Dao.findApplicationbyId(idd.toInt)
      var app = ap.apply(0)
      var isCreator: Boolean = false

      if (Dao.creatorByDemandId(idd.toInt).apply(0).peopleId.getOrElse(0) == personId)
        isCreator = true

      if ((!globalAdmin(personId) && isCreator != true) || app.status != RIDStatuses.SIGNED)
        null
      app = app.copy(app.id, app.objType, app.name, app.owner, app.createDate, app.pcType, app.language, app.annotation, app.OS, app.size, app.addressDemand, app.status, Dao.selectAuthorsByDemandId(app.id), app.existAuths, app.createAppDate, app.comment)

      DocumentWord.doWord(res.raw().getOutputStream, app, id.toInt)
      null
    }

    def getAuthorApplicationByAuthorId(personId: Long, req: Request, res: Response) = {
      val id = req.queryParams("id")
      val authApp: List[Author] = Dao.authDataById(id.toInt)
      Serialization.write(authApp.apply(0))
    }

    def getApplication(personId: Long, req: Request, res: Response) = {
      //Dao.initialize()
      //eservice_rid_urol

      //        val applications = new ListBuffer[RIDApplication]
      val list: List[Demand] = (if (Dao.isAdminRole(personId)) {
        Dao.findApplicationsForAdmin()
      }
      else {
        Dao.findApplications(personId)
      }).map { app =>
        val authors = Dao.selectAuthorsByDemandId(app.id)
        Demand(app.id, app.objType, app.name, app.owner, app.createDate, app.pcType, app.language, app.annotation, app.OS, app.size, app.addressDemand, app.status, authors, app.existAuths, app.createAppDate, app.comment)
      }
      //        list.foreach { app: RIDApplication =>
      //          var application: RIDApplication = app.copy(app.id, app.objType, app.name, app.owner, app.createDate, app.pcType, app.language, app.annotation, app.OS, app.size, app.addressDemand, app.status, Dao.selectAuthorsByDemandId(app.id), app.existAuths, app.createAppDate, app.comment)
      //          applications += application
      //        }
      //
      Serialization.write(list)
    }

    def getApplicationById(personId: Long, req: Request, res: Response) = {
      val id = req.queryParams("id")
      val authorApp: RIDAuthor = Dao.creatorByDemandId(id.toInt).apply(0)
      val isAdmin: Boolean = Dao.isAdminRole(personId)
      var isCreator: Boolean = false
      if (authorApp.peopleId.getOrElse(0) == personId)
        isCreator = true
      if (isCreator == false && isAdmin == false)
        throw new Exception()
      var app: Demand = Dao.findApplicationbyId(id.toInt).apply(0)
      app = app.copy(app.id, app.objType, app.name, app.owner, app.createDate, app.pcType, app.language, app.annotation, app.OS, app.size, app.addressDemand, app.status, Dao.selectAuthorsByDemandId(app.id), app.existAuths, app.createAppDate, app.comment + '~' + isAdmin + '~' + isCreator)
      Serialization.write(app)
    }

    def updateApplication(personId: Long, req: Request, res: Response) = {
      val app: Demand = parse(req.body()).extract[Demand]
      Dao.updateApplication(app)
      null
    }

    def updateRef(personId: Long, req: Request, res: Response) = {
      var result: List[Int] = List(1)
      var app: Demand = parse(req.body()).extract[Demand]

      try {
        val authorApp: RIDAuthor = Dao.creatorByDemandId(app.id).apply(0)
        val isAdmin: Boolean = Dao.isAdminRole(personId)
        var isCreator: Boolean = false
        if (authorApp.peopleId.getOrElse(0) == personId)
          isCreator = true

        if (!isAdmin) {
          if (isCreator == false || app.status != RIDStatuses.DRAFT) {
            throw new Exception()
          }
        }
        else {
          if (isCreator) {
            if (app.status != RIDStatuses.DRAFT && app.status != RIDStatuses.ON_CHECK) {
              throw new Exception()
            }
          }
          else {
            if (app.status != RIDStatuses.ON_CHECK) {
              throw new Exception()
            }
          }
        }

        Dao.updateRef(app)
        Serialization.write(result)
      } catch {
        case e: Exception => Serialization.write(null)
      }
    }

    def updateInfo(personId: Long, req: Request, res: Response) = {
      var result: List[Int] = List(1)
      try {
        var app: Demand = parse(req.body()).extract[Demand]

        val authorApp: RIDAuthor = Dao.creatorByDemandId(app.id).apply(0)
        val isAdmin: Boolean = Dao.isAdminRole(personId)
        var isCreator: Boolean = false
        if (authorApp.peopleId.getOrElse(0) == personId)
          isCreator = true

        if (!isAdmin) {
          if (isCreator == false || app.status != RIDStatuses.DRAFT) {
            throw new Exception()
          }
        }
        else {
          if (isCreator) {
            if (app.status != RIDStatuses.DRAFT && app.status != RIDStatuses.ON_CHECK) {
              throw new Exception()
            }
          }
          else {
            if (app.status != RIDStatuses.ON_CHECK) {
              throw new Exception()
            }
          }
        }

        Dao.updateInfo(app)
        Serialization.write(result)
      } catch {
        case e: Exception => Serialization.write(null)
      }

    }

    def updateAuthorPersonalInfo(personId: Long, req: Request, res: Response) = {
      var result: List[Int] = List(1)
      var auth: RIDAuthor = parse(req.body()).extract[RIDAuthor]
      try {

        val authorApp: RIDAuthor = Dao.creatorByDemandId(auth.peopleDate.toInt).apply(0)
        val status = Dao.statusById(auth.peopleDate.toInt)
        val isAdmin: Boolean = Dao.isAdminRole(personId)
        var isCreator: Boolean = false
        if (authorApp.peopleId.getOrElse(0) == personId)
          isCreator = true

        if (!isAdmin) {
          if (isCreator == false || status != RIDStatuses.DRAFT) {
            throw new Exception()
          }
        }
        else {
          if (isCreator) {
            if (status != RIDStatuses.DRAFT && status != RIDStatuses.ON_CHECK) {
              throw new Exception()
            }
          }
          else {
            if (status != RIDStatuses.ON_CHECK) {
              throw new Exception()
            }
          }
        }

        Dao.updateAuthPersonalInfo(auth)
        if (auth.peopleId.getOrElse(0) == 1) { //FIXME
          Dao.changeLeader(auth)
        }
        Serialization.write(result)
      } catch {
        case e: Exception => Serialization.write(null)
      }

    }

    def updateAuthorPassport(personId: Long, req: Request, res: Response) = {
      var result: List[Int] = List(1)
      var auth: RIDAuthor = parse(req.body()).extract[RIDAuthor]
      try {
        val authorApp: RIDAuthor = Dao.creatorByDemandId(auth.peopleDate.toInt).apply(0)
        val status = Dao.statusById(auth.peopleDate.toInt)
        val isAdmin: Boolean = Dao.isAdminRole(personId)
        var isCreator: Boolean = false
        if (authorApp.peopleId.getOrElse(0) == personId)
          isCreator = true

        if (!isAdmin) {
          if (isCreator == false || status != RIDStatuses.DRAFT) {
            throw new Exception()
          }
        }
        else {
          if (isCreator) {
            if (status != RIDStatuses.DRAFT && status != RIDStatuses.ON_CHECK) {
              throw new Exception()
            }
          }
          else {
            if (status != RIDStatuses.ON_CHECK) {
              throw new Exception()
            }
          }
        }

        Dao.updateAuthPassport(auth)

        Serialization.write(result)
      } catch {
        case e: Exception => Serialization.write(null)
      }
    }

    def updateAuthorJob(personId: Long, req: Request, res: Response) = {
      var result: List[Int] = List(1)
      var auth: RIDAuthor = parse(req.body()).extract[RIDAuthor]
      try {
        val authorApp: RIDAuthor = Dao.creatorByDemandId(auth.peopleDate.toInt).apply(0)
        val status = Dao.statusById(auth.peopleDate.toInt)
        val isAdmin: Boolean = Dao.isAdminRole(personId)
        var isCreator: Boolean = false
        if (authorApp.peopleId.getOrElse(0) == personId)
          isCreator = true

        if (!isAdmin) {
          if (isCreator == false || status != RIDStatuses.DRAFT) {
            throw new Exception()
          }
        }
        else {
          if (isCreator) {
            if (status != RIDStatuses.DRAFT && status != RIDStatuses.ON_CHECK) {
              throw new Exception()
            }
          }
          else {
            if (status != RIDStatuses.ON_CHECK) {
              throw new Exception()
            }
          }
        }

        Dao.updateAuthJob(auth)

        Serialization.write(result)
      } catch {
        case e: Exception => Serialization.write(null)
      }

    }

    def insertAuthor(personId: Long, req: Request, res: Response) = {
      var auth: RIDAuthor = parse(req.body()).extract[RIDAuthor]

      val authorApp: RIDAuthor = Dao.creatorByDemandId(auth.peopleDate.toInt).apply(0)
      val status = Dao.statusById(auth.peopleDate.toInt)
      val isAdmin: Boolean = Dao.isAdminRole(personId)
      var isCreator: Boolean = false
      if (authorApp.peopleId.getOrElse(0) == personId)
        isCreator = true

      if (!isAdmin) {
        if (isCreator == false || status != RIDStatuses.DRAFT) {
          throw new Exception()
        }
      }
      else {
        if (isCreator) {
          if (status != RIDStatuses.DRAFT && status != RIDStatuses.ON_CHECK) {
            throw new Exception()
          }
        }
        else {
          if (status != RIDStatuses.ON_CHECK) {
            throw new Exception()
          }
        }
      }

      var a: List[RIDAuthor] = Dao.getAuthorFromOurTable(auth)
      if (a.length == 0)
        a = Dao.getAuthorByFio(auth)
      if (a.length == 0) {
        Dao.insertAuth(auth)
        Serialization.write(null)
      }
      else {
        Serialization.write(a.apply(0))
      }
    }

    def passportPullout(personId: Long, req: Request, res: Response) = {
      val peopleId = req.queryParams("peopId")
      val appId = req.queryParams("appId")
      var auth: RIDAuthor = null
      try {
        if (peopleId.toInt != 0) {
          val authorApp: RIDAuthor = Dao.creatorByDemandId(appId.toInt).apply(0)
          val status = Dao.statusById(appId.toInt)
          val isAdmin: Boolean = Dao.isAdminRole(personId)
          var isCreator: Boolean = false
          if (authorApp.peopleId.getOrElse(0) == personId)
            isCreator = true

          if (!isAdmin) {
            if (isCreator == false || status != RIDStatuses.DRAFT) {
              throw new Exception()
            }
          }
          else {
            if (isCreator) {
              if (status != RIDStatuses.DRAFT && status != RIDStatuses.ON_CHECK) {
                throw new Exception()
              }
            }
            else {
              if (status != RIDStatuses.ON_CHECK) {
                throw new Exception()
              }
            }
          }


          auth = Dao.getAuthorPassportByPeopleId(peopleId.toInt).apply(0)

        }
        Serialization.write(auth)

      } catch {
        case e: Exception => Serialization.write(null)
      }

    }

    def AddExAuthor(personId: Long, req: Request, res: Response) = {
      val AuthId = req.queryParams("authId")
      val demandId = req.queryParams("appId")
      val peopleId = req.queryParams("peopId")

      val authorApp: RIDAuthor = Dao.creatorByDemandId(demandId.toInt).apply(0)
      val status = Dao.statusById(demandId.toInt)
      val isAdmin: Boolean = Dao.isAdminRole(personId)
      var isCreator: Boolean = false
      if (authorApp.peopleId.getOrElse(0) == personId)
        isCreator = true

      if (!isAdmin) {
        if (isCreator == false || status != RIDStatuses.DRAFT) {
          throw new Exception()
        }
      }
      else {
        if (isCreator) {
          if (status != RIDStatuses.DRAFT && status != RIDStatuses.ON_CHECK) {
            throw new Exception()
          }
        }
        else {
          if (status != RIDStatuses.ON_CHECK) {
            throw new Exception()
          }
        }
      }

      if (AuthId.toInt != 0) {
        var auth: Author = Dao.authDataById(AuthId.toInt).apply(0)
        Dao.insertExAuth(auth, demandId.toInt)
      }
      else {
        var a: RIDAuthor = RIDAuthor(0, None, "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", 0, 0)
        var b: RIDAuthor = RIDAuthor(0, None, "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", 0, 0)
        var c: RIDAuthor = RIDAuthor(0, None, "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", 0, 0)
        var d: RIDAuthor = RIDAuthor(0, None, "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", 0, 0)
        var count: Boolean = false
        var aa: List[RIDAuthor] = Dao.getAuthorAddressByPeopleId(peopleId.toLong)
        if (aa.length != 0) {
          a = aa.apply(0)
          count = true
        }

        aa = Dao.getAuthorContactByPeopleId(peopleId.toLong)
        if (aa.length != 0) {
          b = aa.apply(0)
          count = true
        }

        aa = Dao.getAuthorPassportByPeopleId(peopleId.toLong)
        if (aa.length != 0) {
          c = aa.apply(0)
          count = true
        }

        aa = Dao.getAuthorPhoneByPeopleId(peopleId.toLong)
        if (aa.length != 0) {
          d = aa.apply(0)
          count = true
        }

        if (count == true) {
          a = a.copy(a.id, a.peopleId, a.peopleDate, a.surname, a.name, a.lastname, a.birthday, a.address, b.email, d.phone, a.work, a.position, a.department, c.series, c.number, c.whoGave, c.date, c.citizenship, null, 0, 0)
          Dao.insertAuthByPeopleId(a, demandId.toInt)
        }
      }
      null
    }

    def AddComment(personId: Long, req: Request, res: Response) = {
      val demandId = req.queryParams("appId")
      val comment = req.queryParams("comment")
      val status = Dao.statusById(demandId.toInt)

      if (globalAdmin(personId) && status.toInt == RIDStatuses.ON_CHECK) {
        Dao.insertComment(demandId.toInt, comment)
      }
      else {
        throw new Exception()
      }
      Serialization.write("1")
    }

    def DelAuthor(personId: Long, req: Request, res: Response) = {
      val AuthId = req.queryParams("authId")
      val demandId = req.queryParams("appId")

      val authorApp: RIDAuthor = Dao.creatorByDemandId(demandId.toInt).apply(0)
      val status = Dao.statusById(demandId.toInt)
      val isAdmin: Boolean = Dao.isAdminRole(personId)
      var isCreator: Boolean = false
      if (authorApp.peopleId.getOrElse(0) == personId)
        isCreator = true

      if (!isAdmin) {
        if (isCreator == false || status != RIDStatuses.DRAFT) {
          throw new Exception()
        }
      }
      else {
        if (isCreator) {
          if (status != RIDStatuses.DRAFT && status != RIDStatuses.ON_CHECK) {
            throw new Exception()
          }
        }
        else {
          if (status != RIDStatuses.ON_CHECK) {
            throw new Exception()
          }
        }
      }

      Dao.deleteAuthor(AuthId.toInt, demandId.toInt)
      null
    }

    def searchAuthor(personId: Long, req: Request, res: Response) = {
      var auth: RIDAuthor = parse(req.body()).extract[RIDAuthor]
      var a: List[RIDAuthor] = null
      if (auth.surname != "" || auth.lastname != "" || auth.name != "" || auth.birthday != "") {
        a = Dao.getAuthorFromOurTable(auth)
        if (a.length == 0) {
          a = Dao.getAuthorByFio(auth)
        }
      }

      Serialization.write(a)
    }

    //      def createRequest(personId: Long, req: Request, res: Response) = {
    //        var app: RIDApplication = parse(req.body()).extract[RIDApplication]
    //        var authorListTemp: ListBuffer[RIDAuthor] = new ListBuffer[RIDAuthor]
    //
    //        var crauth: List[RIDAuthor] = Dao.getAuthorByPeopleIdFromOurTable(personId)
    //        if(crauth.length != 0) {
    //          var tempAuthors: ListBuffer[RIDAuthor] = new ListBuffer[RIDAuthor]
    //          var tempExistAuthors: ListBuffer[Author] = new ListBuffer[Author]
    //          var temppCreator: RIDAuthor = null
    //          app.authors.foreach { testAuth: RIDAuthor =>
    //            if (testAuth.peopleId.toLong != personId) {
    //              var temp: RIDAuthor = testAuth.copy(testAuth.id, testAuth.peopleId, testAuth.peopleDate, testAuth.surname, testAuth.name, testAuth.lastname, testAuth.birthday, testAuth.address, testAuth.email, testAuth.phone, testAuth.work, testAuth.position, testAuth.department, testAuth.series, testAuth.number, testAuth.whoGave, testAuth.date, testAuth.citizenship, testAuth.contribution, testAuth.isCreator, testAuth.isLeader)
    //              tempAuthors += temp
    //            }
    //            else{
    //              temppCreator = testAuth.copy(testAuth.id, testAuth.peopleId, testAuth.peopleDate, testAuth.surname, testAuth.name, testAuth.lastname, testAuth.birthday, testAuth.address, testAuth.email, testAuth.phone, testAuth.work, testAuth.position, testAuth.department, testAuth.series, testAuth.number, testAuth.whoGave, testAuth.date, testAuth.citizenship, testAuth.contribution, testAuth.isCreator, testAuth.isLeader)
    //            }
    //          }
    //          var tempCreator: Author = new Author(crauth.apply(0).id, temppCreator.address, temppCreator.email, temppCreator.phone, temppCreator.work, temppCreator.position, temppCreator.department, temppCreator.series, temppCreator.number, temppCreator.whoGave, temppCreator.date, temppCreator.citizenship, temppCreator.contribution, temppCreator.isCreator, temppCreator.isLeader )
    //          tempExistAuthors += tempCreator
    //          app.existAuths.foreach{a: Author =>
    //            var temp: Author = a.copy(a.id, a.address, a.email, a.phone, a.work, a.position, a.department, a.series, a.number, a.whoGave, a.date, a.citizenship, a.contribution, a.isCreator, a.isLeader)
    //            tempExistAuthors += temp
    //          }
    //          app = app.copy(app.id, app.objType, app.name, app.owner, app.createDate, app.pcType, app.language, app.annotation, app.OS, app.size, app.addressDemand, app.status, tempAuthors.toList, tempExistAuthors.toList, app.createAppDate, app.comment)
    //        }
    //
    //        Dao.insertApplication(app)
    //        null
    //      }
    def createApp(personId: Long, req: Request, res: Response) = {
      var tempAuthors: ListBuffer[RIDAuthor] = new ListBuffer[RIDAuthor]
      var app: Demand = parse(req.body()).extract[Demand]
      var authorListTemp: ListBuffer[RIDAuthor] = new ListBuffer[RIDAuthor]
      var tempExistAuthors: ListBuffer[Author] = new ListBuffer[Author]
      var crauth: List[RIDAuthor] = Dao.getAuthorByPeopleIdFromOurTable(personId)

      if (crauth.length != 0) {
        var tempCreator: Author = new Author(crauth.apply(0).id, crauth.apply(0).address, crauth.apply(0).email, crauth.apply(0).phone, crauth.apply(0).work, crauth.apply(0).position, crauth.apply(0).department, crauth.apply(0).series, crauth.apply(0).number, crauth.apply(0).whoGave, crauth.apply(0).date, crauth.apply(0).citizenship, "", 1, 0)
        tempExistAuthors += tempCreator
      }
      else {
        var a: RIDAuthor = RIDAuthor(0, None, "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", 0, 0)
        var b: RIDAuthor = RIDAuthor(0, None, "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", 0, 0)
        var c: RIDAuthor = RIDAuthor(0, None, "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", 0, 0)
        var d: RIDAuthor = RIDAuthor(0, None, "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", 0, 0)
        var aa: List[RIDAuthor] = Dao.getAuthorAddressByPeopleId(personId)
        if (aa.length != 0) {
          a = aa.apply(0)
        }

        aa = Dao.getAuthorContactByPeopleId(personId)
        if (aa.length != 0) {
          b = aa.apply(0)
        }

        aa = Dao.getAuthorPassportByPeopleId(personId)
        if (aa.length != 0) {
          c = aa.apply(0)
        }

        aa = Dao.getAuthorPhoneByPeopleId(personId)
        if (aa.length != 0) {
          d = aa.apply(0)
        }

        var tempCreator: RIDAuthor = new RIDAuthor(a.id, a.peopleId, a.peopleDate, a.surname, a.name, a.lastname, a.birthday, a.address, b.email, d.phone, a.work, a.position, a.department, c.series, c.number, c.whoGave, c.date, c.citizenship, null, 1, 0)
        tempAuthors += tempCreator
      }
      app = app.copy(app.id, app.objType, app.name, app.owner, app.createDate, app.pcType, app.language, app.annotation, app.OS, app.size, app.addressDemand, app.status, tempAuthors.toList, tempExistAuthors.toList, app.createAppDate, app.comment)
      Dao.insertApplication(app)
      null
    }

    SparkAPI.get("/loadAuthors", loadAuthors)
    SparkAPI.post("/loadDataBase", "application/json", loadDataBase)
    SparkAPI.get("/document.docx", document)
    SparkAPI.get("/documentRev.docx", documentRev)
    SparkAPI.get("/report.docx", report)
    SparkAPI.get("/documentDop.docx", documentDop)
    SparkAPI.post("/changeStatus", "application/json", changeStatus)
    //      SparkAPI.post("/returnEdit", "application/json", returnEdit)
    SparkAPI.get("/getAuthorByPeopleId", getAuthorByPeopleId)
    SparkAPI.get("/documentDopRev.docx", documentDopRev)
    SparkAPI.get("/agreement.docx", agreement)
    SparkAPI.get("/agreementInfo.docx", agreementInfo)
    SparkAPI.get("/getAuthorApplicationByAuthorId", getAuthorApplicationByAuthorId)
    SparkAPI.get("/getApplication", getApplication)
    SparkAPI.get("/getApplicationById", getApplicationById)
    SparkAPI.post("/updateApplication", "application/json", updateApplication)
    SparkAPI.post("/updateRef", "application/json", updateRef)
    SparkAPI.post("/updateInfo", "application/json", updateInfo)
    SparkAPI.post("/updateAuthorPersonalInfo", "application/json", updateAuthorPersonalInfo)
    SparkAPI.post("/updateAuthorPassport", "application/json", updateAuthorPassport)
    SparkAPI.post("/updateAuthorJob", "application/json", updateAuthorJob)
    SparkAPI.post("/insertAuthor", "application/json", insertAuthor)
    SparkAPI.post("/passportPullout", "application/json", passportPullout)
    SparkAPI.post("/AddExAuthor", "application/json", AddExAuthor)
    SparkAPI.post("/AddComment", "application/json", AddComment)
    SparkAPI.post("/DelAuthor", "application/json", DelAuthor)
    SparkAPI.post("/searchAuthor", "application/json", searchAuthor)
    //      SparkAPI.post("/createRequest", "application/json", createRequest)
    SparkAPI.post("/createApp", "application/json", createApp)
  }
}
