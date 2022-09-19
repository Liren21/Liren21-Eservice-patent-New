package edu.omsu.eservice.patent.dao

import edu.omsu.eservice.patent.connection.DbConnected
import edu.omsu.eservice.patent.entity.{Demand, RIDAuthor, Author}
import scalikejdbc._

object Dao extends DbConnected {
  def insertApplication(app: Demand) {
    insideLocalTx { implicit session =>
      val idType: Int =
        sql"""
             select ид_типа_заявки ИД from И_РИД_ТИП_ЗАЯВКИ where upper(название)=upper(${app.objType})"""
          .map { rs => rs.int("ИД") }.first.apply.get
      val demand: String =
        sql"""
             select ГЛАВ_ПАРАМ_ВЕРНУТЬ('Префикс_названия_вуза', sysdate) || ' ' || ГЛАВ_ПАРАМ_ВЕРНУТЬ('Название_предприятия', sysdate) заявитель from dual"""
          .map { rs => rs.string("заявитель") }.single.apply.get
      val adddemand: String =
        sql"""
             select ГЛАВ_ПАРАМ_ВЕРНУТЬ('Адрес_предприятия', sysdate) АДРЕС_ЗАЯВИТЕЛЯ from dual"""
          .map { rs => rs.string("АДРЕС_ЗАЯВИТЕЛЯ") }.single.apply.get

      val newDemandId: Long = sql"""select и_рид_заяв_посл.nextval ид from dual""".map { rs => rs.long("ид") }.single.apply.get
      sql"""
            INSERT INTO И_РИД_ЗАЯВКИ (ид_заявки,
            НАЗВАНИЕ_ОБЪЕКТА_РЕГИСТРАЦИИ, ЗАЯВИТЕЛЬ, ДАТА_СОЗДАНИЯ_РИД, ТИП_ЭВМ, ЯЗЫК, АННОТАЦИЯ, ОС, ОБЪЕМ_ПРОГРАММЫ, СОСТОЯНИЕ_ЗАЯВКИ,
            ИД_ТИПА_ЗАЯВКИ, АДРЕС_ЗАЯВИТЕЛЯ, ДАТА_СОЗДАНИЯ_ЗАЯВКИ, ЗАМЕЧАНИЯ) VALUES (
        $newDemandId,
        ${app.name}, $demand, to_date(${app.createDate}, 'dd.mm.yyyy'), ${app.pcType}, ${app.language}, ${app.annotation}, ${app.OS}, ${app.size}, ${app.status},
        $idType, $adddemand, to_date(${app.createAppDate}, 'dd.mm.yyyy'), ${app.comment})
          """.update().apply()

      app.existAuths.foreach { auth =>
        sql"""
            INSERT INTO И_РИД_АВТОРЫ_И_ЗАЯВКИ (
            ИД_АВТОРА, ИД_ЗАЯВКИ, ПРИЗНАК_РУКОВОДИТЕЛЯ, ПРИЗНАК_СОЗДАТЕЛЯ_ЗАЯВКИ, ПОЧТОВЫЙ_АДРЕС, НОМЕР_ТЕЛЕФОНА, ВКЛАД_АВТОРА,
            МЕСТО_РАБОТЫ, ДОЛЖНОСТЬ, КАФЕДРА, ЭЛЕКТРОННАЯ_ПОЧТА, СЕРИЯ_ПАСПОРТА, НОМЕР_ПАСПОРТА, ГРАЖДАНСТВО, КЕМ_ВЫДАН_ПАСПОРТ, КОГДА_ВЫДАН_ПАСПОРТ
            ) VALUES (
          ${auth.id}, $newDemandId, ${auth.isLeader}, ${auth.isCreator},  ${auth.address}, ${auth.phone}, ${auth.contribution},
          ${auth.work}, ${auth.position}, ${auth.department}, ${auth.email}, ${auth.series}, ${auth.number}, ${auth.citizenship}, ${auth.whoGave}, to_date(${auth.date}, 'dd.mm.yyyy')
          )""".update().apply()
      }

      app.authors.foreach { auth =>
        val newAuthorId: Long = sql"""select и_рид_авт_посл.nextval ид from dual""".map { rs => rs.long("ид") }.single.apply.get
        //updateAndReturnGeneratedKey("ид")
        sql"""
               INSERT INTO И_РИД_АВТОРЫ (
               ид_автора,
               ФАМИЛИЯ, ИМЯ, ОТЧЕСТВО, ДАТА_РОЖДЕНИЯ, PEOPLE_ID
               ) VALUES (
          $newAuthorId,
          ${auth.surname}, ${auth.name}, ${auth.lastname}, to_date(${auth.birthday}, 'dd.mm.yyyy'), ${auth.peopleId}
          ) """.update().apply()
        sql"""
            INSERT INTO И_РИД_АВТОРЫ_И_ЗАЯВКИ (ИД_АВТОРА, ИД_ЗАЯВКИ, ПРИЗНАК_РУКОВОДИТЕЛЯ, ПРИЗНАК_СОЗДАТЕЛЯ_ЗАЯВКИ, ПОЧТОВЫЙ_АДРЕС, НОМЕР_ТЕЛЕФОНА,
            ВКЛАД_АВТОРА, МЕСТО_РАБОТЫ, ДОЛЖНОСТЬ, КАФЕДРА, ЭЛЕКТРОННАЯ_ПОЧТА,
            СЕРИЯ_ПАСПОРТА, НОМЕР_ПАСПОРТА, ГРАЖДАНСТВО, КЕМ_ВЫДАН_ПАСПОРТ, КОГДА_ВЫДАН_ПАСПОРТ
            ) VALUES (
          $newAuthorId, $newDemandId, ${auth.isLeader}, ${auth.isCreator},  ${auth.address}, ${auth.phone},
          ${auth.contribution}, ${auth.work}, ${auth.position}, ${auth.department}, ${auth.email},
          ${auth.series}, ${auth.number}, ${auth.citizenship}, ${auth.whoGave}, to_date(${auth.date}, 'dd.mm.yyyy'))""".update().apply()
      }
    }
  }


