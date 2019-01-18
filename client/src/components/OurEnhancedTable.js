import React from 'react';
import classNames from 'classnames';
import PropTypes, { object } from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import LinkIcon from '@material-ui/icons/Visibility';
import Fab from '@material-ui/core/Fab';
import {Link} from 'react-router-dom';
import { lighten } from '@material-ui/core/styles/colorManipulator';

let counter = 0;
function createData(desiredColumnNames, values) {
    counter += 1;
    let collection = {};
    values.forEach((item) => {
        Object.assign(collection, item);
    });
    return Object.assign(collection, { id: counter });
}

function desc(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function stableSort(array, cmp) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

function getSorting(order, orderBy) {
  return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
}

class OurEnhancedTableHead extends React.Component {
  createSortHandler = property => event => {
    this.props.onRequestSort(event, property);
  };

  render() {
    const { onSelectAllClick, order, orderBy, numSelected, rowCount, constructedCols } = this.props;
    return (
      <TableHead>
        <TableRow>
          <TableCell padding="checkbox">
            <Checkbox
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={numSelected === rowCount}
              onChange={onSelectAllClick}
            />
          </TableCell>
          {constructedCols && constructedCols.map(row => {
            return (
              <TableCell
                key={row.id}
                numeric={row.numeric}
                padding={row.disablePadding ? 'none' : 'default'}
                sortDirection={orderBy === row.id ? order : false}
              >
                <Tooltip
                  title="Sort"
                  placement={row.numeric ? 'bottom-end' : 'bottom-start'}
                  enterDelay={300}
                >
                  <TableSortLabel
                    active={orderBy === row.id}
                    direction={order}
                    onClick={this.createSortHandler(row.id)}
                  >
                    {row.label}
                  </TableSortLabel>
                </Tooltip>
              </TableCell>
            );
          }, this)}
        </TableRow>
      </TableHead>
    );
  }
}

OurEnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const toolbarStyles = theme => ({
  root: {
    paddingRight: theme.spacing.unit,
  },
  highlight:
    theme.palette.type === 'light'
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  spacer: {
    flex: '1 1 100%',
  },
  actions: {
    color: theme.palette.text.secondary,
  },
  title: {
    flex: '0 0 auto',
  },
});

let OurEnhancedTableToolbar = props => {
  const { numSelected, classes, title } = props;

  return (
    <Toolbar
      className={classNames(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      <div className={classes.title}>
        {numSelected > 0 ? (
          <Typography color="inherit" variant="subtitle1">
            {numSelected} selected
          </Typography>
        ) : (
          <Typography variant="h6" id="tableTitle">
            {title}
          </Typography>
        )}
      </div>
      <div className={classes.spacer} />
      <div className={classes.actions}>
        {numSelected > 0 && (
          <Tooltip title="Delete">
            <IconButton aria-label="Delete">
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        )}
      </div>
    </Toolbar>
  );
};

OurEnhancedTableToolbar.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
};

OurEnhancedTableToolbar = withStyles(toolbarStyles)(OurEnhancedTableToolbar);

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
  },
  table: {
    minWidth: '100%',
  },
  tableWrapper: {
    overflowX: 'auto',
  },
});

class OurEnhancedTable extends React.Component {
    constructor(props){
        super(props);
        let setDesiredColumns = [];
        if(props.desiredTableColumns && props.desiredTableColumns.length > 0){
            setDesiredColumns = props.desiredTableColumns;
        }
        let desiredColumnKeys = setDesiredColumns.map((item) => {return item.columnKey});
        let setData = [];
        console.log('props.data 1',props.data);
        if(props.data.length > 0){
            setData = this.setTableData(this.flattenData(props.data, desiredColumnKeys), setDesiredColumns);
        }
        console.log('setData 1',setData);
        this.state = {
            order: 'asc',
            orderBy: 'name',
            selected: [],
            data: setData,
            page: 0,
            rowsPerPage: 5,
            desiredTableColumns: setDesiredColumns,
            desiredColumnKeys: desiredColumnKeys,
          };
    }

    setTableData(data, setDesiredColumns){
      console.log('set table data', JSON.parse(JSON.stringify(data)));
      console.log('setDesiredColumns', setDesiredColumns);
        let desiredColumnNames = [];
        if(setDesiredColumns && setDesiredColumns.length > 0){
            //Sort desired cols by displayOrder
            setDesiredColumns.sort((a,b) => {
              if(!a.hasOwnProperty('displayOrder') || !b.hasOwnProperty('displayOrder')){
                console.error("Each column in desiredTableColumns requires the displayOrder property");
              }
              return a.displayOrder - b.displayOrder;
            });
            setDesiredColumns.forEach((item) => {
                if (item.columnKey && !item.hidden) {
                    desiredColumnNames.push(item.columnKey);
                }
            });
        }

        let returnValue = data.map((dataPoint) => {
            //Build data in the correct order based off the desiredColumnNames created above
            let returnData = [];
            desiredColumnNames.forEach((item) => {
              if(dataPoint[item] || dataPoint[item] === ""){
                returnData.push({[item]:dataPoint[item]});
              }
            });
            return createData(desiredColumnNames, [...returnData]);
        });
        return returnValue;
    }

