using FastReport;
using FastReport.Export.Image;
using FastReport.Export.Pdf;
using FastReport.Utils;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Script.Services;
using System.Web.Services;

namespace vshapeup.com
{
    /// <summary>
    /// Summary description for VShapeUpService
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    [System.Web.Script.Services.ScriptService]
    public class VShapeUpService : System.Web.Services.WebService
    {
        private string PREFIX = VShapeUpService.GetActiveOPP().RegisterPrefix;
        private byte OPPNo = VShapeUpService.GetActiveOPP().OPPNo;

        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string Login(string username, string password)
        {
            using (VShapeUpDataContext _context = new VShapeUpDataContext())
            {
                var ret = _context.Users.Where(u => u.UserNo == username && u.Password == password).ToList();
                return JsonConvert.SerializeObject(ret, Formatting.None);
            }
        }

        private string RunningNo(string DocType, string Month, string Year)
        {
            var context = new VShapeUpDataContext();
            try
            {
                string Docno = string.Empty;

                var ListIndexMaster = (from tmpIndexMaster in context.IndexMasters
                                       where tmpIndexMaster.DocSeries == DocType
                                       && tmpIndexMaster.Docyear == Year
                                       && tmpIndexMaster.Docmonth == Month
                                       select tmpIndexMaster).ToList();
                DataTable dtIndemaSter = ListIndexMaster.ToDataTable();

                if (dtIndemaSter.Rows.Count == 0)
                {
                    IndexMaster InMasTer = new IndexMaster();
                    InMasTer.DocSeries = DocType;
                    InMasTer.DocNo = 0;
                    InMasTer.DocLen = 3;
                    InMasTer.Docyear = Year;
                    InMasTer.Docmonth = Month;
                    context.IndexMasters.InsertOnSubmit(InMasTer);
                    context.SubmitChanges();
                    var ListIndexMaster2 = (from tmpIndexMaster in context.IndexMasters
                                            where tmpIndexMaster.DocSeries == DocType
                                            && tmpIndexMaster.Docyear == Year
                                            && tmpIndexMaster.Docmonth == Month
                                            select tmpIndexMaster).ToList();
                    DataTable dtIndemaSter2 = ListIndexMaster2.ToDataTable();

                    string RunNo = dtIndemaSter2.Rows[0]["DocNo"].ToString();
                    string year = dtIndemaSter2.Rows[0]["Docyear"].ToString();
                    string month = dtIndemaSter2.Rows[0]["Docmonth"].ToString();
                    string tmpRunNo = (Convert.ToInt32(RunNo) + 1).ToString();
                    while (tmpRunNo.Length < Convert.ToInt32(dtIndemaSter2.Rows[0]["DocLen"]))
                    {
                        tmpRunNo = "0" + tmpRunNo;
                    }
                    Docno = tmpRunNo;
                    //Docno = DocType + year + month + tmpRunNo;
                    // UpdateIndexMasTer(Convert.ToInt32(tmpRunNo), DocType, Month, Year);
                }
                else
                {

                    string RunNo = dtIndemaSter.Rows[0]["DocNo"].ToString();
                    string year = dtIndemaSter.Rows[0]["Docyear"].ToString();
                    string month = dtIndemaSter.Rows[0]["Docmonth"].ToString();
                    string tmpRunNo = (Convert.ToInt32(RunNo) + 1).ToString();
                    while (tmpRunNo.Length < Convert.ToInt32(dtIndemaSter.Rows[0]["DocLen"]))
                    {
                        tmpRunNo = "0" + tmpRunNo;
                    }
                    Docno = tmpRunNo;
                    //Docno = DocType + year + month + tmpRunNo;
                    //UpdateIndexMasTer(Convert.ToInt32(tmpRunNo), DocType, Month, Year);
                }

                return Docno;
            }
            catch (Exception ex)
            {
                throw ex;
            }
            finally
            {
                if (context != null)
                {
                    context.Dispose();
                }

            }
        }