  def updateApplication(app: Demand) {
    insideLocalTx { implicit session =>
      val TypeId: Int =
        sql"""select И_РИД_ТИП_ЗАЯВКИ.ИД_ТИПА_ЗАЯВКИ as ИД from И_РИД_ТИП_ЗАЯВКИ where  UPPER(И_РИД_ТИП_ЗАЯВКИ.НАЗВАНИЕ) = UPPER(${app.objType})"""
          .map { rs => rs.int("ИД") }.first.apply.get

      sql"""
            update И_РИД_ЗАЯВКИ SET
              НАЗВАНИЕ_ОБЪЕКТА_РЕГИСТРАЦИИ=${app.name},
              ДАТА_СОЗДАНИЯ_РИД=to_date(${app.createDate}, 'dd.mm.yyyy'),
              ТИП_ЭВМ=${app.pcType},
              ЯЗЫК=${app.language},
              АННОТАЦИЯ=${app.annotation},
              ОС=${app.OS},
              ОБЪЕМ_ПРОГРАММЫ=${app.size},
              СОСТОЯНИЕ_ЗАЯВКИ=${app.status},
              ИД_ТИПА_ЗАЯВКИ=$TypeId ,
              ДАТА_СОЗДАНИЯ_ЗАЯВКИ=to_date(${app.createAppDate}, 'dd.mm.yyyy'),
              ЗАМЕЧАНИЯ=${app.comment}
            WHERE
              ИД_ЗАЯВКИ=${app.id}
            """.update().apply()

      app.authors.foreach { author =>
        if (author.id != 0) {
          sql"""
             update  И_РИД_АВТОРЫ SET
              ФАМИЛИЯ=${author.surname},
              ИМЯ=${author.name},
              ОТЧЕСТВО=${author.lastname},
              ДАТА_РОЖДЕНИЯ=to_date(${author.birthday}, 'dd.mm.yyyy')
             where
              ИД_АВТОРА=${author.id}
              """.update().apply()

          sql"""
             update  И_РИД_АВТОРЫ_И_ЗАЯВКИ SET
              ПОЧТОВЫЙ_АДРЕС=${author.address},
              НОМЕР_ТЕЛЕФОНА=${author.phone},
              ВКЛАД_АВТОРА=${author.contribution},
              МЕСТО_РАБОТЫ=${author.work},
              ДОЛЖНОСТЬ=${author.position},
              КАФЕДРА=${author.department},
              ЭЛЕКТРОННАЯ_ПОЧТА=${author.email},
              СЕРИЯ_ПАСПОРТА=${author.series},
              НОМЕР_ПАСПОРТА=${author.number},
              ГРАЖДАНСТВО=${author.citizenship},
              КЕМ_ВЫДАН_ПАСПОРТ=${author.whoGave},
              КОГДА_ВЫДАН_ПАСПОРТ=to_date(${author.date}, 'dd.mm.yyyy'),
              ПРИЗНАК_РУКОВОДИТЕЛЯ=${author.isLeader},
              ПРИЗНАК_СОЗДАТЕЛЯ_ЗАЯВКИ=${author.isCreator}
            where
              ИД_АВТОРА=${author.id} and
              ИД_ЗАЯВКИ=${app.id}
            """.update().apply()
        } else {
          val newAuthorId: Long = sql"""select и_рид_авт_посл.nextval ид from dual""".map { rs => rs.long("ид") }.single.apply.get
          sql"""INSERT INTO И_РИД_АВТОРЫ (ИД,ФАМИЛИЯ, ИМЯ, ОТЧЕСТВО, ДАТА_РОЖДЕНИЯ, PEOPLE_ID)
             VALUES ($newAuthorId, ${author.surname}, ${author.name}, ${author.lastname}, to_date(${author.birthday}, 'dd.mm.yyyy'), ${author.peopleId}) """.update().apply()
          sql"""INSERT INTO И_РИД_АВТОРЫ_И_ЗАЯВКИ (ИД_АВТОРА, ИД_ЗАЯВКИ, ПРИЗНАК_РУКОВОДИТЕЛЯ, ПРИЗНАК_СОЗДАТЕЛЯ_ЗАЯВКИ, ПОЧТОВЫЙ_АДРЕС, НОМЕР_ТЕЛЕФОНА, ВКЛАД_АВТОРА,
             МЕСТО_РАБОТЫ, ДОЛЖНОСТЬ, КАФЕДРА, ЭЛЕКТРОННАЯ_ПОЧТА,
             СЕРИЯ_ПАСПОРТА, НОМЕР_ПАСПОРТА, ГРАЖДАНСТВО, КЕМ_ВЫДАН_ПАСПОРТ, КОГДА_ВЫДАН_ПАСПОРТ) VALUES (
            $newAuthorId, ${app.id}, ${author.isLeader}, ${author.isCreator},  ${author.address}, ${author.phone}, ${author.contribution},
            ${author.work}, ${author.position}, ${author.department}, ${author.email},
            ${author.series}, ${author.number}, ${author.citizenship}, ${author.whoGave}, to_date(${author.date}, 'dd.mm.yyyy'))""".update().apply()
        }
      }

    }
  }


  def updateInfo(app: Demand) {
    insideLocalTx { implicit session =>
      val TypeId =
        sql"""
                         select "И_РИД_ТИП_ЗАЯВКИ"."ИД_ТИПА_ЗАЯВКИ" as ИД from "И_РИД_ТИП_ЗАЯВКИ" where  UPPER("И_РИД_ТИП_ЗАЯВКИ"."НАЗВАНИЕ") = UPPER(${app.objType})""".map { rs => rs.int("ИД") }.list().apply()

      sql"""
            update "IIAS_OWNER"."И_РИД_ЗАЯВКИ" SET "НАЗВАНИЕ_ОБЪЕКТА_РЕГИСТРАЦИИ"=${app.name}, "ДАТА_СОЗДАНИЯ_РИД"=(to_date(${app.createDate}, 'dd.mm.yyyy')), "ИД_ТИПА_ЗАЯВКИ"=$TypeId  WHERE ИД_ЗАЯВКИ=${app.id}
            """.update().apply()
    }
  }


  def updateRef(app: Demand) {
    insideLocalTx { implicit session =>
      val TypeId =
        sql"""
                         select "И_РИД_ТИП_ЗАЯВКИ"."ИД_ТИПА_ЗАЯВКИ" as ИД from "И_РИД_ТИП_ЗАЯВКИ" where  UPPER("И_РИД_ТИП_ЗАЯВКИ"."НАЗВАНИЕ") = UPPER(${app.objType})""".map { rs => rs.int("ИД") }.list().apply()

      sql"""
            update "IIAS_OWNER"."И_РИД_ЗАЯВКИ" SET "ТИП_ЭВМ"=${app.pcType}, "ЯЗЫК"=${app.language}, "АННОТАЦИЯ"=${app.annotation}, "ОС"=${app.OS}, "ОБЪЕМ_ПРОГРАММЫ"=${app.size}  WHERE ИД_ЗАЯВКИ=${app.id}
            """.update().apply()
    }
  }


  def updateAuthPersonalInfo(author: RIDAuthor) {
    insideLocalTx { implicit session =>
      sql"""
             update  "IIAS_OWNER"."И_РИД_АВТОРЫ" SET "ФАМИЛИЯ"=${author.surname}, "ИМЯ"=${author.name}, "ОТЧЕСТВО"=${author.lastname}, "ДАТА_РОЖДЕНИЯ"=(to_date(${author.birthday}, 'dd.mm.yyyy')) where ИД_АВТОРА=${author.id}
              """.update().apply()

      sql"""
             update  "IIAS_OWNER"."И_РИД_АВТОРЫ_И_ЗАЯВКИ" SET "ПОЧТОВЫЙ_АДРЕС"=${author.address}, "НОМЕР_ТЕЛЕФОНА"=${author.phone}, "ВКЛАД_АВТОРА"=${author.contribution}, "ЭЛЕКТРОННАЯ_ПОЧТА"=${author.email}
     where ИД_АВТОРА=${author.id} and ИД_ЗАЯВКИ=${author.peopleDate.toInt}
              """.update().apply()
    }
  }

  def updateAuthPassport(author: RIDAuthor) {
    insideLocalTx { implicit session =>

      sql"""
             update  "IIAS_OWNER"."И_РИД_АВТОРЫ_И_ЗАЯВКИ" SET "СЕРИЯ_ПАСПОРТА"=${author.series}, "НОМЕР_ПАСПОРТА"=${author.number}, "ГРАЖДАНСТВО"=${author.citizenship}, "КЕМ_ВЫДАН_ПАСПОРТ"=${author.whoGave}, "КОГДА_ВЫДАН_ПАСПОРТ"=(to_date(${author.date}, 'dd.mm.yyyy'))
     where ИД_АВТОРА=${author.id} and ИД_ЗАЯВКИ=${author.peopleDate.toInt}
              """.update().apply()
    }
  }

