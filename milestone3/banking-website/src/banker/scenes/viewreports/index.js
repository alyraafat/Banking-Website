import { Box, useTheme, Button , IconButton , TextField } from "@mui/material";
import { Formik , Field  } from "formik";
import * as yup from "yup";
import Header from "../../components/Header";
import InputBase from "@mui/material/InputBase";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SearchIcon from "@mui/icons-material/Search";
import { tokens } from "../../../themes";
import { f1Drivers } from "../../../data/mockdata";
import { useState } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import CircularProgress from "@mui/material/CircularProgress";



const ViewReports = () => {
  const [loading , setLoading] = useState(false);  
  const [searchTerm , setSearchTerms] = useState('');
  const theme = useTheme();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const handleFormSubmit = async (values , {resetForm}) => {
    console.log("ahooo");
    setLoading(true);
    await setTimeout(() => {
      resetForm({values: ''});
      setLoading(false)
    } , 2000);
  };
  const colors = tokens(theme.palette.mode);
  const onChange = (event) => {
    setSearchTerms(event.target.value);
  };
  const filteredArray = f1Drivers.filter((driver) => {
    return driver.bankAccount.toLowerCase().includes(searchTerm.toLowerCase());
  });
  const mappedArray = filteredArray.map((character , i)=>{
    return (
        <Accordion key = {i} >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.greenAccent[500]} variant="h3">
            {character.name}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
        <Typography variant="h5" color={colors.grey[100]}>
            {`Bank Account ID: ${character.bankAccount}`}
          </Typography>
          <Typography variant="h5" color={colors.grey[100]}>
            {`Email: ${character.email}`}
          </Typography>
          <Typography variant="h5" color={colors.grey[100]}>
            {`Phone Number: ${character.phoneNumber}`}
          </Typography>
          <Typography variant="h5" color={colors.grey[100]}>
            {`Complaint: ${character.complaint}`}
          </Typography>
          <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={checkoutSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => {
          // setName(values.accountName);
          return (
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              m = "10px"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Message"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.message}
                name="message"
                error={!!touched.message && !!errors.message}
                helperText={touched.message && errors.message}
                sx={{ gridColumn: "span 4"}}
              />
            </Box>
            <Box display="flex" justifyContent="end" mt="20px" m = "10px">
            <Box m = "5px">
            {loading ? <CircularProgress color="secondary" /> : <Button type="submit" color="secondary" variant="contained">
                Send
              </Button>}
            </Box>
            <Box m = "5px">
            <Button color="secondary" variant="contained">
                Delegate to Superior
              </Button>
            </Box>
            <Box m = "5px">
            <Button color="secondary" variant="contained">
                Delegate to Admin
              </Button>
            </Box>
            <Box m = "5px">
            <Button  color="error" variant="contained">
                Reject
              </Button>
            </Box>
        </Box>
          </form>
          
        )}
        }
      </Formik>
        </AccordionDetails>
      </Accordion>
    );
  });
  return (
    <Box m="20px">
      <Header title="Customer Reports" subtitle="View Complains and Reports submitted by customers and Deal with them" />
      <Box display="flex" 
        backgroundColor = {colors.primary[400]}
         borderRadius="3px"
         m = "4px 0px 20px 0px"
         >
            <InputBase value={searchTerm} onChange={onChange} sx ={{ml:2 , flex:1}}/>
            <IconButton type = "button" sx={{p:1}}>
                <SearchIcon />
            </IconButton>
            {/* <Typography variant="h3" color={colors.grey[100]}>
                    The GUC Bank Banker's Admin Panel
              </Typography> */}
         </Box>
      {mappedArray}
    </Box>
  );
};
const checkoutSchema = yup.object().shape({
  message: yup.string().required("required"),

});
const initialValues = {
  message:"",

};


export default ViewReports;
