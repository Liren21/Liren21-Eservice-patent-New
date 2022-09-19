name := "eservice-patent"

version := "1.0"

scalaVersion := "2.11.11"

val scalikejdbcV = "2.5.2"


net.virtualvoid.sbt.graph.Plugin.graphSettings

resolvers += Resolver.mavenLocal

libraryDependencies ++= Seq(
  "org.scala-lang" % "scala-reflect" % "2.11.11",
  "org.slf4j" % "slf4j-api" % "1.7.24" % "provided",
  "org.slf4j" % "jcl-over-slf4j" % "1.7.24" exclude("org.slf4j", "slf4j-api"),
  "ch.qos.logback" % "logback-classic" % "1.1.2" exclude("org.slf4j", "slf4j-api"),
  "org.scalatest" % "scalatest_2.11" % "2.2.4" % "test",
  "org.json4s" % "json4s-jackson_2.11" % "3.3.0",
  "org.scalikejdbc"   %%  "scalikejdbc"         % scalikejdbcV exclude("commons-logging", "commons-logging"),
  "org.scalikejdbc"   %%  "scalikejdbc-config"  % scalikejdbcV exclude("commons-logging", "commons-logging"),
  "oracle" % "oracle-jdbc-connector" % "10.2.0.5.0",
  "com.zaxxer" % "HikariCP" % "2.4.6" % "test",
  "com.sparkjava" % "spark-core" % "2.5.4",
  "org.pac4j" % "spark-pac4j" % "1.2.0",
  "org.pac4j" % "pac4j-oauth" % "1.9.1",
  "com.ning" % "async-http-client" % "1.9.40",
  "org.apache.poi" % "poi-ooxml" % "3.17"
)