  def updateAuthJob(author: RIDAuthor) {
    insideLocalTx { implicit session =>

      sql"""
             update  "IIAS_OWNER"."И_РИД_АВТОРЫ_И_ЗАЯВКИ" SET "МЕСТО_РАБОТЫ"=${author.work}, "ДОЛЖНОСТЬ"=${author.position}, "КАФЕДРА"=${author.department}
     where ИД_АВТОРА=${author.id} and ИД_ЗАЯВКИ=${author.peopleDate.toInt}
              """.update().apply()
    }
  }


  def insertExAuth(auth: Author, appId: Int) {
    insideLocalTx { implicit session =>

      sql"""
            INSERT INTO "IIAS_OWNER"."И_РИД_АВТОРЫ_И_ЗАЯВКИ" ("ИД_АВТОРА", "ИД_ЗАЯВКИ", "ПРИЗНАК_РУКОВОДИТЕЛЯ", "ПРИЗНАК_СОЗДАТЕЛЯ_ЗАЯВКИ", "ПОЧТОВЫЙ_АДРЕС", "НОМЕР_ТЕЛЕФОНА", "ВКЛАД_АВТОРА", "МЕСТО_РАБОТЫ", "ДОЛЖНОСТЬ", "КАФЕДРА", "ЭЛЕКТРОННАЯ_ПОЧТА", "СЕРИЯ_ПАСПОРТА", "НОМЕР_ПАСПОРТА", "ГРАЖДАНСТВО", "КЕМ_ВЫДАН_ПАСПОРТ", "КОГДА_ВЫДАН_ПАСПОРТ") VALUES (${auth.id}, $appId, '0', '0',  ${auth.address}, ${auth.phone}, '', ${auth.work}, ${auth.position}, ${auth.department}, ${auth.email}, ${auth.series}, ${auth.number}, ${auth.citizenship}, ${auth.whoGave}, (to_date(${auth.date}, 'dd.mm.yyyy')))""".update().apply()

    }
  }

  def initialize() {
    insideLocalTx { implicit session =>

      sql"""
            INSERT INTO "IIAS_OWNER"."И_РИД_ТИП_ЗАЯВКИ" ("ИД_ТИПА_ЗАЯВКИ","НАЗВАНИЕ") VALUES (0, 'программа для ЭВМ')""".update().apply()

      sql"""
            INSERT INTO "IIAS_OWNER"."И_РИД_ТИП_ЗАЯВКИ" ("ИД_ТИПА_ЗАЯВКИ","НАЗВАНИЕ") VALUES (1, 'база данных')""".update().apply()

    }
  }


  def insertAuth(auth: RIDAuthor) {
    insideLocalTx { implicit session =>

      if (auth.peopleId.nonEmpty)
        sql"""
               INSERT INTO "IIAS_OWNER"."И_РИД_АВТОРЫ" ("ФАМИЛИЯ", "ИМЯ", "ОТЧЕСТВО", "ДАТА_РОЖДЕНИЯ", "PEOPLE_ID") VALUES (${auth.surname}, ${auth.name}, ${auth.lastname}, (to_date(${auth.birthday}, 'dd.mm.yyyy')), ${auth.peopleId}) """.update().apply()
      else
        sql"""
               INSERT INTO "IIAS_OWNER"."И_РИД_АВТОРЫ" ("ФАМИЛИЯ", "ИМЯ", "ОТЧЕСТВО", "ДАТА_РОЖДЕНИЯ") VALUES (${auth.surname}, ${auth.name}, ${auth.lastname}, (to_date(${auth.birthday}, 'dd.mm.yyyy'))) """.update().apply()
      val authId =
        sql"""
             SELECT MAX("ИД_АВТОРА") as ИД FROM И_РИД_АВТОРЫ""".map { rs => rs.int("ИД") }.list().apply()
      sql"""
            INSERT INTO "IIAS_OWNER"."И_РИД_АВТОРЫ_И_ЗАЯВКИ" ("ИД_АВТОРА", "ИД_ЗАЯВКИ", "ПРИЗНАК_РУКОВОДИТЕЛЯ", "ПРИЗНАК_СОЗДАТЕЛЯ_ЗАЯВКИ", "ПОЧТОВЫЙ_АДРЕС", "НОМЕР_ТЕЛЕФОНА", "ВКЛАД_АВТОРА", "МЕСТО_РАБОТЫ", "ДОЛЖНОСТЬ", "КАФЕДРА", "ЭЛЕКТРОННАЯ_ПОЧТА", "СЕРИЯ_ПАСПОРТА", "НОМЕР_ПАСПОРТА", "ГРАЖДАНСТВО", "КЕМ_ВЫДАН_ПАСПОРТ", "КОГДА_ВЫДАН_ПАСПОРТ") VALUES (${authId.apply(0)}, ${auth.peopleDate.toInt}, ${auth.isLeader}, ${auth.isCreator},  ${auth.address}, ${auth.phone}, ${auth.contribution}, ${auth.work}, ${auth.position}, ${auth.department}, ${auth.email}, ${auth.series}, ${auth.number}, ${auth.citizenship}, ${auth.whoGave}, (to_date(${auth.date}, 'dd.mm.yyyy')))""".update().apply()


    }
  }

  def insertAuthByPeopleId(auth: RIDAuthor, appId: Int) {
    insideLocalTx { implicit session =>

      sql"""
               INSERT INTO "IIAS_OWNER"."И_РИД_АВТОРЫ" ("ФАМИЛИЯ", "ИМЯ", "ОТЧЕСТВО", "ДАТА_РОЖДЕНИЯ", "PEOPLE_ID") VALUES (${auth.surname}, ${auth.name}, ${auth.lastname}, (to_date(${auth.birthday}, 'dd.mm.yyyy')), ${auth.peopleId}) """.update().apply()
      val authId =
        sql"""
             SELECT MAX("ИД_АВТОРА") as ИД FROM И_РИД_АВТОРЫ""".map { rs => rs.int("ИД") }.list().apply()
      sql"""
            INSERT INTO "IIAS_OWNER"."И_РИД_АВТОРЫ_И_ЗАЯВКИ" ("ИД_АВТОРА", "ИД_ЗАЯВКИ", "ПРИЗНАК_РУКОВОДИТЕЛЯ", "ПРИЗНАК_СОЗДАТЕЛЯ_ЗАЯВКИ", "ПОЧТОВЫЙ_АДРЕС", "НОМЕР_ТЕЛЕФОНА", "ВКЛАД_АВТОРА", "МЕСТО_РАБОТЫ", "ДОЛЖНОСТЬ", "КАФЕДРА", "ЭЛЕКТРОННАЯ_ПОЧТА", "СЕРИЯ_ПАСПОРТА", "НОМЕР_ПАСПОРТА", "ГРАЖДАНСТВО", "КЕМ_ВЫДАН_ПАСПОРТ", "КОГДА_ВЫДАН_ПАСПОРТ") VALUES (${authId.apply(0)}, $appId, ${auth.isLeader}, ${auth.isCreator},  ${auth.address}, ${auth.phone}, ${auth.contribution}, ${auth.work}, ${auth.position}, ${auth.department}, ${auth.email}, ${auth.series}, ${auth.number}, ${auth.citizenship}, ${auth.whoGave}, (to_date(${auth.date}, 'dd.mm.yyyy')))""".update().apply()


    }
  }


  def changeStatus(app: Demand, status: Int) {
    insideLocalTx { implicit session =>

      sql"""
            update "IIAS_OWNER"."И_РИД_ЗАЯВКИ" SET "СОСТОЯНИЕ_ЗАЯВКИ"=$status WHERE ИД_ЗАЯВКИ=${app.id}
            """.update().apply()
    }
  }

