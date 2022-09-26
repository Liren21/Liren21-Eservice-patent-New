package edu.omsu.eservice.patent.entity

object RIDStatuses {
  val DRAFT = 0
  val READY_TO_CHECK = 1
  val ON_CHECK = 2
  val SIGNED = 3
}

case class RIDAuthor(
                      id: Int,
                      peopleId: Option[Long],
                      peopleDate: String,
                      surname: String,
                      name: String,
                      lastname: String,
                      birthday: String,
                      address: String,
                      email: String,
                      phone: String,
                      work: String,
                      position: String,
                      department: String,
                      series: String,
                      number: String,
                      whoGave: String,
                      date: String,
                      citizenship: String,
                      contribution: String,
                      isCreator: Int,
                      isLeader: Int
                    )

case class Author(
                   id: Int,
                   address: String,
                   email: String,
                   phone: String,
                   work: String,
                   position: String,
                   department: String,
                   series: String,
                   number: String,
                   whoGave: String,
                   date: String,
                   citizenship: String,
                   contribution: String,
                   isCreator: Int,
                   isLeader: Int
                 )

case class Demand(
                   id: Int,
                   objType: String,
                   name: String,
                   owner: String,
                   createDate: String,
                   pcType: String,
                   language: String,
                   annotation: String,
                   OS: String,
                   size: Int,
                   addressDemand: String,
                   status: Int,
                   authors: List[RIDAuthor],
                   existAuths: List[Author],
                   createAppDate: String,
                   comment: String
                   // people_id: Int,
                   //people_date: String
                 )

