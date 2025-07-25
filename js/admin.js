// Admin.js - Gestión del panel administrativo con vista del día

// Variables globales
let currentDate = new Date(); // Se inicializará correctamente más tarde
let allAppointments = [];
let appointmentToCancel = null;

// Obtener fecha actual en zona horaria de México
function getCurrentDateInTimeZone() {
    try {
        // Método simple y confiable usando toLocaleDateString
        const now = new Date();
        const mexicoDate = new Date(now.toLocaleString("en-US", {timeZone: "America/Mexico_City"}));
        console.log('Fecha de México:', mexicoDate.toDateString());
        return mexicoDate;
    } catch (error) {
        console.error('Error obteniendo fecha de México, usando fecha local:', error);
        // Fallback a fecha local si hay problemas
        return new Date();
    }
}

// === FUNCIONES GLOBALES DISPONIBLES INMEDIATAMENTE ===

// Función de prueba para EmailJS - disponible globalmente
window.testEmailJS = async function() {
    console.log('=== PRUEBA DE EMAILJS ===');
    
    // Verificar que EmailJS esté disponible
    if (!window.emailjs) {
        alert('❌ EmailJS no está disponible. Verifica que el script se haya cargado correctamente.');
        return;
    }
    
    console.log('✅ EmailJS está disponible');
    
    const testData = {
        to_email: 'yuridiamakeup@gmail.com',
        subject: 'Prueba de EmailJS - Sistema de Citas',
        client_name: 'Cliente de Prueba',
        client_email: 'prueba@email.com',
        client_phone: '123-456-7890',
        service: 'Manicura de Prueba',
        appointment_date: '13/07/2025',
        appointment_time: '10:00',
        notes: 'Esta es una prueba del sistema de emails',
        status: 'prueba',
        origin: 'test',
        action: 'Prueba del sistema'
    };
    
    console.log('📧 Enviando email de prueba con datos:', testData);
    
    try {
        const response = await window.emailjs.send(
            'service_1eqrmyo',
            'template_admin_notification',
            testData
        );
        
        console.log('✅ Email de prueba enviado exitosamente:', response);
        alert('✅ Email de prueba enviado correctamente! Revisa tu bandeja de entrada en yuridiamakeup@gmail.com');
        
    } catch (error) {
        console.error('❌ Error en la prueba de email:', error);
        console.error('Detalles del error:', {
            message: error.message,
            status: error.status,
            text: error.text
        });
        
        let errorMessage = 'Error desconocido';
        if (error.status === 400) {
            errorMessage = 'Datos inválidos o template no encontrado';
        } else if (error.status === 401) {
            errorMessage = 'Credenciales inválidas o Public Key incorrecto';
        } else if (error.status === 402) {
            errorMessage = 'Límite de emails alcanzado';
        } else if (error.status === 404) {
            errorMessage = 'Servicio o template no encontrado';
        } else if (error.message) {
            errorMessage = error.message;
        }
        
        alert(`❌ Error enviando email de prueba: ${errorMessage}\n\nRevisa la consola para más detalles.`);
    }
};

// Función para debuggear la fecha y zona horaria - disponible globalmente
window.debugDate = function() {
    console.log('=== DEBUG DE FECHA Y ZONA HORARIA ===');
    
    const localDate = new Date();
    const mexicoDate = getCurrentDateInTimeZone();
    
    console.log('Fecha local del navegador:', localDate);
    console.log('Día local:', localDate.getDate());
    console.log('Fecha en México:', mexicoDate);
    console.log('Día en México:', mexicoDate.getDate());
    console.log('Zona horaria del navegador:', Intl.DateTimeFormat().resolvedOptions().timeZone);
    console.log('currentDate actual:', currentDate);
    console.log('Día de currentDate:', currentDate.getDate());
    
    alert(`
Fecha local: ${localDate.toLocaleDateString()} (día ${localDate.getDate()})
Fecha México: ${mexicoDate.toLocaleDateString()} (día ${mexicoDate.getDate()})
Zona horaria: ${Intl.DateTimeFormat().resolvedOptions().timeZone}
CurrentDate: ${currentDate.toLocaleDateString()} (día ${currentDate.getDate()})
    `);
};

// Función para probar navegación manual
window.testNavigation = function() {
    console.log('=== TEST DE NAVEGACIÓN ===');
    alert('Probando navegación manual...');
    
    // Simular click en día siguiente
    console.log('Fecha antes:', currentDate.toDateString());
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + 1);
    currentDate = newDate;
    console.log('Fecha después:', currentDate.toDateString());
    
    // Solo ejecutar si las funciones están disponibles
    if (typeof updateCurrentDate === 'function') {
        updateCurrentDate();
    } else {
        console.log('updateCurrentDate no disponible aún');
    }
    
    if (typeof window.loadDailyAppointments === 'function') {
        window.loadDailyAppointments();
    } else {
        console.log('loadDailyAppointments no disponible aún');
    }
    
    alert('Navegación manual completada. Verifica la consola.');
};