  def changeLeader(auth: RIDAuthor) {
    insideLocalTx { implicit session =>

      sql"""
           update "IIAS_OWNER"."И_РИД_АВТОРЫ_И_ЗАЯВКИ" SET признак_руководителя = 0 WHERE ИД_ЗАЯВКИ= ${auth.peopleDate} and признак_руководителя = 1
            """.update().apply()
      sql"""
            update "IIAS_OWNER"."И_РИД_АВТОРЫ_И_ЗАЯВКИ" SET признак_руководителя = 1 WHERE ИД_ЗАЯВКИ=${auth.peopleDate.toInt} and ИД_АВТОРА = ${auth.id}
            """.update().apply()
    }
  }


  def insertComment(demandId: Int, comment: String) {
    insideLocalTx { implicit session =>

      sql"""
           update "IIAS_OWNER"."И_РИД_ЗАЯВКИ" SET ЗАМЕЧАНИЯ = $comment WHERE ИД_ЗАЯВКИ= ${demandId}
            """.update().apply()
    }
  }


  def deleteAuthor(authId: Int, appId: Int) {
    insideLocalTx { implicit session =>

      sql"""
            delete from "IIAS_OWNER"."И_РИД_АВТОРЫ_И_ЗАЯВКИ" where ид_автора = $authId and ид_заявки = $appId
            """.update().apply()
      var count =
        sql"""
           select count(*) с from и_рид_авторы_и_заявки where ид_автора = $authId
            """.map { rs => rs.int("с") }.list().apply()
      if (count.apply(0).toInt == 0) {
        sql"""
        delete from "IIAS_OWNER"."И_РИД_АВТОРЫ" where ид_автора = $authId """.update().apply()
      }
    }
  }


  def getAuthorByPeopleId(Id: Long): List[RIDAuthor] = {
    insideReadOnly { implicit session =>
      sql"""
           select а.члвк_ид, а.фамилия, а.имя, а.отчество, to_char(а.дата_рождения, 'dd.mm.yyyy') др, страна || (CASE WHEN nvl(район, '1') = '1' THEN '' ELSE ', ' || район || ' район' END) || (CASE WHEN nvl(город, '1') = '1' THEN '' ELSE ', г. ' || город END) || (CASE WHEN nvl(тип_нас_пункт_сокращение, '1') = '1' THEN '' ELSE ', ' || тип_нас_пункт_сокращение || '.' END) || (CASE WHEN nvl(насел_пункт, '1') = '1' THEN '' ELSE насел_пункт END) || (CASE WHEN nvl(индекс, '1') = '1' THEN '' ELSE ', ' || индекс END) || (CASE WHEN nvl(тип_улицы_сокращение, '1') = '1' THEN '' ELSE ', ' || тип_улицы_сокращение || '. ' END) || (CASE WHEN nvl(улица, '1') = '1' THEN '' ELSE улица END) || (CASE WHEN nvl(дом, '1') = '1' THEN '' ELSE ' ' || дом END) || (CASE WHEN nvl(корпус, '1') = '1' THEN '' ELSE ' корп. ' || корпус END) || (CASE WHEN nvl(квартира, '1') = '1' THEN '' ELSE ' кв.' || квартира END) почтовый_адрес, контакт, Д.НОМЕР номер, Д.СЕРИЯ серия, Д.КЕМ_ВЫДАН кем, to_char(Д.ДАТА1, 'dd.mm.yyyy') когда
           from IIAS_OWNER.ИП3_ФИО а, ип8_адреса, и8_контакты, ип3_документы Д
                       where а.члвк_ид = $Id
                       and а.члвк_ид = и8_контакты.члвк_ид(+)
                       and а.члвк_ид = ип8_адреса.члвк_ид(+)
                       AND А.члвк_ид = Д.ИМЯ_ЧЛВК_ИД(+)
                       and ип8_адреса.дата1 = (SELECT MAX(дата1) FROM (SELECT дата1 FROM ип8_адреса WHERE члвк_ид = $Id))
                       and (upper(Д.наименование) like 'ПАСПОРТ%' or (upper(Д.наименование) like 'УДОСТОВЕРЕНИЕ ЛИЧНОСТИ%'))
                       AND NVL(Д.ДАТА2, to_date('01.01.0001', 'dd.mm.yyyy')) = to_date('01.01.0001', 'dd.mm.yyyy')
                       and rownum = 1
            """.map { rs =>
        RIDAuthor(
          0,
          rs.longOpt("члвк_ид"),
          rs.string("др"),
          rs.string("ФАМИЛИЯ"),
          rs.string("ИМЯ"),
          rs.string("ОТЧЕСТВО"),
          rs.string("др"),
          rs.string("ПОЧТОВЫЙ_АДРЕС"),
          rs.string("контакт"),
          null,
          null,
          null,
          null,
          rs.string("СЕРИЯ"),
          rs.string("НОМЕР"),
          rs.string("КЕМ"),
          rs.string("КОГДА"),
          null,
          null,
          0,
          0
          //          rs.string("МЕСТО_РАБОТЫ"),
          //          rs.string("ДОЛЖНОСТЬ"),
          //          rs.string("КАФЕДРА"),
          //
          //          rs.string("ГРАЖДАНСТВО"),
        )
      }.list().apply()
    }
  }


  def getAuthorPassportByPeopleId(Id: Long): List[RIDAuthor] = {
    insideReadOnly { implicit session =>
      sql"""
           select ИМЯ_ЧЛВК_ИД, НОМЕР, СЕРИЯ, КЕМ_ВЫДАН, to_char(ДАТА1, 'dd.mm.yyyy') КОГДА, ип3_гражданства.название ГРАЖДАНСТВО
           from ип3_документы, ип3_гражданства
           where ип3_документы.ид = ип3_гражданства.личд_ид
           and ИМЯ_ЧЛВК_ИД = $Id

           and  (upper(наименование) = upper('Паспорт гражданина РФ') or (upper(наименование) = upper('Паспорт иностранного гражданина')) or (upper(наименование) = upper('Удостоверение личности иностранного гражданина')))
           AND NVL(ДАТА2, to_date('01.01.1901', 'dd.mm.yyyy')) = to_date('01.01.1901', 'dd.mm.yyyy')
            """.map { rs =>
        RIDAuthor(
          0,
          rs.longOpt("ИМЯ_ЧЛВК_ИД"),
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          rs.string("СЕРИЯ"),
          rs.string("НОМЕР"),
          rs.string("КЕМ_ВЫДАН"),
          rs.string("КОГДА"),
          rs.string("ГРАЖДАНСТВО"),
          null,
          0,
          0
        )
      }.list().apply()
    }
  }


  def getAuthorPhoneByPeopleId(Id: Long): List[RIDAuthor] = {
    insideReadOnly { implicit session =>
      sql"""
           select а.члвк_ид члвк_ид, а.фамилия ФАМИЛИЯ, а.имя ИМЯ, а.отчество ОТЧЕСТВО, to_char(а.дата_рождения, 'dd.mm.yyyy') др, НОМЕР
           from IIAS_OWNER.ИП3_ФИО а, и_телефоны
           where а.члвк_ид = $Id
           and а.члвк_ид = и_телефоны.члвк_ид(+)
           and вид != 'ДОМ'
           and nvl(дата2, to_date('01.01.1901', 'dd.mm.yyyy')) = to_date('01.01.1901', 'dd.mm.yyyy')
            """.map { rs =>
        RIDAuthor(
          0,
          rs.longOpt("члвк_ид"),
          rs.string("др"),
          rs.string("ФАМИЛИЯ"),
          rs.string("ИМЯ"),
          rs.string("ОТЧЕСТВО"),
          rs.string("др"),
          null,
          null,
          rs.string("НОМЕР"),
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          0,
          0
        )
      }.list().apply()
    }
  }


