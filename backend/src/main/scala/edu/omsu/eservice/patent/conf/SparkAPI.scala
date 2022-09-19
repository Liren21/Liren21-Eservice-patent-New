package edu.omsu.eservice.patent.conf

import com.typesafe.config.ConfigFactory
import edu.omsu.eservice.patent.security.{EserviceProfile, EserviceRoutes}
import org.pac4j.core.profile.ProfileManager
import org.pac4j.sparkjava.SparkWebContext
import spark._

object SparkAPI {

  val config = ConfigFactory.load()

  val appRoot = if (config.hasPath("app.root")) config.getString("app.root") else ""

  def init() {
    if (config.hasPath("app.port"))
      Spark.port(config.getInt("app.port"))

    val appUrl = config.getString("app.url")
    val dasServerUri = config.getString("das.server.uri")
    val dasDataUri = config.getString("das.data.server.uri")
    val dasClientId = config.getString("das.client.id")
    val dasSecret = config.getString("das.client.secret")
    val dasHost = config.getString("das.server.host")
    val scope = config.getString("das.server.scope")
    new EserviceRoutes(appRoot, appUrl, dasHost, dasServerUri, dasDataUri, dasClientId, dasSecret, scope).init()
  }

  def get(path: String, fn: (Long, Request, Response) => AnyRef) =
    Spark.get(appRoot + path, new Route {
      override def handle(request: Request, response: Response): AnyRef = {
        val context = new SparkWebContext(request, response)
        val manager = new ProfileManager[EserviceProfile](context)
        val profiles = manager.getAll(true)

        if (profiles == null || profiles.isEmpty) {
          Spark.halt(401)
          return null
        }

        Option(profiles.get(0).getPersonId()) match {
          case Some(personId) => return fn(personId, request, response)
          case None => Spark.halt(403); return null
        }


      }
    })

  def post(path: String, acceptType: String, fn: (Long, Request, Response) => AnyRef) =
    Spark.post(appRoot + path, acceptType, new Route {
      override def handle(request: Request, response: Response): AnyRef = {
        val context = new SparkWebContext(request, response)
        val manager = new ProfileManager[EserviceProfile](context)
        val profiles = manager.getAll(true)

        if (profiles == null || profiles.isEmpty) {
          Spark.halt(401)
          return null
        }

        Option(profiles.get(0).getPersonId()) match {
          case Some(personId) => return fn(personId, request, response)
          case None => Spark.halt(403); return null
        }


      }
    })
}