// Función para verificar que todo está funcionando
window.testSystem = function() {
    console.log('=== TEST DEL SISTEMA ===');
    console.log('debugDate disponible:', typeof window.debugDate);
    console.log('testEmailJS disponible:', typeof window.testEmailJS);
    console.log('testNavigation disponible:', typeof window.testNavigation);
    console.log('loadDailyAppointments disponible:', typeof window.loadDailyAppointments);
    console.log('getCurrentDateInTimeZone disponible:', typeof getCurrentDateInTimeZone);
    console.log('updateCurrentDate disponible:', typeof updateCurrentDate);
    console.log('Firebase db disponible:', !!window.db);
    console.log('Firebase functions disponible:', !!window.firebase);
    console.log('EmailJS disponible:', !!window.emailjs);
    console.log('currentDate:', currentDate?.toDateString());
    
    // Probar conexión a Firebase
    if (window.db && window.firebase) {
        console.log('🔍 Probando conexión a Firebase...');
        try {
            const testQuery = window.firebase.collection(window.db, 'citas');
            console.log('✅ Conexión a Firebase establecida');
        } catch (error) {
            console.error('❌ Error conectando a Firebase:', error);
        }
    }
    
    alert(`Sistema Check:
debugDate: ${typeof window.debugDate}
testEmailJS: ${typeof window.testEmailJS}  
testNavigation: ${typeof window.testNavigation}
loadDailyAppointments: ${typeof window.loadDailyAppointments}
getCurrentDateInTimeZone: ${typeof getCurrentDateInTimeZone}
Firebase DB: ${window.db ? 'Disponible' : 'No disponible'}
Firebase Functions: ${window.firebase ? 'Disponible' : 'No disponible'}
EmailJS: ${window.emailjs ? 'Disponible' : 'No disponible'}
CurrentDate: ${currentDate?.toDateString() || 'No definida'}`);
};

// Funciones globales para los botones de citas - disponibles inmediatamente
window.editAppointment = function(appointmentId) {
    console.log('Editando cita:', appointmentId);
    // Implementar modal de edición
    alert('Función de edición en desarrollo');
};

window.showCancelConfirmation = function(appointmentId) {
    appointmentToCancel = appointmentId;
    const cancelConfirmModal = document.getElementById('cancel-confirm-modal');
    if (cancelConfirmModal) {
        cancelConfirmModal.classList.remove('hidden');
    }
};

// Hacer loadDailyAppointments global para el botón de reintentar
window.loadDailyAppointments = function() {
    console.log('=== CARGANDO CITAS DEL DÍA ===');
    const appointmentsList = document.getElementById('daily-appointments-list');
    const dailySummary = document.getElementById('daily-summary');
    
    if (!appointmentsList) {
        console.error('❌ Elemento daily-appointments-list no encontrado');
        return;
    }
    
    // Verificar que Firebase esté disponible
    if (!window.db || !window.firebase) {
        console.error('❌ Firebase no está disponible');
        appointmentsList.innerHTML = `
            <div class="text-center text-red-500 py-8">
                <div class="text-4xl mb-2">❌</div>
                <p>Error: Firebase no está disponible</p>
                <p class="text-sm">Recarga la página e intenta de nuevo</p>
            </div>
        `;
        return;
    }
    
    // Mostrar loading
    appointmentsList.innerHTML = `
        <div class="text-center text-gray-500 py-8">
            <div class="text-4xl mb-2">⏳</div>
            <p>Cargando citas del día...</p>
        </div>
    `;
    
    // Formatear fecha para consulta
    const dateStr = formatDateForQuery(currentDate);
    console.log('📅 Fecha actual:', currentDate.toDateString());
    console.log('📅 Fecha formateada para consulta:', dateStr);
    
    try {
        // Consultar Firebase - usar solo where para evitar problemas de índices
        const q = window.firebase.query(
            window.firebase.collection(window.db, 'citas'),
            window.firebase.where('fecha', '==', dateStr)
        );
        
        console.log('🔍 Ejecutando consulta a Firebase...');
        
        // Configurar listener con timeout
        const unsubscribe = window.firebase.onSnapshot(q, (querySnapshot) => {
            console.log('📦 Respuesta de Firebase recibida');
            console.log('📊 Documentos encontrados:', querySnapshot.size);
            
            const dayAppointments = [];
            querySnapshot.forEach((doc) => {
                const appointmentData = doc.data();
                console.log('📋 Cita encontrada:', appointmentData);
                dayAppointments.push({
                    id: doc.id,
                    ...appointmentData
                });
            });
            
            // Ordenar manualmente por hora
            dayAppointments.sort((a, b) => {
                const timeA = a.hora || '00:00';
                const timeB = b.hora || '00:00';
                return timeA.localeCompare(timeB);
            });
            
            console.log('✅ Citas del día procesadas:', dayAppointments.length);
            renderDailyAppointments(dayAppointments);
            updateDailySummary(dayAppointments);
        }, (error) => {
            console.error('❌ Error loading daily appointments:', error);
            appointmentsList.innerHTML = `
                <div class="text-center text-red-500 py-8">
                    <div class="text-4xl mb-2">❌</div>
                    <p>Error al cargar las citas</p>
                    <p class="text-sm">${error.message}</p>
                    <button onclick="loadDailyAppointments()" class="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                        🔄 Reintentar
                    </button>
                </div>
            `;
        });
        
        // Timeout después de 10 segundos
        setTimeout(() => {
            if (appointmentsList.innerHTML.includes('Cargando citas del día...')) {
                console.error('⏰ Timeout: La consulta tardó más de 10 segundos');
                appointmentsList.innerHTML = `
                    <div class="text-center text-orange-500 py-8">
                        <div class="text-4xl mb-2">⏰</div>
                        <p>La consulta está tardando mucho tiempo</p>
                        <p class="text-sm">Verifica tu conexión a internet</p>
                        <button onclick="loadDailyAppointments()" class="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                            🔄 Reintentar
                        </button>
                    </div>
                `;
            }
        }, 10000);
        
    } catch (error) {
        console.error('❌ Error configurando la consulta:', error);
        appointmentsList.innerHTML = `
            <div class="text-center text-red-500 py-8">
                <div class="text-4xl mb-2">❌</div>
                <p>Error al configurar la consulta</p>
                <p class="text-sm">${error.message}</p>
                <button onclick="loadDailyAppointments()" class="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                    🔄 Reintentar
                </button>
            </div>
        `;
    }
};

