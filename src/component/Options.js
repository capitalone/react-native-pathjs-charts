export default class ChartOptions {

    constructor(props) {

        //var noDataMsg = this.props.noDataMessage || "No data available";
        //if (this.props.data === undefined) return (<span>{noDataMsg}</span>);
        this.options =  props.options || {};

        this.chartWidth = this.options.width || 400;
        this.chartHeight = this.options.height || 400;

        //margins
        //add right + left
        this.width = this.chartWidth + (this.margin.right || 0) +  (this.margin.left || 0);
        //add top + bottom
        this.height = this.chartHeight + (this.margin.top || 0) + (this.margin.bottom || 0);

    }

    get legendPosition(){ return this.options.legendPosition || 'topLeft';}
    get axisX() {return  this.options.axisX || {};}
    get axisY() {return  this.options.axisY || {};}
    get margin(){return this.options.margin || {};}
    
    get stroke(){return this.options.stroke;}
    get fill(){return this.options.fill;}
    get r(){return this.options.r;}

    get label(){return this.options.label || {};}
    get animate() {return this.options.animate || {};}
}