        private void UpdateIndexMasTer(int No, string DocType, string Month, string Year)
        {
            var context = new VShapeUpDataContext();
            try
            {

                var ListInMaster = (from tmpInMaster in context.IndexMasters
                                    where tmpInMaster.DocSeries == DocType
                                    && tmpInMaster.Docyear == Year
                                    && tmpInMaster.Docmonth == Month
                                    select tmpInMaster).FirstOrDefault();
                if (ListInMaster != null)
                {
                    ListInMaster.DocNo = No;
                    context.SubmitChanges();
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
            finally
            {
                if (context != null)
                {
                    context.Dispose();
                }
            }

        }

        private static OPPData GetActiveOPP()
        {
            using (VShapeUpDataContext context = new VShapeUpDataContext())
            {
                var ret = from x in context.OPPDatas
                          where x.Active == true
                          select x;
                return ret.FirstOrDefault();
            }
        }

        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string GetOPP()
        {
            using (VShapeUpDataContext _ctx = new VShapeUpDataContext())
            {
                var ret = from x in _ctx.OPPDatas
                          orderby x.OPPNo descending
                          select x;

                return JsonConvert.SerializeObject(ret.ToList(), Formatting.None, new JsonSerializerSettings()
                {
                    ReferenceLoopHandling = ReferenceLoopHandling.Ignore
                });
            }
        }

        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string GetResultPage(string userNo)
        {
            using (VShapeUpDataContext _contex = new VShapeUpDataContext())
            {
                var ret = from x in _contex.V_ChallengeResult_Reports
                          where x.UserNo == userNo
                          select new
                          {
                              PageNo = x.Page
                          };

                return JsonConvert.SerializeObject(ret.ToList(), Formatting.None, new JsonSerializerSettings()
                {
                    ReferenceLoopHandling = ReferenceLoopHandling.Ignore
                });
            }
        }

        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string GetChallenger(string userNo)
        {
            using (VShapeUpDataContext _contex = new VShapeUpDataContext())
            {
                var ret = from x in _contex.Challengers
                          where x.UserNo == userNo
                          select x;

                return JsonConvert.SerializeObject(ret.FirstOrDefault(), Formatting.None, new JsonSerializerSettings()
                {
                    ReferenceLoopHandling = ReferenceLoopHandling.Ignore
                });
            }
        }

        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string InsertChallenger(Challenger challenger, BodyComposition compo, byte oppNo)
        {
            try
            {
                using (VShapeUpDataContext _ctx = new VShapeUpDataContext())
                {
                    string runNo = RunningNo(PREFIX, "", "");
                    string docNo = PREFIX + runNo;
                    UpdateIndexMasTer(Convert.ToInt32(runNo), PREFIX, "", "");
                    challenger.UserNo = docNo;
                    challenger.LastName = "";
                    challenger.NickName = "";
                    challenger.IsChanllenge = false;
                    challenger.CreatedAt = DateTime.Now;
                    //compo.MeasureDate = DateTime.Now.Date;
                    challenger.OOP = oppNo;
                    challenger.BodyCompositions.Add(compo);
                    _ctx.Challengers.InsertOnSubmit(challenger);
                    _ctx.SubmitChanges();

                    return docNo;
                }
            }
            catch
            {

                return "FAILED";
            }
        }

        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string EditChallenger(Challenger challenger)
        {
            try
            {
                using (VShapeUpDataContext _ctx = new VShapeUpDataContext())
                {
                    var del = from x in _ctx.Challengers
                              where x.UserNo == challenger.UserNo
                              select x;

                    _ctx.Challengers.DeleteOnSubmit(del.FirstOrDefault());
                    _ctx.SubmitChanges();

                    //challenger.BodyCompositions.Clear();
                    //challenger.BodyCompositions.Add(compo);
                    challenger.LastName = "";
                    challenger.NickName = "";
                    challenger.IsChanllenge = false;
                    _ctx.Challengers.InsertOnSubmit(challenger);
                    _ctx.SubmitChanges();


                    return "OK";
                }
            }
            catch (Exception ex)
            {

                //return "FAILED";
                return ex.Message;
            }
        }

        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string AddCompo(string userNo, BodyComposition compo)
        {
            try
            {
                using (VShapeUpDataContext _ctx = new VShapeUpDataContext())
                {
                    var challenger = (from x in _ctx.Challengers
                                      where x.UserNo == userNo
                                      select x).FirstOrDefault();

                    //challenger.BodyCompositions.Clear();
                    //compo.MeasureDate = DateTime.Now.Date;
                    challenger.BodyCompositions.Add(compo);
                    //_ctx.Challengers.InsertOnSubmit(challenger);
                    _ctx.SubmitChanges();

                    return "OK";
                }
            }
            catch (Exception ex)
            {

                //return "FAILED";
                return ex.Message;
            }
        }

        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string DeleteCompo(string userNo, DateTime measureDate)
        {
            try
            {
                using (VShapeUpDataContext _ctx = new VShapeUpDataContext())
                {
                    var del = (from x in _ctx.BodyCompositions
                                      where x.UserNo == userNo && x.MeasureDate == measureDate
                                      select x).FirstOrDefault();

                    _ctx.BodyCompositions.DeleteOnSubmit(del);
                    _ctx.SubmitChanges();

                    return "OK";
                }
            }
            catch (Exception ex)
            {

                //return "FAILED";
                return ex.Message;
            }
        }

        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public byte[] PrintResult(string userNo,int page)
        {
            try
            {
                Config.WebMode = true;
                Report rep = new Report();
                rep.Load(Server.MapPath("~/App_Data/rptResult.frx"));

                using (VShapeUpDataContext _context = new VShapeUpDataContext())
                {
                    var data = (from x in _context.V_ChallengeResult_Reports
                                where x.UserNo == userNo && x.Page == page
                                select x).ToList().ToDataTable();

                    rep.RegisterData(data, "Report");
                    DataBand band = rep.FindObject("Data") as DataBand;
                    band.DataSource = rep.GetDataSource("Report");

                }

                if (rep.Report.Prepare())
                {
                    //PDFExport pdfExport = new PDFExport();
                    //pdfExport.ShowProgress = false;
                    //pdfExport.Compressed = true;
                    //pdfExport.AllowPrint = true;
                    //pdfExport.EmbeddingFonts = true;

                    //MemoryStream strm = new MemoryStream();
                    //rep.Report.Export(pdfExport, strm);
                    //rep.Dispose();
                    //pdfExport.Dispose();
                    //strm.Position = 0;

                    //return strm.ToArray();


                    ImageExport export = new ImageExport();
                    MemoryStream strm = new MemoryStream();
                    rep.Report.Export(export, strm);
                    rep.Dispose();
                    export.Dispose();
                    strm.Position = 0;

                    return strm.ToArray();
                }
                else
                {
                    return null;
                }
            }
            catch (Exception ex)
            {
                return null;
            }

        }

        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public byte[] PrintResultPDF(string userNo)
        {
            try
            {
                Config.WebMode = true;
                Report rep = new Report();
                rep.Load(Server.MapPath("~/App_Data/rptResult.frx"));

                using (VShapeUpDataContext _context = new VShapeUpDataContext())
                {
                    var data = (from x in _context.V_ChallengeResult_Reports
                                where x.UserNo == userNo
                                select x).ToList().ToDataTable();

                    rep.RegisterData(data, "Report");
                    DataBand band = rep.FindObject("Data") as DataBand;
                    band.DataSource = rep.GetDataSource("Report");

                }

                if (rep.Report.Prepare())
                {
                    PDFExport pdfExport = new PDFExport();
                    pdfExport.ShowProgress = false;
                    pdfExport.Compressed = true;
                    pdfExport.AllowPrint = true;
                    pdfExport.EmbeddingFonts = true;

                    MemoryStream strm = new MemoryStream();
                    rep.Report.Export(pdfExport, strm);
                    rep.Dispose();
                    pdfExport.Dispose();
                    strm.Position = 0;

                    return strm.ToArray();


                    //ImageExport export = new ImageExport();
                    //MemoryStream strm = new MemoryStream();
                    //rep.Report.Export(export, strm);
                    //rep.Dispose();
                    //export.Dispose();
                    //strm.Position = 0;

                    //return strm.ToArray();
                }
                else
                {
                    return null;
                }
            }
            catch (Exception ex)
            {
                return null;
            }

        }

        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string GetAllChallenger(byte oppNo)
        {
            using (VShapeUpDataContext _contex = new VShapeUpDataContext())
            {
                var ret = from x in _contex.Challengers
                          where x.OOP == oppNo
                          orderby x.UserNo descending
                          select x;

                return JsonConvert.SerializeObject(ret.ToList(), Formatting.None, new JsonSerializerSettings()
                {
                    ReferenceLoopHandling = ReferenceLoopHandling.Ignore
                });
            }
        }

        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string GetCompleteChallenger(byte oppNo)
        {
            using (VShapeUpDataContext _contex = new VShapeUpDataContext())
            {
                var ret = from x in _contex.Challengers
                          where x.OOP == oppNo && x.IsChanllenge == true && x.IsComplete == true
                          orderby x.UserNo descending
                          select x;

                return JsonConvert.SerializeObject(ret.ToList(), Formatting.None, new JsonSerializerSettings()
                {
                    ReferenceLoopHandling = ReferenceLoopHandling.Ignore
                });
            }
        }

        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string GetInCompleteChallenger(byte oppNo)
        {
            using (VShapeUpDataContext _contex = new VShapeUpDataContext())
            {
                var ret = from x in _contex.Challengers
                          where x.OOP == oppNo && x.IsChanllenge == true && x.IsComplete == false
                          orderby x.UserNo descending
                          select x;

                return JsonConvert.SerializeObject(ret.ToList(), Formatting.None, new JsonSerializerSettings()
                {
                    ReferenceLoopHandling = ReferenceLoopHandling.Ignore
                });
            }
        }

        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string GetRegisterChallenger(byte oppNo)
        {
            using (VShapeUpDataContext _contex = new VShapeUpDataContext())
            {
                var ret = from x in _contex.Challengers
                          where x.IsChanllenge == true && x.OOP == oppNo
                          orderby x.UserNo descending
                          select x;

                return JsonConvert.SerializeObject(ret.ToList(), Formatting.None, new JsonSerializerSettings()
                {
                    ReferenceLoopHandling = ReferenceLoopHandling.Ignore
                });
            }
        }

        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public byte[] PrintAllResult()
        {
            try
            {
                Config.WebMode = true;
                Report rep = new Report();
                rep.Load(Server.MapPath("~/App_Data/rptResult.frx"));

                using (VShapeUpDataContext _context = new VShapeUpDataContext())
                {
                    var data = (from x in _context.V_ChallengeResult_Reports
                                select x).ToList().ToDataTable();

                    rep.RegisterData(data, "Report");
                    DataBand band = rep.FindObject("Data") as DataBand;
                    band.DataSource = rep.GetDataSource("Report");
                    band.Sort.Add(new Sort("[ReportData.UserNo]"));
                    band.Sort.Add(new Sort("[ReportData.Page]"));

                }

                if (rep.Report.Prepare())
                {
                    ImageExport export = new ImageExport();
                    MemoryStream strm = new MemoryStream();
                    rep.Report.Export(export, strm);
                    rep.Dispose();
                    export.Dispose();
                    strm.Position = 0;

                    return strm.ToArray();
                }
                else
                {
                    return null;
                }
            }
            catch (Exception ex)
            {
                return null;
            }

        }

        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public byte[] PrintAllChallenger()
        {
            try
            {
                Config.WebMode = true;
                Report rep = new Report();
                rep.Load(Server.MapPath("~/App_Data/rptResult.frx"));

                using (VShapeUpDataContext _context = new VShapeUpDataContext())
                {
                    var data = (from x in _context.V_RegisterChallengeResult_Reports
                                select x).ToList().ToDataTable();

                    rep.RegisterData(data, "Report");
                    DataBand band = rep.FindObject("Data") as DataBand;
                    band.DataSource = rep.GetDataSource("Report");
                    band.Sort.Add(new Sort("[ReportData.UserNo]"));
                    band.Sort.Add(new Sort("[ReportData.Page]"));

                }

                if (rep.Report.Prepare())
                {
                    ImageExport export = new ImageExport();
                    MemoryStream strm = new MemoryStream();
                    rep.Report.Export(export, strm);
                    rep.Dispose();
                    export.Dispose();
                    strm.Position = 0;

                    return strm.ToArray();
                }
                else
                {
                    return null;
                }
            }
            catch (Exception ex)
            {
                return null;
            }

        }

        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string SetToChallenge(string userNo)
        {
            try
            {
                using (VShapeUpDataContext _ctx = new VShapeUpDataContext())
                {
                    var user = (from x in _ctx.Challengers
                                where x.UserNo == userNo
                                select x).FirstOrDefault();

                    user.IsChanllenge = true;
                    _ctx.SubmitChanges();

                    return "OK";
                }
            }
            catch
            {

                return "FAILED";
            }
        }

        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string SetToUnChallenge(string userNo)
        {
            try
            {
                using (VShapeUpDataContext _ctx = new VShapeUpDataContext())
                {
                    var user = (from x in _ctx.Challengers
                                where x.UserNo == userNo
                                select x).FirstOrDefault();

                    user.IsChanllenge = false;
                    _ctx.SubmitChanges();

                    return "OK";
                }
            }
            catch
            {

                return "FAILED";
            }
        }

        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string SetToComplete(string userNo)
        {
            try
            {
                using (VShapeUpDataContext _ctx = new VShapeUpDataContext())
                {
                    var user = (from x in _ctx.Challengers
                                where x.UserNo == userNo
                                select x).FirstOrDefault();

                    user.IsComplete = true;
                    _ctx.SubmitChanges();

                    return "OK";
                }
            }
            catch
            {

                return "FAILED";
            }
        }

        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string SetToInComplete(string userNo)
        {
            try
            {
                using (VShapeUpDataContext _ctx = new VShapeUpDataContext())
                {
                    var user = (from x in _ctx.Challengers
                                where x.UserNo == userNo
                                select x).FirstOrDefault();

                    user.IsComplete = false;
                    _ctx.SubmitChanges();

                    return "OK";
                }
            }
            catch
            {

                return "FAILED";
            }
        }
    }
}