window.cancelAppointment = async function(appointmentId) {
    if (confirm('¿Estás seguro de que quieres cancelar esta cita?')) {
        try {
            // Obtener los datos de la cita antes de cancelarla
            const appointmentDoc = await window.firebase.getDoc(window.firebase.doc(window.db, 'citas', appointmentId));
            const appointmentData = appointmentDoc.data();
            
            // Actualizar el estado a cancelada
            await window.firebase.updateDoc(window.firebase.doc(window.db, 'citas', appointmentId), {
                estado: 'cancelada',
                fechaCancelacion: new Date().toISOString()
            });
            
            console.log('Cita cancelada exitosamente');
            
            // Enviar notificación de cancelación
            if (appointmentData && typeof sendCancelationNotification === 'function') {
                try {
                    const cancelationData = {
                        ...appointmentData,
                        estado: 'cancelada',
                        fechaCancelacion: new Date().toISOString()
                    };
                    
                    await sendCancelationNotification(cancelationData);
                } catch (emailError) {
                    console.error('Error enviando notificación de cancelación:', emailError);
                }
            }
            
        } catch (error) {
            console.error('Error cancelling appointment:', error);
            alert('Error al cancelar la cita');
        }
    }
};

// Flag para asegurar que la inicialización solo ocurra una vez
let isAdminInitialized = false;

// --- INICIALIZACIÓN PRINCIPAL ---

// Se ejecuta cuando el script es cargado.
(function initializeAdmin() {
    if (isAdminInitialized) {
        console.log('El panel ya ha sido inicializado. Omitiendo.');
        return;
    }
    isAdminInitialized = true;
    
    console.log('=== INICIALIZANDO PÁGINA DE ADMIN ===');

    // Esperar a que Firebase esté listo.
    const checkFirebaseReady = setInterval(() => {
        if (window.db && window.firebase) {
            clearInterval(checkFirebaseReady);
            console.log('✅ Firebase listo. Iniciando funciones del panel.');
            
            try {
                // Ocultar la pantalla de contraseña y mostrar el panel principal
                const passwordScreen = document.getElementById('password-screen');
                const adminPanel = document.getElementById('admin-panel');
                if (passwordScreen && adminPanel) {
                    passwordScreen.classList.add('hidden');
                    adminPanel.classList.remove('hidden');
                }

                // Configurar todos los listeners de eventos
                setupEventListeners();
                
                // Cargar los datos de las citas y cancelaciones
                loadAllAppointments();
                loadCancellationLog();
                
                // Configurar el modal de citas manuales
                setupManualAppointments();
    
                console.log('✅ Panel de admin completamente inicializado.');

            } catch (error) {
                console.error("❌ Error fatal durante la inicialización del panel:", error);
                alert("Ocurrió un error grave al cargar el panel. Revisa la consola para más detalles.");
            }
        } else {
            console.log('🟡 Esperando a Firebase...');
        }
    }, 100);
})();


function initializeAdminFunctions() {
    // Esta función es ahora reemplazada por startAdminPanel para mayor claridad.
    // La mantenemos por si alguna referencia antigua la llama.
    console.warn('initializeAdminFunctions está obsoleta, usando startAdminPanel en su lugar.');
    startAdminPanel();
}