  def getAuthorContactByPeopleId(Id: Long): List[RIDAuthor] = {
    insideReadOnly { implicit session =>
      sql"""
           select а.члвк_ид, а.фамилия, а.имя, а.отчество, to_char(а.дата_рождения, 'dd.mm.yyyy') др, контакт
           from IIAS_OWNER.ИП3_ФИО а, и8_контакты
           where а.члвк_ид = $Id
           and а.члвк_ид = и8_контакты.члвк_ид(+)
           and rownum = 1
            """.map { rs =>
        RIDAuthor(
          0,
          rs.longOpt("члвк_ид"),
          rs.string("др"),
          rs.string("ФАМИЛИЯ"),
          rs.string("ИМЯ"),
          rs.string("ОТЧЕСТВО"),
          rs.string("др"),
          null,
          rs.string("контакт"),
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          0,
          0
        )
      }.list().apply()
    }
  }

  def getAuthorAddressByPeopleId(Id: Long): List[RIDAuthor] = {
    insideReadOnly { implicit session =>
      sql"""
           select а.члвк_ид, а.фамилия, а.имя, а.отчество, to_char(а.дата_рождения, 'dd.mm.yyyy') др, страна || (CASE WHEN nvl(район, '1') = '1' THEN '' ELSE ', ' || район || ' район' END) || (CASE WHEN nvl(город, '1') = '1' THEN '' ELSE ', г. ' || город END) || (CASE WHEN nvl(тип_нас_пункт_сокращение, '1') = '1' THEN '' ELSE ', ' || тип_нас_пункт_сокращение || '.' END) || (CASE WHEN nvl(насел_пункт, '1') = '1' THEN '' ELSE насел_пункт END) || (CASE WHEN nvl(индекс, '1') = '1' THEN '' ELSE ', ' || индекс END) || (CASE WHEN nvl(тип_улицы_сокращение, '1') = '1' THEN '' ELSE ', ' || тип_улицы_сокращение || '. ' END) || (CASE WHEN nvl(улица, '1') = '1' THEN '' ELSE улица END) || (CASE WHEN nvl(дом, '1') = '1' THEN '' ELSE ' ' || дом END) || (CASE WHEN nvl(корпус, '1') = '1' THEN '' ELSE ' корп. ' || корпус END) || (CASE WHEN nvl(квартира, '1') = '1' THEN '' ELSE ' кв.' || квартира END) почтовый_адрес
                     from IIAS_OWNER.ИП3_ФИО а, (SELECT * FROM ип8_адреса ORDER BY дата1 desc) и
                     where а.члвк_ид = $Id
                     and а.члвк_ид = и.члвк_ид(+)
                    and rownum = 1
            """.map { rs =>
        RIDAuthor(
          0,
          rs.longOpt("члвк_ид"),
          rs.string("др"),
          rs.string("ФАМИЛИЯ"),
          rs.string("ИМЯ"),
          rs.string("ОТЧЕСТВО"),
          rs.string("др"),
          rs.string("ПОЧТОВЫЙ_АДРЕС"),
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          0,
          0
        )
      }.list().apply()
    }
  }

  def isAdminRole(peopleId: Long): Boolean = {
    insideReadOnly { implicit session =>
      val count =
        sql"""
             select count(*) ид from wv_permissions where члвк_ид = $peopleId and role = upper('eservice_rid_urol')""".map { rs => rs.int("ид") }.list().apply()

      if (count.apply(0) > 0) {
        return true
      }
      else {
        return false
      }
    }
  }

  def statusById(Id: Int): Int = {
    insideReadOnly { implicit session =>
      val status =
        sql"""
                        select состояние_заявки ид from и_рид_заявки where ид_заявки = $Id""".map { rs => rs.int("ид") }.list().apply()
      return status.apply(0).toInt
    }

  }

  def getAuthorByPeopleIdFromOurTable(Id: Long): List[RIDAuthor] = {
    insideReadOnly { implicit session =>
      sql"""

           select И_РИД_АВТОРЫ.ИД_АВТОРА ИД, ФАМИЛИЯ, ИМЯ, ОТЧЕСТВО, to_char(ДАТА_РОЖДЕНИЯ, 'dd.mm.yyyy') др, to_char(PEOPLE_ID) PEOPLE_ID, to_char(PEOPLE_DATE, 'dd.mm.yyyy') peopdate, ПОЧТОВЫЙ_АДРЕС, НОМЕР_ТЕЛЕФОНА, ЭЛЕКТРОННАЯ_ПОЧТА, МЕСТО_РАБОТЫ, ДОЛЖНОСТЬ, КАФЕДРА, СЕРИЯ_ПАСПОРТА, НОМЕР_ПАСПОРТА, КЕМ_ВЫДАН_ПАСПОРТ, to_char(КОГДА_ВЫДАН_ПАСПОРТ, 'dd.mm.yyyy') КОГДА, ГРАЖДАНСТВО, ВКЛАД_АВТОРА, ПРИЗНАК_СОЗДАТЕЛЯ_ЗАЯВКИ, ПРИЗНАК_РУКОВОДИТЕЛЯ
                        from и_рид_авторы, и_рид_авторы_и_заявки
           where и_рид_авторы."ИД_АВТОРА" = и_рид_авторы_и_заявки."ИД_АВТОРА"
           and и_рид_авторы.PEOPLE_ID = $Id
            """.map { rs =>
        RIDAuthor(
          rs.int("ИД"),
          rs.longOpt("PEOPLE_ID"),
          rs.string("peopdate"),
          rs.string("ФАМИЛИЯ"),
          rs.string("ИМЯ"),
          rs.string("ОТЧЕСТВО"),
          rs.string("др"),
          rs.string("ПОЧТОВЫЙ_АДРЕС"),
          rs.string("ЭЛЕКТРОННАЯ_ПОЧТА"),
          rs.string("НОМЕР_ТЕЛЕФОНА"),
          rs.string("МЕСТО_РАБОТЫ"),
          rs.string("ДОЛЖНОСТЬ"),
          rs.string("КАФЕДРА"),
          rs.string("СЕРИЯ_ПАСПОРТА"),
          rs.string("НОМЕР_ПАСПОРТА"),
          rs.string("КЕМ_ВЫДАН_ПАСПОРТ"),
          rs.string("КОГДА"),
          rs.string("ГРАЖДАНСТВО"),
          rs.string("ВКЛАД_АВТОРА"),
          rs.int("ПРИЗНАК_СОЗДАТЕЛЯ_ЗАЯВКИ"),
          rs.int("ПРИЗНАК_РУКОВОДИТЕЛЯ")
        )
      }.list().apply()
    }

  }


  def getAuthorFromOurTable(auth: RIDAuthor): List[RIDAuthor] = {
    insideReadOnly { implicit session =>
      sql"""
           select ИД_АВТОРА, ФАМИЛИЯ, ИМЯ, ОТЧЕСТВО, to_char(ДАТА_РОЖДЕНИЯ, 'dd.mm.yyyy') др, to_char(PEOPLE_ID) PEOPLE_ID, to_char(PEOPLE_DATE, 'dd.mm.yyyy') peopdate
                        from и_рид_авторы
           where upper(ФАМИЛИЯ) like (upper(${auth.surname}) || '%') and upper(ИМЯ) like (upper(${auth.name}) || '%') and upper(ОТЧЕСТВО) like (upper(${auth.lastname}) || '%')   and to_char(ДАТА_РОЖДЕНИЯ, 'dd.mm.yyyy') like (${auth.birthday} || '%')
            """.map { rs =>
        RIDAuthor(
          rs.int("ИД_АВТОРА"),
          rs.longOpt("PEOPLE_ID"),
          null,
          rs.string("ФАМИЛИЯ"),
          rs.string("ИМЯ"),
          rs.string("ОТЧЕСТВО"),
          rs.string("др"),
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          0,
          0
        )
      }.list().apply()
    }
  }


