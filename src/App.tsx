import { useEffect, useState } from 'react';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import client, { setupInterceptors } from './utils/client';
import moment from 'moment';
import { formatDecimal } from './utils/common';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import ElectricBoltIcon from '@mui/icons-material/ElectricBolt';
const columns: GridColDef[] = [
  // { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'name',
    headerName: 'Name',
    width: 150,
    editable: false,
  },
  {
    field: 'model',
    headerName: 'Model',
    width: 105,
    editable: false,
  },
  {
    field: 'voltage',
    headerName: 'Voltage',
    type: 'number',
    width: 110,
    editable: false,
    valueGetter: (params: GridValueGetterParams) =>
      `${formatDecimal(params.row.voltage) || 0}V`,
  },
  {
    field: 'current',
    headerName: 'Current',
    sortable: false,
    width: 110,
    valueGetter: (params: GridValueGetterParams) =>
      `${formatDecimal(params.row.current) || 0}A`,
  },
  {
    field: 'power_active',
    headerName: 'Power Active',
    sortable: false,
    width: 110,
    valueGetter: (params: GridValueGetterParams) =>
      `${formatDecimal(params.row.power_active, 1) || 0}W`,
  },
  {
    field: 'export_energy_active',
    headerName: 'Export Energy (Active)',
    sortable: false,
    width: 161,
    valueGetter: (params: GridValueGetterParams) =>
      `${formatDecimal(params.row.export_energy_active) || 0}kWh`,
  },
  {
    field: 'created_at',
    headerName: 'Date',
    sortable: false,
    width: 125,
    valueGetter: (params: GridValueGetterParams) =>
      `${moment(params.row.created_at).format('MMM D, YYYY')}`,
  },

  {
    field: '_',
    headerName: 'Time',
    sortable: false,
    width: 125,
    valueGetter: (params: GridValueGetterParams) =>
      `${moment(params.row.created_at).format('h:mm:ss A')}`,
  },
];

const pages = ['Dashboard', 'Pricing', 'Logs'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

const App = () => {
  const [data, setData] = useState([]);
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  useEffect(() => {
    // setupInterceptors();
    (async () => {
      const sdmDatas = await client
        .get('http://192.168.254.190:3333/fetch-details')
        .then(({ data = [] }) =>
          data.map((d: any) => ({ ...d, ...JSON.parse(d.data) }))
        )
        .catch((e) => console.log(e, 'error'));

      console.log(sdmDatas, 'test');
      setData(sdmDatas || []);
    })();
  }, []);

  return (
    <>
      <AppBar position='static'>
        <Container maxWidth='xl'>
          <Toolbar disableGutters>
            <ElectricBoltIcon
              sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }}
            />
            <Typography
              variant='h6'
              noWrap
              component='a'
              href='/'
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'Arial',
                fontWeight: 700,
                letterSpacing: '.2rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              Smart Power
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size='large'
                aria-label='account of current user'
                aria-controls='menu-appbar'
                aria-haspopup='true'
                onClick={handleOpenNavMenu}
                color='inherit'
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id='menu-appbar'
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: 'block', md: 'none' },
                }}
              >
                {pages.map((page) => (
                  <MenuItem key={page} onClick={handleCloseNavMenu}>
                    <Typography textAlign='center'>{page}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <ElectricBoltIcon
              sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }}
            />
            <Typography
              variant='h5'
              noWrap
              component='a'
              href=''
              sx={{
                mr: 2,
                display: { xs: 'flex', md: 'none' },
                flexGrow: 1,
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              LOGO
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              {pages.map((page) => (
                <Button
                  key={page}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                  {page}
                </Button>
              ))}
            </Box>

            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title='Open settings'>
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt='Daryll' src='/static/images/avatar/2.jpg' />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id='menu-appbar'
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={handleCloseUserMenu}>
                    <Typography textAlign='center'>{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      <Box sx={{ height: 600, marginTop: 5, marginLeft: 12, marginRight: 12 }}>
        <DataGrid
          rows={data}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[5]}
          checkboxSelection
          disableSelectionOnClick
          experimentalFeatures={{ newEditingApi: true }}
        />
      </Box>
    </>
  );
};

export default App;