function setupDayNavigation() {
    console.log('=== Configurando navegación del día ===');
    
    // Navegación del calendario diario
    const prevDayBtn = document.getElementById('prev-day-btn');
    const nextDayBtn = document.getElementById('next-day-btn');
    const todayBtn = document.getElementById('today-btn');
    
    console.log('Elementos encontrados:');
    console.log('- Botón anterior (prev-day-btn):', !!prevDayBtn, prevDayBtn);
    console.log('- Botón siguiente (next-day-btn):', !!nextDayBtn, nextDayBtn);
    console.log('- Botón hoy (today-btn):', !!todayBtn, todayBtn);
    
    // Debug: Buscar todos los elementos con esos IDs
    console.log('Todos los elementos con ID prev-day-btn:', document.querySelectorAll('#prev-day-btn'));
    console.log('Todos los elementos con ID next-day-btn:', document.querySelectorAll('#next-day-btn'));
    console.log('Todos los elementos con ID today-btn:', document.querySelectorAll('#today-btn'));
    
    if (prevDayBtn) {
        console.log('Agregando listener al botón anterior...');
        prevDayBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            console.log('🔙 Click en día anterior - currentDate antes:', currentDate.toDateString());
            
            // Crear nueva fecha para evitar problemas de referencia
            const newDate = new Date(currentDate);
            newDate.setDate(newDate.getDate() - 1);
            currentDate = newDate;
            
            console.log('🔙 Nueva fecha:', currentDate.toDateString());
            updateCurrentDate();
            window.loadDailyAppointments();
        });
        console.log('✅ Listener agregado al botón anterior');
    } else {
        console.error('❌ Botón prev-day-btn no encontrado');
    }
    
    if (nextDayBtn) {
        console.log('Agregando listener al botón siguiente...');
        nextDayBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            console.log('🔜 Click en día siguiente - currentDate antes:', currentDate.toDateString());
            
            // Crear nueva fecha para evitar problemas de referencia
            const newDate = new Date(currentDate);
            newDate.setDate(newDate.getDate() + 1);
            currentDate = newDate;
            
            console.log('🔜 Nueva fecha:', currentDate.toDateString());
            updateCurrentDate();
            window.loadDailyAppointments();
        });
        console.log('✅ Listener agregado al botón siguiente');
    } else {
        console.error('❌ Botón next-day-btn no encontrado');
    }
    
    if (todayBtn) {
        console.log('Agregando listener al botón hoy...');
        todayBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            console.log('📅 Click en hoy - currentDate antes:', currentDate.toDateString());
            currentDate = getCurrentDateInTimeZone();
            console.log('📅 Nueva fecha (hoy):', currentDate.toDateString());
            updateCurrentDate();
            window.loadDailyAppointments();
        });
        console.log('✅ Listener agregado al botón hoy');
    } else {
        console.error('❌ Botón today-btn no encontrado');
    }
    
    console.log('=== Navegación del día configurada ===');
}

function setupEventListeners() {
    // Los listeners para navegación del día se configurarán después de la autenticación
    // porque los elementos no existen hasta que se muestre el panel admin
    
    // Modal de cancelación se configura aquí porque existe desde el inicio
    setupCancelModal();
}

function setupCancelModal() {
    const cancelConfirmModal = document.getElementById('cancel-confirm-modal');
    const confirmCancelBtn = document.getElementById('confirm-cancel-btn');
    const keepAppointmentBtn = document.getElementById('keep-appointment-btn');
    
    if (!cancelConfirmModal || !confirmCancelBtn || !keepAppointmentBtn) return;
    
    // Event listeners para modal de cancelación
    confirmCancelBtn.addEventListener('click', async function() {
        if (appointmentToCancel) {
            try {
                await window.firebase.deleteDoc(window.firebase.doc(window.db, 'citas', appointmentToCancel));
                console.log('Cita cancelada exitosamente');
                cancelConfirmModal.classList.add('hidden');
                appointmentToCancel = null;
            } catch (error) {
                console.error('Error deleting appointment: ', error);
                alert('Error al cancelar la cita');
            }
        }
    });
    
    keepAppointmentBtn.addEventListener('click', function() {
        cancelConfirmModal.classList.add('hidden');
        appointmentToCancel = null;
    });
    
    // Cerrar modal al hacer click fuera
    cancelConfirmModal.addEventListener('click', function(e) {
        if (e.target === cancelConfirmModal) {
            cancelConfirmModal.classList.add('hidden');
            appointmentToCancel = null;
        }
    });
}

function renderDailyAppointments(appointments) {
    const appointmentsList = document.getElementById('daily-appointments-list');
    
    if (!appointmentsList) return;
    
    if (appointments.length === 0) {
        appointmentsList.innerHTML = `
            <div class="text-center text-gray-500 py-8">
                <div class="text-4xl mb-2">📭</div>
                <p>No hay citas programadas para este día</p>
            </div>
        `;
        return;
    }
    
    const appointmentsHTML = appointments.map(appointment => {
        const statusClass = getStatusClass(appointment.estado);
        const statusText = getStatusText(appointment.estado);
        
        return `
            <div class="appointment-item bg-white rounded-lg border-l-4 ${statusClass} p-4 mb-3 shadow-sm hover:shadow-md transition-shadow">
                <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
                    <div class="flex-1">
                        <div class="flex items-center gap-2 mb-2">
                            <span class="font-semibold text-lg">${appointment.hora}</span>
                            <span class="px-2 py-1 rounded-full text-xs font-medium ${statusClass.replace('border-l-', 'bg-')} text-white">
                                ${statusText}
                            </span>
                        </div>
                        <h3 class="font-medium text-gray-900 mb-1">${appointment.nombre}</h3>
                        <p class="text-gray-600 text-sm mb-1">📧 ${appointment.email}</p>
                        <p class="text-gray-600 text-sm mb-1">📱 ${appointment.telefono}</p>
                        <p class="text-gray-600 text-sm mb-1">💅 ${appointment.servicio}</p>
                        ${appointment.notas ? `<p class="text-gray-500 text-sm italic">📝 ${appointment.notas}</p>` : ''}
                    </div>
                    <div class="flex flex-col md:flex-row gap-2">
                        <button onclick="editAppointment('${appointment.id}')" 
                                class="px-3 py-1 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded text-sm transition touch-target">
                            ✏️ Editar
                        </button>
                        <button onclick="cancelAppointment('${appointment.id}')" 
                                class="px-3 py-1 bg-red-100 hover:bg-red-200 text-red-700 rounded text-sm transition touch-target">
                            ❌ Cancelar
                        </button>
                    </div>
                </div>
            </div>
        `;
    }).join('');
    
    appointmentsList.innerHTML = appointmentsHTML;
}

