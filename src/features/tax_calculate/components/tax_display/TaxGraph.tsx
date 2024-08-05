import { Box } from '@mui/material';
import { pieArcLabelClasses, PieChart } from '@mui/x-charts';
import { TaxGraphProps } from '../../types/CalculateTaxTypes';

function TaxGraph({ netPayPercentage, totalTaxPercentage }: TaxGraphProps) {
  return (
    <div className="tax-details-chart">
      <PieChart
        colors={['#FFF1C9', '#e34b31']}
        series={[
          {
            data: [
              { id: 1, value: netPayPercentage, label: 'Net Pay' },
              { id: 2, value: totalTaxPercentage, label: 'Total Tax' },
            ],
            outerRadius: 130,
            arcLabel: (item) => `${item.label}(${item.value} %)`,
          },
        ]}
        sx={{
          [`& .${pieArcLabelClasses.root}`]: {
            fill: 'black',
            fontSize: 14,
          },
        }}
        margin={{ right: 5 }}
        width={300}
        height={300}
        slotProps={{
          legend: {
            hidden: true,
          },
        }}
      />
      <Box display="flex" justifyContent="center" marginTop={1}>
        <Box display="flex" alignItems="center" marginRight={2}>
          <Box width={16} height={16} bgcolor="#FFF1C9" marginRight={1} />
          <div>Net Pay</div>
        </Box>
        <Box display="flex" alignItems="center">
          <Box width={16} height={16} bgcolor="#e34b31" marginRight={1} />
          <div>Total Tax</div>
        </Box>
      </Box>
    </div>
  );
}

export default TaxGraph;
