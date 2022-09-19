package edu.omsu.eservice.patent.connection

import scalikejdbc.{ConnectionPool, DB, DBSession, _}

import java.sql.Connection

trait DbConnected {
  def connectionFromPool: Connection = ConnectionPool.borrow('dbConnected)

  def dbFromPool: DB = DB(connectionFromPool)


  def insideLocalTx[A](sqlRequest: DBSession => A): A = {
    using(dbFromPool) { db =>
      db localTx { session =>
        sqlRequest(session)
      }
    }
  }

  def insideReadOnly[A](sqlRequest: DBSession => A): A = {
    using(dbFromPool) { db =>
      db readOnly { session =>
        sqlRequest(session)
      }
    }
  }
}