function updateDailySummary(appointments) {
    const dailySummary = document.getElementById('daily-summary');
    
    if (!dailySummary) return;
    
    const totalAppointments = appointments.length;
    const confirmedAppointments = appointments.filter(apt => apt.estado === 'confirmada').length;
    const pendingAppointments = appointments.filter(apt => apt.estado === 'pendiente').length;
    const cancelledAppointments = appointments.filter(apt => apt.estado === 'cancelada').length;
    
    dailySummary.innerHTML = `
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4 pt-4 border-t border-gray-200">
            <div class="text-center">
                <div class="text-2xl font-bold text-blue-600">${totalAppointments}</div>
                <div class="text-xs text-gray-600">Total</div>
            </div>
            <div class="text-center">
                <div class="text-2xl font-bold text-green-600">${confirmedAppointments}</div>
                <div class="text-xs text-gray-600">Confirmadas</div>
            </div>
            <div class="text-center">
                <div class="text-2xl font-bold text-yellow-600">${pendingAppointments}</div>
                <div class="text-xs text-gray-600">Pendientes</div>
            </div>
            <div class="text-center">
                <div class="text-2xl font-bold text-red-600">${cancelledAppointments}</div>
                <div class="text-xs text-gray-600">Canceladas</div>
            </div>
        </div>
    `;
}

function loadAllAppointments() {
    const appointmentsTableBody = document.getElementById('appointments-table-body');
    
    if (!appointmentsTableBody) {
        console.log('Tabla de citas no encontrada, saltando carga de todas las citas');
        return;
    }
    
    try {
        // Usar solo orderBy para evitar problemas con índices compuestos
        const q = window.firebase.query(
            window.firebase.collection(window.db, 'citas'),
            window.firebase.orderBy('fecha', 'desc')
        );
        
        window.firebase.onSnapshot(q, (querySnapshot) => {
            allAppointments = [];
            querySnapshot.forEach((doc) => {
                allAppointments.push({
                    id: doc.id,
                    ...doc.data()
                });
            });
            
            // Ordenar manualmente por fecha y hora después de obtener los datos
            allAppointments.sort((a, b) => {
                if (a.fecha !== b.fecha) {
                    return b.fecha.localeCompare(a.fecha); // Descendente por fecha
                }
                return (b.hora || '00:00').localeCompare(a.hora || '00:00'); // Descendente por hora
            });
            
            console.log('Todas las citas cargadas:', allAppointments.length);
            renderAllAppointments(allAppointments);
        }, (error) => {
            console.error('Error loading all appointments:', error);
            // Intentar sin orderBy si hay error
            const simpleQ = window.firebase.collection(window.db, 'citas');
            window.firebase.onSnapshot(simpleQ, (querySnapshot) => {
                allAppointments = [];
                querySnapshot.forEach((doc) => {
                    allAppointments.push({
                        id: doc.id,
                        ...doc.data()
                    });
                });
                
                // Ordenar manualmente
                allAppointments.sort((a, b) => {
                    if (a.fecha !== b.fecha) {
                        return b.fecha.localeCompare(a.fecha);
                    }
                    return (b.hora || '00:00').localeCompare(a.hora || '00:00');
                });
                
                renderAllAppointments(allAppointments);
            });
        });
    } catch (error) {
        console.error('Error setting up appointments listener:', error);
    }
}

