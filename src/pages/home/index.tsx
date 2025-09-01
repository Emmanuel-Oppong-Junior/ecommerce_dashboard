// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'
import EcommerceCongratulationsJohn from 'src/views/dashboard/ecommerce/EcommerceCongratulationsJohn'
import EcommerceStatistics from 'src/views/dashboard/ecommerce/EcommerceStatistics'
import EcommerceExpenses from 'src/views/dashboard/ecommerce/EcommerceExpenses'
import EcommerceProfit from 'src/views/dashboard/ecommerce/EcommerceProfit'
import EcommerceGeneratedLeads from 'src/views/dashboard/ecommerce/EcommerceGeneratedLeads'
import EcommerceRevenueReport from 'src/views/dashboard/ecommerce/EcommerceRevenueReport'
import EcommerceEarningReports from 'src/views/dashboard/ecommerce/EcommerceEarningReports'
import EcommercePopularProducts from 'src/views/dashboard/ecommerce/EcommercePopularProducts'
import EcommerceOrders from 'src/views/dashboard/ecommerce/EcommerceOrders'
import EcommerceTransactions from 'src/views/dashboard/ecommerce/EcommerceTransactions'
import EcommerceInvoiceTable from 'src/views/dashboard/ecommerce/EcommerceInvoiceTable'

const Home = () => {
  return (
    <ApexChartWrapper>
      <Grid container spacing={6}>
        <Grid item xs={12} md={4}>
          <EcommerceCongratulationsJohn />
        </Grid>
        <Grid item xs={12} md={8}>
          <EcommerceStatistics />
        </Grid>
        <Grid item xs={12} lg={4}>
          <Grid container spacing={6}>
            <Grid item xs={6} md={3} lg={6}>
              <EcommerceExpenses />
            </Grid>
            <Grid item xs={6} md={3} lg={6}>
              <EcommerceProfit />
            </Grid>
            <Grid item xs={12} md={6} lg={12}>
              <EcommerceGeneratedLeads />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} lg={8}>
          <EcommerceRevenueReport />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <EcommerceEarningReports />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <EcommercePopularProducts />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <EcommerceOrders />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <EcommerceTransactions />
        </Grid>
        <Grid item xs={12} lg={8}>
          <EcommerceInvoiceTable />
        </Grid>
      </Grid>
    </ApexChartWrapper>
  )
}

export default Home
