package edu.omsu.eservice.patent

@throws(classOf[Exception])
object CheckAdminClass {


  @throws(classOf[Exception])
  def check(id: Long): Boolean = {
    // var a: Int = Dao.checkAdmin(id)
    if (id == 54412)
      return true
    else
      return false
  }


}
