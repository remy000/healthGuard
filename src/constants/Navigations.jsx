import {
    HiOutlineUser,
	HiOutlineShoppingCart,
	HiOutlineUsers,
	HiOutlineDocumentText,
} from 'react-icons/hi'
export const DOCTOR_SIDEBAR_LINKS = [
	{
		key: 'patients',
		label: 'Patients',
		path: 'patients',
		icon: <HiOutlineUser />
	},
	{
		key: 'resources',
		label: 'resources',
		path: 'resources',
		icon: <HiOutlineShoppingCart />
	},
	{
		key: 'appointments',
		label: 'appointments',
		path: 'appointments',
		icon: <HiOutlineUsers />
	},
	{
		key: 'reports',
		label: 'reports',
		path: 'reports',
		icon: <HiOutlineDocumentText />
	}
]

export const PATIENT_SIDEBAR_LINKS = [
	{
		key: 'profile',
		label: 'Profile',
		path: 'profile',
		icon: <HiOutlineUser />
	},
	{
		key: 'careplan',
		label: 'careplan',
		path: 'careplan',
		icon: <HiOutlineShoppingCart />
	},
	{
		key: 'healthData',
		label: 'healthData',
		path: 'healthData',
		icon: <HiOutlineUsers />
	},
	{
		key: 'progress',
		label: 'progress Tracking',
		path: 'progress',
		icon: <HiOutlineDocumentText />
	},
    {
		key: 'report',
		label: 'report',
		path: 'report',
		icon: <HiOutlineDocumentText />
	}
]
export const ADMIN_SIDEBAR_LINKS = [
	{
		key: 'allPatients',
		label: 'Patients',
		path: 'allPatients',
		icon: <HiOutlineUser />
	},
	{
		key: 'careProviders',
		label: 'careProviders',
		path: 'careProviders',
		icon: <HiOutlineShoppingCart />
	},
	{
		key: 'appointments',
		label: 'appointments',
		path: 'allappointments',
		icon: <HiOutlineUsers />
	},
	{
		key: 'resources',
		label: 'resources',
		path: 'allresources',
		icon: <HiOutlineDocumentText />
	}
]
