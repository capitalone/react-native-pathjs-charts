import _ from 'lodash';

import Pie from './charts/Pie.js';
import Tree from './charts/Tree.js';
import Radar from './charts/Radar.js';
import Bar from './charts/Bar.js';
import SmoothLine from './charts/SmoothLine.js';
import StockLine from './charts/StockLine.js';
import Scatterplot from './charts/Scatterplot.js';

export default {
    Pie:_.extend(Pie, {
        metaData: {
            settings: {
                fields: {
                    data: {type: 'plainJsonEditor'},
                    accessorKey:{type:'string'},
                    options: {
                        fields: {
                            width: {type: 'number'},
                            height: {type: 'number'},
                            margin: {type: 'boxSizeEditor'},
                            r: {type: 'number'},
                            R: {type: 'number'},
                            color: {type: 'colorPicker'},
                            legendPosition: {
                                type: 'select',
                                settings: {options: ['topLeft', 'topRight', 'bottomLeft', 'bottomRight']}
                            },
                            label: {type: 'fontEditor'},
                            animate: {
                                fields: {
                                    type: {type: 'select', settings: {options: ['delayed', 'async', 'oneByOne']}},
                                    duration: {type: 'number'},
                                    fillTransition: {type: 'number'}
                                }
                            }
                        }
                    }
                }
            }
        }
    }),
    Tree:_.extend(Tree, {
        metaData: {
            settings: {
                fields: {
                    data: {type: 'plainJsonEditor'},
                    options: {
                        fields: {
                            width: {type: 'number'},
                            height: {type: 'number'},
                            margin: {type: 'boxSizeEditor'},
                            r: {type: 'number'},
                            fill: {type: 'colorPicker'},
                            stroke: {type: 'colorPicker'},
                            label: {type: 'fontEditor'},
                            animate: {
                                fields: {
                                    type: {type: 'select', settings: {options: ['delayed', 'async', 'oneByOne']}},
                                    duration: {type: 'number'},
                                    fillTransition: {type: 'number'}
                                }
                            }
                        }
                    }
                }
            }
        }
    }),
    SmoothLine:_.extend(SmoothLine, {
        metaData: {
            settings: {
                fields: {
                    data: {type: 'plainJsonEditor'},
                    xKey:{type:'string'},
                    yKey:{type:'string'},
                    options: {
                        fields: {
                            width: {type: 'number'},
                            height: {type: 'number'},
                            margin: {type: 'boxSizeEditor'},
                            color: {type: 'colorPicker'},
                            animate: {
                                fields: {
                                    type: {type: 'select', settings: {options: ['delayed', 'async', 'oneByOne']}},
                                    duration: {type: 'number'},
                                    fillTransition: {type: 'number'}
                                }
                            }
                            ,
                            axisY: {
                                fields: {
                                    orient: {type: 'select', settings: {options: ['left', 'right']}},
                                    //tickValues: {type: 'tickValues'},
                                    label: {type: 'fontEditor'},
                                    showAxis: {type: 'boolean'},
                                    showLines: {type: 'boolean'},
                                    showLabels: {type: 'boolean'},
                                    showTicks: {type: 'boolean'},
                                    zeroAxis: {type: 'boolean'}
                                }
                            },
                            axisX: {
                                fields: {
                                    orient: {type: 'select', settings: {options: ['top', 'bottom']}},
                                    //tickValues: {type: 'tickValues'},
                                    label: {type: 'fontEditor'},
                                    showAxis: {type: 'boolean'},
                                    showLines: {type: 'boolean'},
                                    showLabels: {type: 'boolean'},
                                    showTicks: {type: 'boolean'},
                                    zeroAxis: {type: 'boolean'}
                                }
                            }
                        }
                    }
                }
            }
        }
    }),
    StockLine:_.extend(StockLine, {
        metaData: {
            settings: {
                fields: {
                    data: {type: 'plainJsonEditor'},
                    xKey:{type:'string'},
                    yKey:{type:'string'},
                    options: {
                        fields: {
                            width: {type: 'number'},
                            height: {type: 'number'},
                            margin: {type: 'boxSizeEditor'},
                            color: {type: 'colorPicker'},
                            animate: {
                                fields: {
                                    type: {type: 'select', settings: {options: ['delayed', 'async', 'oneByOne']}},
                                    duration: {type: 'number'},
                                    fillTransition: {type: 'number'}
                                }
                            },
                            axisY: {
                                fields: {
                                    orient: {type: 'select', settings: {options: ['left', 'right']}},
                                    //tickValues: {type: 'tickValues'},
                                    label: {type: 'fontEditor'},
                                    showAxis: {type: 'boolean'},
                                    showLines: {type: 'boolean'},
                                    showLabels: {type: 'boolean'},
                                    showTicks: {type: 'boolean'},
                                    zeroAxis: {type: 'boolean'}
                                }
                            },
                            axisX: {
                                fields: {
                                    orient: {type: 'select', settings: {options: ['top', 'bottom']}},
                                    //tickValues: {type: 'tickValues'},
                                    label: {type: 'fontEditor'},
                                    showAxis: {type: 'boolean'},
                                    showLines: {type: 'boolean'},
                                    showLabels: {type: 'boolean'},
                                    showTicks: {type: 'boolean'},
                                    zeroAxis: {type: 'boolean'}
                                }
                            }
                        }
                    }
                }
            }
        }
    }),
    Radar:_.extend(Radar, {
        metaData: {
            settings: {
                fields: {
                    data: {type: 'plainJsonEditor'},
                    options: {
                        fields: {
                            width: {type: 'number'},
                            height: {type: 'number'},
                            margin: {type: 'boxSizeEditor'},
                            r: {type: 'number'},
                            max: {type: 'number'},
                            fill: {type: 'colorPicker'},
                            stroke: {type: 'colorPicker'},
                            label: {type: 'fontEditor'},
                            animate: {
                                fields: {
                                    type: {type: 'select', settings: {options: ['delayed', 'async', 'oneByOne']}},
                                    duration: {type: 'number'},
                                    fillTransition: {type: 'number'}
                                }
                            }
                        }
                    }
                }
            }
        }
    }),
    Bar:_.extend(Bar, {
        metaData: {
            settings: {
                fields: {
                    data: {type: 'plainJsonEditor'},
                    accessorKey:{type:'string'},
                    options: {
                        fields: {
                            width: {type: 'number'},
                            height: {type: 'number'},
                            margin: {type: 'boxSizeEditor'},
                            gutter: {type: 'number'},
                            color: {type: 'colorPicker'},
                            animate: {
                                fields: {
                                    type: {type: 'select', settings: {options: ['delayed', 'async', 'oneByOne']}},
                                    duration: {type: 'number'},
                                    fillTransition: {type: 'number'}
                                }
                            },
                            axisY: {
                                fields: {
                                    orient: {type: 'select', settings: {options: ['left', 'right']}},
                                    //tickValues: {type: 'tickValues'},
                                    label: {type: 'fontEditor'},
                                    showAxis: {type: 'boolean'},
                                    showLines: {type: 'boolean'},
                                    showLabels: {type: 'boolean'},
                                    showTicks: {type: 'boolean'},
                                    zeroAxis: {type: 'boolean'}
                                }
                            },
                            axisX: {
                                fields: {
                                    orient: {type: 'select', settings: {options: ['top', 'bottom']}},
                                    //tickValues: {type: 'tickValues'},
                                    label: {type: 'fontEditor'},
                                    showAxis: {type: 'boolean'},
                                    showLines: {type: 'boolean'},
                                    showLabels: {type: 'boolean'},
                                    showTicks: {type: 'boolean'},
                                    zeroAxis: {type: 'boolean'}
                                }
                            }
                        }
                    }
                }
            }
        }
    }),
    Scatterplot:_.extend(Scatterplot, {
        metaData: {
            settings: {
                fields: {
                    data: {type: 'plainJsonEditor'},
                    xKey:{type:'string'},
                    yKey:{type:'string'},
                    options: {
                        fields: {
                            width: {type: 'number'},
                            height: {type: 'number'},
                            margin: {type: 'boxSizeEditor'},
                            fill: {type: 'colorPicker'},
                            stroke: {type: 'colorPicker'},
                            label: {type: 'fontEditor'},
                            animate: {
                                fields: {
                                    type: {type: 'select', settings: {options: ['delayed', 'async', 'oneByOne']}},
                                    duration: {type: 'number'},
                                    fillTransition: {type: 'number'}
                                }
                            }
                            ,
                            axisY: {
                                fields: {
                                    orient: {type: 'select', settings: {options: ['left', 'right']}},
                                    //tickValues: {type: 'tickValues'},
                                    label: {type: 'fontEditor'},
                                    showAxis: {type: 'boolean'},
                                    showLines: {type: 'boolean'},
                                    showLabels: {type: 'boolean'},
                                    showTicks: {type: 'boolean'},
                                    zeroAxis: {type: 'boolean'}
                                }
                            },
                            axisX: {
                                fields: {
                                    orient: {type: 'select', settings: {options: ['top', 'bottom']}},
                                    //tickValues: {type: 'tickValues'},
                                    label: {type: 'fontEditor'},
                                    showAxis: {type: 'boolean'},
                                    showLines: {type: 'boolean'},
                                    showLabels: {type: 'boolean'},
                                    showTicks: {type: 'boolean'},
                                    zeroAxis: {type: 'boolean'}
                                }
                            }
                        }
                    }
                }
            }
        }
    })
};