  handleRequestSort = (event, property) => {
    const orderBy = property;
    let order = 'desc';

    if (this.state.orderBy === property && this.state.order === 'desc') {
      order = 'asc';
    }

    this.setState({ order, orderBy });
  };

  handleSelectAllClick = event => {
    if (event.target.checked) {
      this.setState(state => ({ selected: state.data.map(n => n.id) }));
      return;
    }
    this.setState({ selected: [] });
  };

  handleClick = (event, id) => {
    console.log('event',event);
    console.log('event.target', event.target);
    const { selected } = this.state;
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    this.setState({ selected: newSelected });
  };

    setRowPerPage() {
        let data = this.state.data;
        if (data.length < this.state.rowsPerPage) {
            this.setState({ rowsPerPage: data.length });
        }
    }

    componentDidMount() {
        this.setRowPerPage();
    }

    componentDidUpdate(prevProps, prevState){
      counter = 0;
      let setData = this.setTableData(this.flattenData(this.props.data, this.state.desiredColumnKeys), this.state.desiredTableColumns);
        if(prevState.data.length !== this.state.data.length){
            this.setRowPerPage();
        } else if(JSON.stringify(prevState.data) !== JSON.stringify(setData)){
          this.setState({data: setData});
        }
    }

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  flattenData = (data, columnKeys) => {
    for(const dataRow of data) {
      for(const key of columnKeys) {
        if(!dataRow[key]){
          dataRow[key] = "";
        }
      }
    }
    return data;
  }

  isSelected = id => this.state.selected.indexOf(id) !== -1;

  render() {
    const { classes, title, rowOptions } = this.props;
    const { data, order, orderBy, selected, rowsPerPage, page, desiredTableColumns } = this.state;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);
    let setRowOptions = [5];
    if(rowOptions && (rowOptions.constructor === 'Array') && (rowOptions.length > 0)){
        setRowOptions = rowOptions;
    }
    let displayData = stableSort(data, getSorting(order, orderBy)).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
    let constructedCols = [];
    let colsToType = {};
    desiredTableColumns.forEach((item) => {
      let hideZeroDataCol = true;
      for(const dataRow of displayData){
        if(dataRow[item.columnKey] || dataRow[item.columnKey] === ""){
          hideZeroDataCol = false;
        }
      }
      if(hideZeroDataCol) {
        item.hidden = true;
      }
      if (!item.hidden) {
        Object.assign(colsToType, {[item.columnKey]: item.columnType});
        constructedCols.push({ id: item.columnKey, numeric: item.numeric, disablePadding: item.disablePadding, label: item.label, type: item.columnType });
      }
      
    });
    return (
        <div>
        <OurEnhancedTableToolbar title={title} numSelected={selected.length} />
        <div className={classes.tableWrapper}>
          <Table className={classes.table} aria-labelledby="tableTitle">
            <OurEnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={this.handleSelectAllClick}
              onRequestSort={this.handleRequestSort}
              rowCount={data.length}
              constructedCols={constructedCols}
            />
            <TableBody>
              {displayData.map(tableRow => {
                  const isSelected = this.isSelected(tableRow.id);
                  return (
                    <TableRow
                      hover
                      onClick={event => this.handleClick(event, tableRow.id)}
                      role="checkbox"
                      aria-checked={isSelected}
                      tabIndex={-1}
                      key={tableRow.id}
                      selected={isSelected}
                    >
                      <TableCell padding="checkbox" style={{width: '48px'}}>
                        <Checkbox checked={isSelected} />
                      </TableCell>
                          {Object.keys(tableRow).map(item => {
                            let colType = colsToType[item];
                            if(tableRow[item] === ""){
                              return(
                                <TableCell key={item} component="td" scope="row" padding="none">  
                                </TableCell>
                              )
                            }else if(colType === 'img'){
                              return (
                                <TableCell key={item} component="td" scope="row" padding="none">
                                  <div className={'table-image'}>
                                    <img src={tableRow[item]} alt={"Cart Item"}></img>
                                  </div>
                                </TableCell>
                              );
                            }else if (colType === 'component') {
                              //Pass components in as functions that return the required components
                              return (
                                <TableCell key={item} component="td" scope="row" padding="none">
                                  {tableRow[item]()}
                                </TableCell>
                              );
                            } else if (colType === 'price') {
                                return (
                                  <TableCell key={item} component="td" scope="row" padding="none">
                                    ${tableRow[item]}
                                  </TableCell>
                                );
                            } else if (item !== 'id') {
                              return (
                                <TableCell key={item} component="td" scope="row" padding="none">
                                  {tableRow[item]}
                                </TableCell>
                              );
                            } else {
                              return null;
                            }
                          })}
                    </TableRow>        
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 49 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )} 
            </TableBody>
          </Table>
        </div>
        <TablePagination
          rowsPerPageOptions={setRowOptions}
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          backIconButtonProps={{
            'aria-label': 'Previous Page',
          }}
          nextIconButtonProps={{
            'aria-label': 'Next Page',
          }}
          onChangePage={this.handleChangePage}
          onChangeRowsPerPage={this.handleChangeRowsPerPage}
        />
        </div>
    );
  }
}

OurEnhancedTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(OurEnhancedTable);