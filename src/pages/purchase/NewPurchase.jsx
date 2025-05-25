import React, { useState } from 'react';
import {
  Box, Paper, Typography, TextField, Button, Grid, MenuItem, InputAdornment, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, ToggleButton, ToggleButtonGroup, Divider, Alert
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import SettingsIcon from '@mui/icons-material/Settings';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import Autocomplete from '@mui/material/Autocomplete';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import Tooltip from '@mui/material/Tooltip';
import Menu from '@mui/material/Menu';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import EmailIcon from '@mui/icons-material/Email';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import PaymentIcon from '@mui/icons-material/Payment';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import Switch from '@mui/material/Switch';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import CloseIcon from '@mui/icons-material/Close';
import GoogleIcon from '@mui/icons-material/Google';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Popover from '@mui/material/Popover';

const distributors = [
  { label: 'ABC Distributors', gstin: '27ABCDE1234F1Z5' },
  { label: 'XYZ Pharma', gstin: '27XYZDE5678G2H6' },
  { label: 'MediCare Pvt Ltd', gstin: '27MEDICARE1234F1Z5' },
  { label: 'HealthFirst', gstin: '27HEALTH1234F1Z5' },
  { label: 'Grantrail Wholesale Pvt. Ltd.', gstin: 'GSTIN01231231321' },
];
const owners = [
  { label: 'Main Store' },
  { label: 'Branch 1' },
];
const pos = [
  { label: 'PO-1001' },
  { label: 'PO-1002' },
];

const sampleItems = [
  { id: 1, name: 'Paracetamol 500mg', batch: 'B1', expiry: '12/25', mrp: 20, ptr: 15, qty: 0, freeQty: 0, disc: 0, base: 0, gst: 5, amount: 0 },
  { id: 2, name: 'Amoxicillin 250mg', batch: 'B2', expiry: '11/24', mrp: 50, ptr: 40, qty: 0, freeQty: 0, disc: 0, base: 0, gst: 12, amount: 0 },
];

const NewPurchase = () => {
  const [distributor, setDistributor] = useState(null);
  const [owner, setOwner] = useState('');
  const [po, setPo] = useState('');
  const [creditMode, setCreditMode] = useState('cash');
  const [billDate, setBillDate] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [invoiceNo, setInvoiceNo] = useState('');
  const [orderNo, setOrderNo] = useState('');
  const [itemSearch, setItemSearch] = useState('');
  const [items, setItems] = useState([]);
  const [showUpload, setShowUpload] = useState(false);
  const [statusMsg, setStatusMsg] = useState('No CN Adjusted');
  const [videoGuideOpen, setVideoGuideOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [orderType, setOrderType] = useState('invoice');
  const [withGst, setWithGst] = useState('yes');
  const [purchaseOn, setPurchaseOn] = useState('ptr');
  const [gmailOpen, setGmailOpen] = useState(false);
  const [lifa, setLifa] = useState(true);
  const [lila, setLila] = useState(false);
  const [popoverAnchor, setPopoverAnchor] = useState(null);
  const [popoverField, setPopoverField] = useState('');
  const [commonValue, setCommonValue] = useState('');
  const [editingIdx, setEditingIdx] = useState(null);

  // Mock: Add item from search
  const handleAddItem = () => {
    if (itemSearch) {
      const found = sampleItems.find(i => i.name.toLowerCase().includes(itemSearch.toLowerCase()));
      if (found) setItems([...items, { ...found, qty: 1 }]);
      setItemSearch('');
    }
  };

  // Mock: Save handler
  const handleSave = () => {
    setStatusMsg('Purchase bill saved!');
  };

  // Totals
  const totalQty = items.reduce((sum, i) => sum + Number(i.qty), 0);
  const totalItems = items.length;
  const margin = 0; // Placeholder
  const gst = items.reduce((sum, i) => sum + (i.amount * (i.gst / 100)), 0);
  const net = items.reduce((sum, i) => sum + Number(i.amount), 0);

  const isExpiring = (expiry) => {
    if (!expiry) return false;
    // expiry format: MM/YY
    const [mm, yy] = expiry.split('/');
    if (!mm || !yy) return false;
    const expDate = new Date(`20${yy}`, Number(mm) - 1, 1);
    const now = new Date();
    const sixMonths = new Date(now.getFullYear(), now.getMonth() + 6, 1);
    return expDate < sixMonths;
  };

  return (
    <Box sx={{ p: 0, background: '#f7fafd', minHeight: '100vh', position: 'relative' }}>
      {/* Settings Icon - top right, outside card */}
      <IconButton color="primary" onClick={() => setSettingsOpen(true)} sx={{ position: 'absolute', top: 16, right: 24, zIndex: 10 }}>
        <SettingsIcon />
      </IconButton>
      {/* Top Row: All controls in a single horizontal flex row */}
      <Box sx={{ display: 'flex', alignItems: 'center', px: 2, py: 1, borderRadius: 2, boxShadow: 0, background: '#fff', mb: 2, gap: 2 }}>
        {/* Distributor with Emails button as InputAdornment */}
        <Tooltip title="Select distributor" arrow>
          <Box sx={{ minWidth: 260 }}>
            <Autocomplete
              options={distributors}
              getOptionLabel={option => `${option.label} (${option.gstin})`}
              value={distributor}
              onChange={(_, value) => setDistributor(value)}
              renderInput={params => (
                <TextField
                  {...params}
                  label="Distributor"
                  placeholder="Search Distributor By Name or GSTIN"
                  size="small"
                  InputProps={{
                    ...params.InputProps,
                    endAdornment: (
                      <>
                        <InputAdornment position="end">
                          <Button variant="contained" color="info" startIcon={<EmailIcon />} sx={{ minWidth: 80, borderRadius: 3, fontWeight: 500, ml: 1, boxShadow: 0 }} onClick={() => setGmailOpen(true)}>
                            Emails
                          </Button>
                        </InputAdornment>
                        {params.InputProps.endAdornment}
                      </>
                    )
                  }}
                />
              )}
              isOptionEqualToValue={(option, value) => option.gstin === value?.gstin}
            />
          </Box>
        </Tooltip>
        <TextField label="Bill No. / Order No." size="small" sx={{ minWidth: 160 }} />
        <Tooltip title="Fetch purchase details" arrow>
          <Button variant="outlined" startIcon={<SearchIcon />} size="small" sx={{ minWidth: 90, borderRadius: 3, fontWeight: 500 }} disabled>Fetch</Button>
        </Tooltip>
        <Tooltip title="Attach PO" arrow>
          <TextField select label="PO/s" size="small" sx={{ minWidth: 120 }} value={po} onChange={e => setPo(e.target.value)}>
            {pos.map(p => <MenuItem key={p.label} value={p.label}>{p.label}</MenuItem>)}
          </TextField>
        </Tooltip>
        <Tooltip title="Select owner/store" arrow>
          <TextField select label="Owner" size="small" sx={{ minWidth: 120 }} value={owner} onChange={e => setOwner(e.target.value)}>
            {owners.map(o => <MenuItem key={o.label} value={o.label}>{o.label}</MenuItem>)}
          </TextField>
        </Tooltip>
        <Tooltip title="Select bill date" arrow>
          <TextField label="Bill Date" type="date" size="small" value={billDate} onChange={e => setBillDate(e.target.value)} InputLabelProps={{ shrink: true }} sx={{ minWidth: 140 }} InputProps={{ endAdornment: <CalendarTodayIcon fontSize="small" color="action" /> }} />
        </Tooltip>
        <Tooltip title="Select due date" arrow>
          <TextField label="Due Date" type="date" size="small" value={dueDate} onChange={e => setDueDate(e.target.value)} InputLabelProps={{ shrink: true }} sx={{ minWidth: 140 }} InputProps={{ endAdornment: <CalendarTodayIcon fontSize="small" color="action" /> }} />
        </Tooltip>
        {/* Payment Mode Dropdown */}
        <Tooltip title="Select payment type" arrow>
          <Box>
            <Button
              variant="outlined"
              color={creditMode === 'credit' ? 'error' : 'primary'}
              endIcon={<ArrowDropDownIcon />}
              onClick={e => setAnchorEl(e.currentTarget)}
              sx={{ minWidth: 120, borderRadius: 3, fontWeight: 500 }}
            >
              {creditMode === 'credit' ? <CreditCardIcon fontSize="small" sx={{ mr: 1 }} /> : <AccountBalanceWalletIcon fontSize="small" sx={{ mr: 1 }} />}
              {creditMode.charAt(0).toUpperCase() + creditMode.slice(1)}
            </Button>
            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => setAnchorEl(null)}>
              <MenuItem onClick={() => { setCreditMode('cash'); setAnchorEl(null); }}><AccountBalanceWalletIcon fontSize="small" sx={{ mr: 1 }} />Cash</MenuItem>
              <MenuItem onClick={() => { setCreditMode('credit'); setAnchorEl(null); }}><CreditCardIcon fontSize="small" sx={{ mr: 1 }} />Credit</MenuItem>
              <MenuItem onClick={() => { setCreditMode('upi'); setAnchorEl(null); }}><PaymentIcon fontSize="small" sx={{ mr: 1 }} />UPI</MenuItem>
              <MenuItem onClick={() => { setCreditMode('cheque'); setAnchorEl(null); }}><AccountBalanceIcon fontSize="small" sx={{ mr: 1 }} />Cheque</MenuItem>
            </Menu>
          </Box>
        </Tooltip>
        <Tooltip title="Save purchase bill" arrow>
          <Button variant="contained" color="primary" sx={{ minWidth: 100, borderRadius: 3, fontWeight: 500 }} startIcon={<UploadFileIcon />} onClick={handleSave}>Save</Button>
        </Tooltip>
      </Box>
      {/* Item Search & Table Header Row */}
      <Box sx={{ background: '#e3f2fd', px: 2, py: 1, borderRadius: 2, mb: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <SearchIcon color="primary" />
          <TextField
            variant="standard"
            placeholder="Search item here. (e.g 'gly' or 'g+99' or '8908009149206' or 'c,paracetamol')"
            value={itemSearch}
            onChange={e => setItemSearch(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleAddItem()}
            autoFocus
            sx={{ flex: 1, background: 'transparent', border: 'none', fontWeight: 500, fontSize: 16 }}
            InputProps={{ disableUnderline: true }}
          />
        </Box>
        {/* Table Header */}
        <Box sx={{ display: 'flex', alignItems: 'center', mt: 2, pb: 1, borderBottom: '1px solid #bbdefb' }}>
          <Box sx={{ flex: 2, fontWeight: 600 }}>Item Name</Box>
          <Box sx={{ display: 'flex', alignItems: 'center', mx: 1 }}>
            <Typography>LIFA</Typography>
            <Switch size="small" checked={lifa} onChange={() => setLifa(!lifa)} />
            <Typography>LILA</Typography>
            <Switch size="small" checked={lila} onChange={() => setLila(!lila)} />
          </Box>
          <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Typography>Batch</Typography>
            <IconButton size="small" onClick={e => { setPopoverAnchor(e.currentTarget); setPopoverField('batch'); }}><EditIcon fontSize="small" /></IconButton>
          </Box>
          <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Typography>Expiry</Typography>
            <IconButton size="small" onClick={e => { setPopoverAnchor(e.currentTarget); setPopoverField('expiry'); }}><EditIcon fontSize="small" /></IconButton>
          </Box>
          <Box sx={{ flex: 1, textAlign: 'center' }}>MRP</Box>
          <Box sx={{ flex: 1, textAlign: 'center' }}>PTR</Box>
          <Box sx={{ flex: 1, textAlign: 'center' }}>Qty.</Box>
          <Box sx={{ flex: 1, textAlign: 'center' }}>Free</Box>
          <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Typography>Sch. Amt</Typography>
            <IconButton size="small" onClick={e => { setPopoverAnchor(e.currentTarget); setPopoverField('schamt'); }}><EditIcon fontSize="small" /></IconButton>
          </Box>
          <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Typography>Disc%</Typography>
            <IconButton size="small" onClick={e => { setPopoverAnchor(e.currentTarget); setPopoverField('disc'); }}><EditIcon fontSize="small" /></IconButton>
          </Box>
          <Box sx={{ flex: 1, textAlign: 'center' }}>Base</Box>
          <Box sx={{ flex: 1, textAlign: 'center' }}>GST%</Box>
          <Box sx={{ flex: 1, textAlign: 'center' }}>Amount</Box>
          <Box sx={{ flex: 1, textAlign: 'center' }}></Box>
        </Box>
        {/* Popover for common value */}
        <Popover open={Boolean(popoverAnchor)} anchorEl={popoverAnchor} onClose={() => setPopoverAnchor(null)} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} transformOrigin={{ vertical: 'top', horizontal: 'center' }}>
          <Box sx={{ p: 2, minWidth: 180 }}>
            <Typography sx={{ mb: 1, fontWeight: 500 }}>Common {popoverField.charAt(0).toUpperCase() + popoverField.slice(1)}</Typography>
            <TextField
              size="small"
              placeholder={popoverField === 'expiry' ? 'MM/YY' : ''}
              value={commonValue}
              onChange={e => setCommonValue(e.target.value)}
              sx={{ mb: 2 }}
            />
            <Button variant="contained" size="small" onClick={() => { setPopoverAnchor(null); setCommonValue(''); }}>Add</Button>
          </Box>
        </Popover>
      </Box>
      {/* Warning Banner */}
      {items.some(item => isExpiring(item.expiry)) && (
        <Box sx={{ width: '100%', bgcolor: '#d32f2f', color: '#fff', textAlign: 'center', py: 1, fontWeight: 600, fontSize: 18, mb: 1 }}>
          This Purchase Bill contains Expired/will be Expiring in 6 months item(s)
        </Box>
      )}
      {/* Table and item rows */}
      <Box sx={{ px: 2 }}>
        {items.length === 0 ? (
          <Box sx={{ textAlign: 'center', py: 6, color: 'text.secondary', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Box sx={{ border: '2px dashed #90caf9', borderRadius: 3, p: 4, mb: 3, width: 340, bgcolor: '#f8fafc' }}>
              <Box sx={{ fontSize: 40, color: '#1976d2', mb: 2 }}>⤓</Box>
              <Typography sx={{ mb: 2 }}>Add items one by one<br />or<br />Just import Purchase Bill (csv),<br />We will list down all items for you.</Typography>
              <Button variant="contained" color="primary" sx={{ fontWeight: 600, borderRadius: 2 }}>+ Upload CSV</Button>
            </Box>
            <img src="https://cdni.iconscout.com/illustration/premium/thumb/no-data-9436076-7705827.png" alt="No data" style={{ width: 120, marginBottom: 16 }} />
            <Typography variant="h6">Search item to begin adding.</Typography>
            <Box sx={{ mt: 2 }}>
              <a href="#" style={{ color: '#1976d2', textDecoration: 'underline', fontWeight: 500 }}>Video : Don't enter purchase manually <span role="img" aria-label="youtube">▶️</span></a>
            </Box>
          </Box>
        ) : (
          items.map((item, idx) => (
            editingIdx === idx ? (
              <Box key={item.id} sx={{ display: 'flex', alignItems: 'center', background: '#e3f2fd', borderRadius: 2, mb: 1, py: 1, boxShadow: '0 0 0 2px #1976d2' }}>
                <Box sx={{ flex: 2 }}>{item.name}</Box>
                <Box sx={{ flex: 1 }}></Box>
                <TextField value={item.batch} onChange={e => setItems(items.map((it, i) => i === idx ? { ...it, batch: e.target.value } : it))} size="small" sx={{ flex: 1, mx: 1 }} />
                <TextField value={item.expiry} onChange={e => setItems(items.map((it, i) => i === idx ? { ...it, expiry: e.target.value } : it))} size="small" sx={{ flex: 1, mx: 1 }} />
                <TextField value={item.mrp} onChange={e => setItems(items.map((it, i) => i === idx ? { ...it, mrp: e.target.value } : it))} size="small" sx={{ flex: 1, mx: 1 }} />
                <TextField value={item.ptr} onChange={e => setItems(items.map((it, i) => i === idx ? { ...it, ptr: e.target.value } : it))} size="small" sx={{ flex: 1, mx: 1 }} />
                <TextField value={item.qty} onChange={e => setItems(items.map((it, i) => i === idx ? { ...it, qty: e.target.value } : it))} size="small" sx={{ flex: 1, mx: 1 }} />
                <TextField value={item.freeQty} onChange={e => setItems(items.map((it, i) => i === idx ? { ...it, freeQty: e.target.value } : it))} size="small" sx={{ flex: 1, mx: 1 }} />
                <TextField value={item.schamt || ''} onChange={e => setItems(items.map((it, i) => i === idx ? { ...it, schamt: e.target.value } : it))} size="small" sx={{ flex: 1, mx: 1 }} />
                <TextField value={item.disc} onChange={e => setItems(items.map((it, i) => i === idx ? { ...it, disc: e.target.value } : it))} size="small" sx={{ flex: 1, mx: 1 }} />
                <TextField value={item.base} onChange={e => setItems(items.map((it, i) => i === idx ? { ...it, base: e.target.value } : it))} size="small" sx={{ flex: 1, mx: 1 }} />
                <TextField value={item.gst} onChange={e => setItems(items.map((it, i) => i === idx ? { ...it, gst: e.target.value } : it))} size="small" sx={{ flex: 1, mx: 1 }} />
                <TextField value={item.amount} onChange={e => setItems(items.map((it, i) => i === idx ? { ...it, amount: e.target.value } : it))} size="small" sx={{ flex: 1, mx: 1 }} />
                <Button variant="contained" color="primary" sx={{ flex: 1, mx: 1, fontWeight: 600 }} onClick={() => setEditingIdx(null)}>Add</Button>
              </Box>
            ) : (
              <Box key={item.id} sx={{ mb: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', background: idx % 2 === 0 ? '#f8fafc' : '#fff', borderRadius: 2, py: 1 }}>
                  <Box sx={{ flex: 2, display: 'flex', alignItems: 'center' }}>
                    <IconButton size="small" color="error" onClick={() => setItems(items.filter((_, i) => i !== idx))}><DeleteIcon /></IconButton>
                    <Typography sx={{ ml: 1 }}>{item.name}</Typography>
                  </Box>
                  <Box sx={{ flex: 1 }}></Box>
                  <Box sx={{ flex: 1, textAlign: 'center' }}>{item.batch}</Box>
                  <Box sx={{ flex: 1, textAlign: 'center', color: isExpiring(item.expiry) ? '#d32f2f' : undefined, fontWeight: isExpiring(item.expiry) ? 700 : 400 }}>{item.expiry}</Box>
                  <Box sx={{ flex: 1, textAlign: 'center' }}>{item.mrp}</Box>
                  <Box sx={{ flex: 1, textAlign: 'center' }}>{item.ptr}</Box>
                  <Box sx={{ flex: 1, textAlign: 'center' }}>{item.qty}</Box>
                  <Box sx={{ flex: 1, textAlign: 'center' }}>{item.freeQty}</Box>
                  <Box sx={{ flex: 1, textAlign: 'center' }}>{item.schamt || '-'}</Box>
                  <Box sx={{ flex: 1, textAlign: 'center' }}>{item.disc}</Box>
                  <Box sx={{ flex: 1, textAlign: 'center' }}>{item.base}</Box>
                  <Box sx={{ flex: 1, textAlign: 'center' }}>{item.gst}</Box>
                  <Box sx={{ flex: 1, textAlign: 'center' }}>{item.amount}</Box>
                  <Button variant="contained" color="primary" sx={{ flex: 1, mx: 1 }} onClick={() => setEditingIdx(idx)}>Edit</Button>
                </Box>
                {/* Details row below */}
                <Box sx={{ display: 'flex', alignItems: 'center', pl: 7, pb: 1, fontSize: 15, color: '#1976d2', gap: 3 }}>
                  <span>Manf. <span style={{ color: '#222', fontWeight: 500 }}>PERK</span></span>
                  <span>Packing <span style={{ color: '#222', fontWeight: 500 }}>1 Strip of 10 Tablet</span></span>
                  <span>Loc. <span style={{ color: '#222', fontWeight: 500 }}>-</span></span>
                  <span>Content <a href="#" style={{ color: '#1976d2', textDecoration: 'underline' }}>Paracetamol (650mg)</a></span>
                </Box>
              </Box>
            )
          ))
        )}
      </Box>
      {/* Sticky summary bar at the bottom */}
      <Box sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, bgcolor: '#d32f2f', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'space-between', px: 3, py: 1.5, zIndex: 1200, borderTop: '1px solid #eee', fontWeight: 600, fontSize: 18 }}>
        <Box sx={{ display: 'flex', gap: 3 }}>
          <span>{totalQty} Qty.</span>
          <span>{totalItems} Items</span>
          <span>{margin}% Margin</span>
          <span>{gst} GST</span>
          <span>Net</span>
        </Box>
        <Box sx={{ fontWeight: 700, fontSize: 28 }}>{net}</Box>
      </Box>
      {/* Settings Dialog */}
      <Dialog open={settingsOpen} onClose={() => setSettingsOpen(false)} maxWidth="xs" fullWidth PaperProps={{ sx: { borderRadius: 3 } }}>
        <DialogTitle sx={{ bgcolor: '#1565c0', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'space-between', py: 2, px: 3 }}>
          <span style={{ fontWeight: 600, fontSize: 22 }}>Settings</span>
          <IconButton onClick={() => setSettingsOpen(false)} sx={{ color: '#fff' }}><CloseIcon /></IconButton>
        </DialogTitle>
        <DialogContent sx={{ bgcolor: '#fff', px: 4, py: 3 }}>
          <Box sx={{ mb: 3 }}>
            <Typography sx={{ fontWeight: 500, mb: 1 }}>Order Type</Typography>
            <RadioGroup row value={orderType} onChange={e => setOrderType(e.target.value)}>
              <FormControlLabel value="invoice" control={<Radio color="primary" />} label="Invoice" />
              <FormControlLabel value="challan" control={<Radio color="primary" />} label="Delivery Challan" />
            </RadioGroup>
          </Box>
          <Box sx={{ mb: 3 }}>
            <Typography sx={{ fontWeight: 500, mb: 1 }}>With GST</Typography>
            <RadioGroup row value={withGst} onChange={e => setWithGst(e.target.value)}>
              <FormControlLabel value="yes" control={<Radio color="primary" />} label="Yes" />
              <FormControlLabel value="no" control={<Radio color="primary" />} label="No" />
            </RadioGroup>
          </Box>
          <Box sx={{ mb: 1 }}>
            <Typography sx={{ fontWeight: 500, mb: 1 }}>Purchase on</Typography>
            <RadioGroup row value={purchaseOn} onChange={e => setPurchaseOn(e.target.value)}>
              <FormControlLabel value="ptr" control={<Radio color="primary" />} label="PTR" />
              <FormControlLabel value="pts" control={<Radio color="primary" />} label="PTS" />
            </RadioGroup>
          </Box>
        </DialogContent>
        <DialogActions sx={{ bgcolor: '#fff', px: 4, pb: 3, pt: 0, justifyContent: 'flex-end' }}>
          <Button variant="contained" sx={{ bgcolor: '#1565c0', borderRadius: 2, px: 4 }} onClick={() => setSettingsOpen(false)}>Submit</Button>
        </DialogActions>
      </Dialog>
      {/* Gmail Integration Dialog */}
      <Dialog open={gmailOpen} onClose={() => setGmailOpen(false)} maxWidth="md" fullWidth PaperProps={{ sx: { borderRadius: 3 } }}>
        <DialogTitle sx={{ bgcolor: '#1565c0', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'space-between', py: 2, px: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flex: 1 }}>
            <span style={{ fontWeight: 600, fontSize: 28 }}>Integrate your Gmail</span>
            <Typography sx={{ fontWeight: 400, fontSize: 16, ml: 2 }}>Link Email account on which you receive CSV from the distributor</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Button variant="contained" startIcon={<GoogleIcon />} sx={{ bgcolor: '#fff', color: '#1565c0', fontWeight: 600, borderRadius: 2, px: 2, boxShadow: 0, '&:hover': { bgcolor: '#f5f5f5' } }}>Sign in with Google</Button>
            <IconButton onClick={() => setGmailOpen(false)} sx={{ color: '#fff' }}><CloseIcon /></IconButton>
          </Box>
        </DialogTitle>
        <DialogContent sx={{ bgcolor: '#fff', px: 4, py: 4, display: 'flex', gap: 4, alignItems: 'flex-start' }}>
          <Box sx={{ flex: 1 }}>
            <Typography sx={{ color: '#03a9f4', fontWeight: 700, fontSize: 24, mb: 2 }}>Benefits</Typography>
            <Box sx={{ color: '#222', fontSize: 18, mb: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 1 }}>
                <Box sx={{ width: 10, height: 10, bgcolor: '#03a9f4', borderRadius: '50%', mt: '10px', mr: 2 }} />
                <span>Purchase CSV can be imported from your email</span>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 1 }}>
                <Box sx={{ width: 10, height: 10, bgcolor: '#03a9f4', borderRadius: '50%', mt: '10px', mr: 2 }} />
                <span>No need to find latest CSV everytime</span>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 1 }}>
                <Box sx={{ width: 10, height: 10, bgcolor: '#03a9f4', borderRadius: '50%', mt: '10px', mr: 2 }} />
                <span>Check new email from particular distributor directly</span>
              </Box>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
              <Typography sx={{ fontSize: 16, mr: 1 }}>For detailed Info,</Typography>
              <a href="https://www.youtube.com/" target="_blank" rel="noopener noreferrer" style={{ color: '#1976d2', fontWeight: 500, textDecoration: 'underline', display: 'flex', alignItems: 'center' }}>
                watch on Youtube <PlayCircleOutlineIcon sx={{ ml: 1, color: 'red' }} />
              </a>
            </Box>
          </Box>
          <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <img src="https://cdni.iconscout.com/illustration/premium/thumb/email-marketing-6339442-5229845.png" alt="Gmail Integration" style={{ width: '90%', maxWidth: 320, borderRadius: 12 }} />
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default NewPurchase; 