  def getAuthorByFio(auth: RIDAuthor): List[RIDAuthor] = {
    insideReadOnly { implicit session =>
      sql"""
           select ФАМИЛИЯ, ИМЯ, ОТЧЕСТВО, to_char(ДАТА_РОЖДЕНИЯ, 'dd.mm.yyyy') др, to_char(члвк_ид) PEOPLE_ID
                        from ип3_фио
           where upper(ФАМИЛИЯ) like (upper(${auth.surname})) and upper(ИМЯ) like (upper(${auth.name}) || '%') and upper(ОТЧЕСТВО) like (upper(${auth.lastname}) || '%')   and to_char(ДАТА_РОЖДЕНИЯ, 'dd.mm.yyyy') like (${auth.birthday} || '%')
            """.map { rs =>
        RIDAuthor(
          0,
          rs.longOpt("PEOPLE_ID"),
          null,
          rs.string("ФАМИЛИЯ"),
          rs.string("ИМЯ"),
          rs.string("ОТЧЕСТВО"),
          rs.string("др"),
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          0,
          0
        )
      }.list().apply()
    }
  }


  def authDataById(AuthId: Int): List[Author] = {
    insideReadOnly { implicit session =>
      sql"""
            select ИД_АВТОРА, ПОЧТОВЫЙ_АДРЕС, НОМЕР_ТЕЛЕФОНА, ЭЛЕКТРОННАЯ_ПОЧТА, МЕСТО_РАБОТЫ, ДОЛЖНОСТЬ, КАФЕДРА, СЕРИЯ_ПАСПОРТА, НОМЕР_ПАСПОРТА, КЕМ_ВЫДАН_ПАСПОРТ, to_char(КОГДА_ВЫДАН_ПАСПОРТ, 'dd.mm.yyyy') КОГДА, ГРАЖДАНСТВО
                       from И_РИД_АВТОРЫ_И_ЗАЯВКИ
                       where И_РИД_АВТОРЫ_И_ЗАЯВКИ.ИД_АВТОРА = $AuthId AND И_РИД_АВТОРЫ_И_ЗАЯВКИ.ИД_АВТОРЫ_И_ЗАЯВКИ = (SELECT MAX("ИД_АВТОРЫ_И_ЗАЯВКИ") FROM (SELECT ИД_АВТОРЫ_И_ЗАЯВКИ FROM И_РИД_АВТОРЫ_И_ЗАЯВКИ WHERE И_РИД_АВТОРЫ_И_ЗАЯВКИ.ИД_АВТОРА = $AuthId))
          """.map { rs =>
        Author(
          rs.int("ИД_АВТОРА"),
          rs.string("ПОЧТОВЫЙ_АДРЕС"),
          rs.string("ЭЛЕКТРОННАЯ_ПОЧТА"),
          rs.string("НОМЕР_ТЕЛЕФОНА"),
          rs.string("МЕСТО_РАБОТЫ"),
          rs.string("ДОЛЖНОСТЬ"),
          rs.string("КАФЕДРА"),
          rs.string("СЕРИЯ_ПАСПОРТА"),
          rs.string("НОМЕР_ПАСПОРТА"),
          rs.string("КЕМ_ВЫДАН_ПАСПОРТ"),
          rs.string("КОГДА"),
          rs.string("ГРАЖДАНСТВО"),
          null,
          0,
          0
        )
      }.list().apply()
    }
  }


  def creatorByDemandId(demandId: Int): List[RIDAuthor] = {
    insideReadOnly { implicit session =>
      sql"""
            select И_РИД_Авторы.Фамилия || ' ' || substr(имя, 1, 1) || '.' || substr(отчество, 1, 1) || '.' ФАМИЛИЯ, PEOPLE_ID
            from И_РИД_АВТОРЫ_И_ЗАЯВКИ, И_РИД_Авторы
            where И_РИД_АВТОРЫ_И_ЗАЯВКИ.ИД_заявки = $demandId AND И_РИД_АВТОРЫ_И_ЗАЯВКИ.ид_автора = И_РИД_Авторы.ид_автора and И_РИД_АВТОРЫ_И_ЗАЯВКИ.признак_создателя_заявки = '1'
          """.map { rs =>
        RIDAuthor(
          0,
          rs.longOpt("PEOPLE_ID"),
          null,
          rs.string("ФАМИЛИЯ"),
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          0,
          0
        )
      }.list().apply()
    }
  }

  // ------------------------------
  def selectAuthorsByDemandId(ApplicationId: Int): List[RIDAuthor] = {
    insideReadOnly { implicit session =>
      sql"""
            select И_РИД_АВТОРЫ.ИД_АВТОРА ИД, ФАМИЛИЯ, ИМЯ, nvl(ОТЧЕСТВО, ' ') ОТЧЕСТВО, to_char(ДАТА_РОЖДЕНИЯ, 'dd.mm.yyyy') др, to_char(PEOPLE_ID) PEOPLE_ID, to_char(PEOPLE_DATE, 'dd.mm.yyyy') peopdate, nvl(ПОЧТОВЫЙ_АДРЕС, ' ') ПОЧТОВЫЙ_АДРЕС, nvl(НОМЕР_ТЕЛЕФОНА, ' ') НОМЕР_ТЕЛЕФОНА, nvl(ЭЛЕКТРОННАЯ_ПОЧТА, ' ') ЭЛЕКТРОННАЯ_ПОЧТА, nvl(МЕСТО_РАБОТЫ, ' ') МЕСТО_РАБОТЫ, nvl(ДОЛЖНОСТЬ, ' ') ДОЛЖНОСТЬ, nvl(КАФЕДРА, ' ') КАФЕДРА, nvl(СЕРИЯ_ПАСПОРТА, ' ') СЕРИЯ_ПАСПОРТА, nvl(НОМЕР_ПАСПОРТА, ' ') НОМЕР_ПАСПОРТА, nvl(КЕМ_ВЫДАН_ПАСПОРТ, ' ') КЕМ_ВЫДАН_ПАСПОРТ, nvl(to_char(КОГДА_ВЫДАН_ПАСПОРТ, 'dd.mm.yyyy'), ' ') КОГДА, nvl(ГРАЖДАНСТВО, ' ') ГРАЖДАНСТВО, nvl(ВКЛАД_АВТОРА, ' ') ВКЛАД_АВТОРА, ПРИЗНАК_СОЗДАТЕЛЯ_ЗАЯВКИ, ПРИЗНАК_РУКОВОДИТЕЛЯ
            from И_РИД_АВТОРЫ, И_РИД_АВТОРЫ_И_ЗАЯВКИ
            where И_РИД_АВТОРЫ.ИД_АВТОРА = И_РИД_АВТОРЫ_И_ЗАЯВКИ.ИД_АВТОРА
            and И_РИД_АВТОРЫ_И_ЗАЯВКИ.ИД_ЗАЯВКИ = $ApplicationId
          """.map { rs =>
        RIDAuthor(
          rs.int("ИД"),
          rs.longOpt("PEOPLE_ID"),
          rs.string("peopdate"),
          rs.string("ФАМИЛИЯ"),
          rs.string("ИМЯ"),
          rs.string("ОТЧЕСТВО"),
          rs.string("др"),
          rs.string("ПОЧТОВЫЙ_АДРЕС"),
          rs.string("ЭЛЕКТРОННАЯ_ПОЧТА"),
          rs.string("НОМЕР_ТЕЛЕФОНА"),
          rs.string("МЕСТО_РАБОТЫ"),
          rs.string("ДОЛЖНОСТЬ"),
          rs.string("КАФЕДРА"),
          rs.string("СЕРИЯ_ПАСПОРТА"),
          rs.string("НОМЕР_ПАСПОРТА"),
          rs.string("КЕМ_ВЫДАН_ПАСПОРТ"),
          rs.string("КОГДА"),
          rs.string("ГРАЖДАНСТВО"),
          rs.string("ВКЛАД_АВТОРА"),
          rs.int("ПРИЗНАК_СОЗДАТЕЛЯ_ЗАЯВКИ"),
          rs.int("ПРИЗНАК_РУКОВОДИТЕЛЯ")
        )
      }.list().apply()
    }
  }