function renderAllAppointments(appointments) {
    const appointmentsTableBody = document.getElementById('appointments-table-body');
    
    if (!appointmentsTableBody) return;
    
    if (appointments.length === 0) {
        appointmentsTableBody.innerHTML = `
            <tr>
                <td colspan="7" class="text-center py-8 text-gray-500">
                    <div class="text-4xl mb-2">📭</div>
                    <p>No hay citas registradas</p>
                </td>
            </tr>
        `;
        return;
    }
    
    const appointmentsHTML = appointments.map(appointment => {
        const statusClass = getStatusClass(appointment.estado);
        const statusText = getStatusText(appointment.estado);
        
        return `
            <tr class="hover:bg-gray-50 transition-colors">
                <td class="px-3 md:px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ${formatDate(appointment.fecha)}
                </td>
                <td class="px-3 md:px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ${appointment.hora}
                </td>
                <td class="px-3 md:px-6 py-4 whitespace-nowrap">
                    <div class="text-sm text-gray-900">${appointment.nombre}</div>
                    <div class="text-sm text-gray-500">${appointment.email}</div>
                </td>
                <td class="px-3 md:px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ${appointment.telefono}
                </td>
                <td class="px-3 md:px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ${appointment.servicio}
                </td>
                <td class="px-3 md:px-6 py-4 whitespace-nowrap">
                    <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full ${statusClass.replace('border-l-', 'bg-')} text-white">
                        ${statusText}
                    </span>
                </td>
                <td class="px-3 md:px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div class="flex flex-col md:flex-row gap-2">
                        <button onclick="editAppointment('${appointment.id}')" 
                                class="text-blue-600 hover:text-blue-900 text-xs md:text-sm touch-target">
                            ✏️ Editar
                        </button>
                        <button onclick="cancelAppointment('${appointment.id}')" 
                                class="text-red-600 hover:text-red-900 text-xs md:text-sm touch-target">
                            ❌ Cancelar
                        </button>
                    </div>
                </td>
            </tr>
        `;
    }).join('');
    
    appointmentsTableBody.innerHTML = appointmentsHTML;
}