  // ------------------------------


  def getAllAllAuthors(PersonId: Long): List[RIDAuthor] = {
    insideReadOnly { implicit session =>
      sql"""
           select ИД_АВТОРА ИД, ФАМИЛИЯ, ИМЯ, ОТЧЕСТВО, to_char(ДАТА_РОЖДЕНИЯ, 'dd.mm.yyyy') др
                       from И_РИД_АВТОРЫ
                       where PEOPLE_ID != $PersonId
          """.map { rs =>
        RIDAuthor(
          rs.int("ИД"),
          None,
          "11.12.2012",
          rs.string("ФАМИЛИЯ"),
          rs.string("ИМЯ"),
          rs.string("ОТЧЕСТВО"),
          rs.string("др"),
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          0,
          0
        )
      }.list().apply()
    }
  }

  def getAllAuthors(): List[RIDAuthor] = {
    insideReadOnly { implicit session =>
      sql"""
           select И_РИД_АВТОРЫ.ИД_АВТОРА ИД, ФАМИЛИЯ, ИМЯ, ОТЧЕСТВО, to_char(ДАТА_РОЖДЕНИЯ, 'dd.mm.yyyy') др, ПОЧТОВЫЙ_АДРЕС, ЭЛЕКТРОННАЯ_ПОЧТА, НОМЕР_ТЕЛЕФОНА, МЕСТО_РАБОТЫ, ДОЛЖНОСТЬ, КАФЕДРА, СЕРИЯ_ПАСПОРТА, НОМЕР_ПАСПОРТА, КЕМ_ВЫДАН_ПАСПОРТ, to_char(КОГДА_ВЫДАН_ПАСПОРТ, 'dd.mm.yyyy') когда, ГРАЖДАНСТВО, ВКЛАД_АВТОРА, PEOPLE_ID, to_char(PEOPLE_DATE, 'dd.mm.yyyy') peopdate, ПРИЗНАК_СОЗДАТЕЛЯ_ЗАЯВКИ, ПРИЗНАК_РУКОВОДИТЕЛЯ
                                 from И_РИД_АВТОРЫ, И_РИД_АВТОРЫ_И_ЗАЯВКИ
            where И_РИД_АВТОРЫ.ИД_АВТОРА = И_РИД_АВТОРЫ_И_ЗАЯВКИ.ИД_АВТОРА
                     """.map { rs =>
        RIDAuthor(
          rs.int("ИД"),
          rs.longOpt("PEOPLE_ID"),
          rs.string("peopdate"),
          rs.string("ФАМИЛИЯ"),
          rs.string("ИМЯ"),
          rs.string("ОТЧЕСТВО"),
          rs.string("др"),
          rs.string("ПОЧТОВЫЙ_АДРЕС"),
          rs.string("ЭЛЕКТРОННАЯ_ПОЧТА"),
          rs.string("НОМЕР_ТЕЛЕФОНА"),
          rs.string("МЕСТО_РАБОТЫ"),
          rs.string("ДОЛЖНОСТЬ"),
          rs.string("КАФЕДРА"),
          rs.string("СЕРИЯ_ПАСПОРТА"),
          rs.string("НОМЕР_ПАСПОРТА"),
          rs.string("КЕМ_ВЫДАН_ПАСПОРТ"),
          rs.string("когда"),
          rs.string("ГРАЖДАНСТВО"),
          rs.string("ВКЛАД_АВТОРА"),
          rs.int("ПРИЗНАК_СОЗДАТЕЛЯ"),
          rs.int("ПРИЗНАК_РУКОВОДИТЕЛЯ_ЗАЯВКИ")
        )
      }.list().apply()
    }
  }

  def findApplications(PersonId: Long): List[Demand] = {
    insideReadOnly { implicit session =>
      sql"""
           select И_РИД_ЗАЯВКИ.ИД_ЗАЯВКИ, НАЗВАНИЕ_ОБЪЕКТА_РЕГИСТРАЦИИ, ЗАЯВИТЕЛЬ, to_char(ДАТА_СОЗДАНИЯ_РИД, 'dd.mm.yyyy') дата_созд, ЗАМЕЧАНИЯ, ТИП_ЭВМ, ЯЗЫК, АННОТАЦИЯ, ОС, ОБЪЕМ_ПРОГРАММЫ, СОСТОЯНИЕ_ЗАЯВКИ, АДРЕС_ЗАЯВИТЕЛЯ, И_РИД_ТИП_ЗАЯВКИ.НАЗВАНИЕ, to_char(ДАТА_СОЗДАНИЯ_ЗАЯВКИ, 'dd.mm.yyyy') appdate
           from И_РИД_ТИП_ЗАЯВКИ, И_РИД_ЗАЯВКИ, и_рид_авторы_и_заявки, и_рид_авторы
                      WHERE И_РИД_ЗАЯВКИ.ИД_ТИПА_ЗАЯВКИ = И_РИД_ТИП_ЗАЯВКИ.ИД_ТИПА_ЗАЯВКИ
                      and И_РИД_ЗАЯВКИ.ид_заявки = и_рид_авторы_и_заявки.ид_заявки
                      and и_рид_авторы_и_заявки.ид_автора = и_рид_авторы.ид_автора
                      and и_рид_авторы.PEOPLE_ID = $PersonId and и_рид_авторы_и_заявки.признак_создателя_заявки = 1
                      order by ДАТА_СОЗДАНИЯ_РИД desc
          """.map { rs =>
        Demand(
          rs.int("ИД_ЗАЯВКИ"),
          rs.string("НАЗВАНИЕ"),
          rs.string("НАЗВАНИЕ_ОБЪЕКТА_РЕГИСТРАЦИИ"),
          rs.string("ЗАЯВИТЕЛЬ"),
          rs.string("дата_созд"),
          rs.string("ТИП_ЭВМ"),
          rs.string("ЯЗЫК"),
          rs.string("АННОТАЦИЯ"),
          rs.string("ОС"),
          rs.int("ОБЪЕМ_ПРОГРАММЫ"),
          rs.string("АДРЕС_ЗАЯВИТЕЛЯ"),
          rs.int("СОСТОЯНИЕ_ЗАЯВКИ"),
          null,
          null,
          rs.string("appdate"),
          rs.string("ЗАМЕЧАНИЯ")
        )
      }.list().apply()
    }
  }


  def findApplicationsForAdmin(): List[Demand] = {
    insideReadOnly { implicit session =>
      sql"""
           select И_РИД_ЗАЯВКИ.ИД_ЗАЯВКИ, НАЗВАНИЕ_ОБЪЕКТА_РЕГИСТРАЦИИ, ЗАЯВИТЕЛЬ, to_char(ДАТА_СОЗДАНИЯ_РИД, 'dd.mm.yyyy') дата_созд, ЗАМЕЧАНИЯ, ТИП_ЭВМ, ЯЗЫК, АННОТАЦИЯ, ОС, ОБЪЕМ_ПРОГРАММЫ, СОСТОЯНИЕ_ЗАЯВКИ, АДРЕС_ЗАЯВИТЕЛЯ, И_РИД_ТИП_ЗАЯВКИ.НАЗВАНИЕ, to_char(ДАТА_СОЗДАНИЯ_ЗАЯВКИ, 'dd.mm.yyyy') appdate
           from И_РИД_ТИП_ЗАЯВКИ, И_РИД_ЗАЯВКИ
                      WHERE И_РИД_ЗАЯВКИ.ИД_ТИПА_ЗАЯВКИ = И_РИД_ТИП_ЗАЯВКИ.ИД_ТИПА_ЗАЯВКИ
                      order by ДАТА_СОЗДАНИЯ_РИД desc
          """.map { rs =>
        Demand(
          rs.int("ИД_ЗАЯВКИ"),
          rs.string("НАЗВАНИЕ"),
          rs.string("НАЗВАНИЕ_ОБЪЕКТА_РЕГИСТРАЦИИ"),
          rs.string("ЗАЯВИТЕЛЬ"),
          rs.string("дата_созд"),
          rs.string("ТИП_ЭВМ"),
          rs.string("ЯЗЫК"),
          rs.string("АННОТАЦИЯ"),
          rs.string("ОС"),
          rs.int("ОБЪЕМ_ПРОГРАММЫ"),
          rs.string("АДРЕС_ЗАЯВИТЕЛЯ"),
          rs.int("СОСТОЯНИЕ_ЗАЯВКИ"),
          null,
          null,
          rs.string("appdate"),
          rs.string("ЗАМЕЧАНИЯ")
        )
      }.list().apply()
    }
  }


  def findApplicationbyId(Id: Int): List[Demand] = {
    insideReadOnly { implicit session =>
      sql"""
           select И_РИД_ЗАЯВКИ.ИД_ЗАЯВКИ, nvl(НАЗВАНИЕ_ОБЪЕКТА_РЕГИСТРАЦИИ, ' ') НАЗВАНИЕ_ОБЪЕКТА_РЕГИСТРАЦИИ, nvl(ЗАЯВИТЕЛЬ, ' ') ЗАЯВИТЕЛЬ, to_char(ДАТА_СОЗДАНИЯ_РИД, 'dd.mm.yyyy') дата_созд, nvl(ЗАМЕЧАНИЯ, ' ') ЗАМЕЧАНИЯ, nvl(ТИП_ЭВМ, ' ') ТИП_ЭВМ, nvl(ЯЗЫК, ' ') ЯЗЫК, nvl(АННОТАЦИЯ, ' ') АННОТАЦИЯ, nvl(ОС, ' ') ОС, ОБЪЕМ_ПРОГРАММЫ, СОСТОЯНИЕ_ЗАЯВКИ, nvl(АДРЕС_ЗАЯВИТЕЛЯ, ' ') АДРЕС_ЗАЯВИТЕЛЯ, И_РИД_ТИП_ЗАЯВКИ.НАЗВАНИЕ, to_char(ДАТА_СОЗДАНИЯ_ЗАЯВКИ, 'dd.mm.yyyy') appdate
           from И_РИД_ТИП_ЗАЯВКИ, И_РИД_ЗАЯВКИ
                      WHERE И_РИД_ЗАЯВКИ.ИД_ТИПА_ЗАЯВКИ = И_РИД_ТИП_ЗАЯВКИ.ИД_ТИПА_ЗАЯВКИ
                      and И_РИД_ЗАЯВКИ.ИД_ЗАЯВКИ = $Id
          """.map { rs =>
        Demand(
          rs.int("ИД_ЗАЯВКИ"),
          rs.string("НАЗВАНИЕ"),
          rs.string("НАЗВАНИЕ_ОБЪЕКТА_РЕГИСТРАЦИИ"),
          rs.string("ЗАЯВИТЕЛЬ"),
          rs.string("дата_созд"),
          rs.string("ТИП_ЭВМ"),
          rs.string("ЯЗЫК"),
          rs.string("АННОТАЦИЯ"),
          rs.string("ОС"),
          rs.int("ОБЪЕМ_ПРОГРАММЫ"),
          rs.string("АДРЕС_ЗАЯВИТЕЛЯ"),
          rs.int("СОСТОЯНИЕ_ЗАЯВКИ"),
          null,
          null,
          rs.string("appdate"),
          rs.string("ЗАМЕЧАНИЯ")
        )
      }.list().apply()
    }
  }


  def getAuthorById(AuthorId: Int): List[RIDAuthor] = {
    insideReadOnly { implicit session =>
      sql"""
           select И_РИД_АВТОРЫ.ИД_АВТОРА ИД, ФАМИЛИЯ, ИМЯ, ОТЧЕСТВО, to_char(ДАТА_РОЖДЕНИЯ, 'dd.mm.yyyy') др, ПОЧТОВЫЙ_АДРЕС, ЭЛЕКТРОННАЯ_ПОЧТА, НОМЕР_ТЕЛЕФОНА, МЕСТО_РАБОТЫ, ДОЛЖНОСТЬ, КАФЕДРА, СЕРИЯ_ПАСПОРТА, НОМЕР_ПАСПОРТА, КЕМ_ВЫДАН_ПАСПОРТ, to_char(КОГДА_ВЫДАН_ПАСПОРТ, 'dd.mm.yyyy') когда, ГРАЖДАНСТВО, ВКЛАД_АВТОРА, PEOPLE_ID, to_char(PEOPLE_DATE, 'dd.mm.yyyy') peopdate, ПРИЗНАК_СОЗДАТЕЛЯ_ЗАЯВКИ, ПРИЗНАК_РУКОВОДИТЕЛЯ
                       from И_РИД_АВТОРЫ, И_РИД_АВТОРЫ_И_ЗАЯВКИ
           where И_РИД_АВТОРЫ.ИД_АВТОРА = $AuthorId
             and И_РИД_АВТОРЫ.ИД_АВТОРА = И_РИД_АВТОРЫ_И_ЗАЯВКИ.ИД_АВТОРА

          """.map { rs =>
        RIDAuthor(
          rs.int("ИД"),
          rs.longOpt("PEOPLE_ID"),
          rs.string("peopdate"),
          rs.string("ФАМИЛИЯ"),
          rs.string("ИМЯ"),
          rs.string("ОТЧЕСТВО"),
          rs.string("др"),
          rs.string("ПОЧТОВЫЙ_АДРЕС"),
          rs.string("ЭЛЕКТРОННАЯ_ПОЧТА"),
          rs.string("НОМЕР_ТЕЛЕФОНА"),
          rs.string("МЕСТО_РАБОТЫ"),
          rs.string("ДОЛЖНОСТЬ"),
          rs.string("КАФЕДРА"),
          rs.string("СЕРИЯ_ПАСПОРТА"),
          rs.string("НОМЕР_ПАСПОРТА"),
          rs.string("КЕМ_ВЫДАН_ПАСПОРТ"),
          rs.string("когда"),
          rs.string("ГРАЖДАНСТВО"),
          rs.string("ВКЛАД_АВТОРА"),
          rs.int("ПРИЗНАК_СОЗДАТЕЛЯ"),
          rs.int("ПРИЗНАК_РУКОВОДИТЕЛЯ_ЗАЯВКИ")
        )
      }.list().apply()
    }
  }
}