// Funciones auxiliares
function formatDateForQuery(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

function formatDate(dateString) {
    const [year, month, day] = dateString.split('-');
    return `${day}/${month}/${year}`;
}

function getStatusClass(status) {
    switch (status) {
        case 'confirmada':
            return 'border-l-green-500';
        case 'pendiente':
            return 'border-l-yellow-500';
        case 'cancelada':
            return 'border-l-red-500';
        default:
            return 'border-l-gray-500';
    }
}

function getStatusText(status) {
    switch (status) {
        case 'confirmada':
            return 'Confirmada';
        case 'pendiente':
            return 'Pendiente';
        case 'cancelada':
            return 'Cancelada';
        default:
            return 'Desconocido';
    }
}

function updateCurrentDate() {
    console.log('=== Actualizando fecha actual ===');
    console.log('Fecha actual:', currentDate.toDateString());
    
    const currentDateBadge = document.getElementById('current-date-badge');
    const dayName = document.getElementById('day-name');
    const dayNumber = document.getElementById('day-number');
    
    console.log('Elementos encontrados:');
    console.log('- Badge fecha:', !!currentDateBadge, currentDateBadge);
    console.log('- Nombre día:', !!dayName, dayName);
    console.log('- Número día:', !!dayNumber, dayNumber);
    
    const dayNames = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    const monthNames = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 
                       'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
    
    // Usar fecha de México para comparación
    const today = getCurrentDateInTimeZone();
    const isToday = currentDate.toDateString() === today.toDateString();
    
    console.log('Fecha actual del sistema:', currentDate.toDateString());
    console.log('Fecha de hoy en México:', today.toDateString());
    console.log('Es hoy?', isToday);
    
    if (currentDateBadge) {
        const dateText = isToday ? 'Hoy' : `${currentDate.getDate()} de ${monthNames[currentDate.getMonth()]}`;
        currentDateBadge.textContent = dateText;
        console.log('✅ Badge actualizado:', dateText);
    } else {
        console.error('❌ Element current-date-badge no encontrado');
    }
    
    if (dayName) {
        const dayText = isToday ? 'Hoy' : dayNames[currentDate.getDay()];
        dayName.textContent = dayText;
        console.log('✅ Nombre del día actualizado:', dayText);
    } else {
        console.error('❌ Element day-name no encontrado');
    }
    
    if (dayNumber) {
        const numberText = currentDate.getDate().toString();
        dayNumber.textContent = numberText;
        console.log('✅ Número del día actualizado:', numberText);
    } else {
        console.error('❌ Element day-number no encontrado');
    }
    
    console.log('=== Fecha actualizada ===');
}

// Función para cargar el registro de cancelaciones
function loadCancellationLog() {
    const cancelLogTableBody = document.getElementById('cancel-log-table-body');
    
    if (!cancelLogTableBody) {
        console.log('Tabla de cancelaciones no encontrada, saltando carga');
        return;
    }

    try {
        const q = window.firebase.query(
            window.firebase.collection(window.db, "cancelaciones"), 
            window.firebase.orderBy("fechaCancelacion", "desc")
        );

        window.firebase.onSnapshot(q, (querySnapshot) => {
            cancelLogTableBody.innerHTML = '';

            if (querySnapshot.empty) {
                cancelLogTableBody.innerHTML = '<tr><td colspan="5" class="p-4 text-center text-gray-500">No hay cancelaciones registradas.</td></tr>';
                return;
            }

            querySnapshot.forEach((doc) => {
                const log = doc.data();
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td class="px-4 py-2">${log.fecha || ''}</td>
                    <td class="px-4 py-2">${log.hora || ''}</td>
                    <td class="px-4 py-2">${log.nombre || ''}</td>
                    <td class="px-4 py-2">${log.telefono || ''}</td>
                    <td class="px-4 py-2">${log.motivo || 'No especificado'}</td>
                `;
                cancelLogTableBody.appendChild(row);
            });
        }, (error) => {
            console.error("Error cargando cancelaciones:", error);
            cancelLogTableBody.innerHTML = '<tr><td colspan="5" class="p-4 text-center text-red-500">Error cargando cancelaciones.</td></tr>';
        });
    } catch (error) {
        console.error("Error configurando listener de cancelaciones:", error);
        if (cancelLogTableBody) {
            cancelLogTableBody.innerHTML = '<tr><td colspan="5" class="p-4 text-center text-red-500">Error al cargar las cancelaciones.</td></tr>';
        }
    }
}

function setupManualAppointments() {
    const openModalBtn = document.getElementById('open-manual-appointment-modal-btn');
    const manualAppointmentModal = document.getElementById('manual-appointment-modal');
    const closeModalBtn = document.getElementById('close-manual-appointment-modal-btn');
    const manualAppointmentForm = document.getElementById('manual-appointment-form');
    const manualDateInput = document.getElementById('manual-fecha');
    const manualTimeInput = document.getElementById('manual-hora');
    const manualNameInput = document.getElementById('manual-nombre');
    const manualEmailInput = document.getElementById('manual-email');
    const manualPhoneInput = document.getElementById('manual-telefono');
    const manualServiceInput = document.getElementById('manual-servicio');
    const manualSuccessMsg = document.getElementById('manual-appointment-success');
    const manualErrorMsg = document.getElementById('manual-appointment-error');

    // Listeners para abrir y cerrar el modal
    if (openModalBtn && manualAppointmentModal) {
        openModalBtn.addEventListener('click', () => {
            manualAppointmentModal.classList.remove('hidden');
        });
    }

    if (closeModalBtn && manualAppointmentModal) {
        closeModalBtn.addEventListener('click', () => {
            manualAppointmentModal.classList.add('hidden');
        });
    }
    
    // Configurar fecha mínima como hoy
    if (manualDateInput) {
        const today = new Date().toISOString().split('T')[0];
        manualDateInput.min = today;
        manualDateInput.value = today;
        console.log('Fecha mínima configurada:', today);
    }
    
    // Manejar envío del formulario
    if (manualAppointmentForm) {
        manualAppointmentForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            manualSuccessMsg.classList.add('hidden');
            manualErrorMsg.classList.add('hidden');
            
            const appointmentData = {
                fecha: manualDateInput.value,
                hora: manualTimeInput.value,
                nombre: manualNameInput.value.trim(),
                email: manualEmailInput.value.trim().toLowerCase(),
                telefono: manualPhoneInput.value.trim(),
                servicio: manualServiceInput.value.trim(),
                estado: 'confirmada',
                fechaCreacion: new Date().toISOString(),
                origen: 'manual-admin'
            };

            if (!appointmentData.fecha || !appointmentData.hora || !appointmentData.nombre || !appointmentData.telefono || !appointmentData.servicio) {
                manualErrorMsg.textContent = 'Por favor, completa todos los campos.';
                manualErrorMsg.classList.remove('hidden');
                return;
            }
            
            try {
                await window.firebase.addDoc(window.firebase.collection(window.db, 'citas'), appointmentData);
                
                manualSuccessMsg.textContent = 'Cita agregada correctamente.';
                manualSuccessMsg.classList.remove('hidden');
                
                manualAppointmentForm.reset();
                setTimeout(() => {
                    manualAppointmentModal.classList.add('hidden');
                    manualSuccessMsg.classList.add('hidden');
                }, 2000);
                
            } catch (error) {
                console.error('Error adding manual appointment:', error);
                manualErrorMsg.textContent = 'Error al agregar la cita. Intenta de nuevo.';
                manualErrorMsg.classList.remove('hidden');
            }
        });
    }
}

// Funciones para envío de correos
// Función para enviar correo con EmailJS
async function sendEmailNotification(appointmentData, isNewAppointment = true) {
    console.log('=== INICIANDO ENVÍO DE EMAIL ===');
    console.log('EmailJS disponible?', !!window.emailjs);
    console.log('Datos de la cita:', appointmentData);
    
    // Verificar si EmailJS está disponible
    if (!window.emailjs) {
        console.error('❌ EmailJS no está disponible');
        alert('Error: EmailJS no está inicializado');
        return { success: false, error: 'EmailJS no disponible' };
    }
    
    try {
        console.log('📧 Preparando datos del correo...');
        
        // Preparar los datos para el template de EmailJS
        const emailData = {
            to_email: 'yuridiamakeup@gmail.com',
            client_name: appointmentData.nombre,
            client_email: appointmentData.email,
            client_phone: appointmentData.telefono,
            service: appointmentData.servicio,
            appointment_date: formatDate(appointmentData.fecha),
            appointment_time: appointmentData.hora,
            notes: appointmentData.notas || 'Sin notas adicionales',
            status: appointmentData.estado,
            origin: appointmentData.origen || 'web',
            action: isNewAppointment ? 'Nueva cita agendada' : 'Cita modificada'
        };
        
        console.log('📋 Datos del email preparados:', emailData);
        console.log('🔧 Service ID: service_1eqrmyo');
        console.log('📄 Template ID: template_admin_notification');
        
        // Mostrar mensaje de envío en la UI
        const loadingDiv = document.createElement('div');
        loadingDiv.innerHTML = '📧 Enviando correo de notificación...';
        loadingDiv.className = 'fixed top-4 right-4 bg-blue-500 text-white px-4 py-2 rounded shadow-lg z-50';
        loadingDiv.id = 'email-loading';
        document.body.appendChild(loadingDiv);
        
        // Enviar correo usando EmailJS
        console.log('🚀 Enviando correo...');
        const response = await window.emailjs.send(
            'service_1eqrmyo', // Tu Service ID
            'template_admin_notification', // Template ID para notificaciones al admin
            emailData
        );
        
        console.log('✅ Correo enviado exitosamente:', response);
        
        // Remover loading y mostrar éxito
        const loadingEl = document.getElementById('email-loading');
        if (loadingEl) document.body.removeChild(loadingEl);
        
        const successDiv = document.createElement('div');
        successDiv.innerHTML = '✅ Correo enviado al admin correctamente';
        successDiv.className = 'fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded shadow-lg z-50';
        document.body.appendChild(successDiv);
        
        setTimeout(() => {
            document.body.removeChild(successDiv);
        }, 4000);
        
        return { success: true, response };
        
    } catch (error) {
        console.error('❌ Error enviando correo:', error);
        console.error('Detalles del error:', error.message, error.status, error.text);
        
        // Remover loading
        const loadingEl = document.getElementById('email-loading');
        if (loadingEl) document.body.removeChild(loadingEl);
        
        // Mostrar error específico
        const errorDiv = document.createElement('div');
        errorDiv.innerHTML = `❌ Error enviando correo: ${error.message || error.text || 'Error desconocido'}`;
        errorDiv.className = 'fixed top-4 right-4 bg-red-500 text-white px-4 py-2 rounded shadow-lg z-50';
        document.body.appendChild(errorDiv);
        
        setTimeout(() => {
            document.body.removeChild(errorDiv);
        }, 6000);
        
        return { success: false, error };
    }
}

// Función para enviar correo de confirmación al cliente
async function sendClientConfirmation(appointmentData) {
    try {
        console.log('Enviando correo de confirmación al cliente...');
        
        const emailData = {
            to_email: appointmentData.email,
            client_name: appointmentData.nombre,
            service: appointmentData.servicio,
            appointment_date: formatDate(appointmentData.fecha),
            appointment_time: appointmentData.hora,
            notes: appointmentData.notas || '',
            business_email: 'yuridiamakeup@gmail.com',
            business_phone: '+52 123 456 7890' // Agregar el teléfono real del negocio
        };
        
        const response = await window.emailjs.send(
            'service_1eqrmyo', // Tu Service ID
            'template_client_confirmation', // Template ID para confirmación al cliente
            emailData
        );
        
        console.log('✅ Correo de confirmación enviado al cliente:', response);
        return { success: true, response };
        
    } catch (error) {
        console.error('❌ Error enviando correo al cliente:', error);
        return { success: false, error };
    }
}

// Función para enviar notificación de cancelación
async function sendCancelationNotification(appointmentData) {
    if (!window.emailjs) {
        console.error('EmailJS no está disponible');
        return;
    }
    
    const templateParams = {
        to_email: 'yuridiamakeup@gmail.com',
        subject: 'Cita Cancelada - Yuridía Makeup',
        cliente_nombre: appointmentData.nombre,
        cliente_email: appointmentData.email,
        cliente_telefono: appointmentData.telefono,
        fecha: appointmentData.fecha,
        hora: appointmentData.hora,
        servicio: appointmentData.servicio,
        fecha_cancelacion: new Date().toLocaleString('es-ES'),
        message: `La cita ha sido cancelada.
        
Cliente: ${appointmentData.nombre}
Email: ${appointmentData.email}
Teléfono: ${appointmentData.telefono}
Servicio: ${appointmentData.servicio}
Fecha Original: ${appointmentData.fecha}
Hora Original: ${appointmentData.hora}
Cancelada el: ${new Date().toLocaleString('es-ES')}`
    };
    
    try {
        console.log('Enviando notificación de cancelación...', templateParams);
        
        const result = await window.emailjs.send(
            'service_1eqrmyo',
            'template_cancelation',
            templateParams
        );
        
        console.log('Notificación de cancelación enviada:', result);
        
        // Mostrar mensaje de éxito
        const successDiv = document.createElement('div');
        successDiv.innerHTML = '✓ Notificación de cancelación enviada';
        successDiv.className = 'fixed top-4 right-4 bg-yellow-500 text-white px-4 py-2 rounded shadow-lg z-50';
        document.body.appendChild(successDiv);
        
        setTimeout(() => {
            document.body.removeChild(successDiv);
        }, 3000);
        
    } catch (error) {
        console.error('Error enviando notificación de cancelación:', error);
        
        // Mostrar mensaje de error
        const errorDiv = document.createElement('div');
        errorDiv.innerHTML = '⚠ Error enviando notificación de cancelación';
        errorDiv.className = 'fixed top-4 right-4 bg-red-500 text-white px-4 py-2 rounded shadow-lg z-50';
        document.body.appendChild(errorDiv);
        
        setTimeout(() => {
            document.body.removeChild(errorDiv);
        }, 3000);
    }
}
