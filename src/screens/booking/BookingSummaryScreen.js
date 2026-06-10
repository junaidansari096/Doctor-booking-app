import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import DoctorCard from '../../components/DoctorCard';

const BookingSummaryScreen = ({ route, navigation }) => {
  const { doctor, selectedDate, selectedSlot } = route.params;
  const [reason, setReason] = useState('');

  const patientName = 'John Doe';
  const patientMobile = '+91 98765 43210';
  const platformFee = 50;
  const totalFee = doctor.fee + platformFee;

  const handleConfirmAndPay = () => {
    // Generate BK + 6 random digits
    const bookingId = 'BK' + Math.floor(100000 + Math.random() * 900000);
    
    navigation.navigate('BookingConfirmation', {
      doctor,
      selectedDate,
      selectedSlot,
      bookingId,
      patientName,
      reason: reason.trim(),
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingView}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {/* Section 1: Doctor Card */}
          <Text style={styles.sectionTitle}>Doctor Info</Text>
          <DoctorCard doctor={doctor} onPress={() => {}} />

          {/* Section 2: Appointment Details Card */}
          <View style={styles.detailsCard}>
            <Text style={styles.cardTitle}>Appointment Schedule</Text>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>📅 Date</Text>
              <Text style={styles.detailValue}>{selectedDate}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>⏰ Time Slot</Text>
              <Text style={styles.detailValue}>{selectedSlot.time}</Text>
            </View>
          </View>

          {/* Section 3: Patient Details Card */}
          <View style={styles.detailsCard}>
            <Text style={styles.cardTitle}>Patient Details</Text>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Patient Name</Text>
              <Text style={styles.detailValue}>{patientName}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Mobile</Text>
              <Text style={styles.detailValue}>{patientMobile}</Text>
            </View>
            
            <Text style={styles.inputLabel}>Reason for Visit (Optional)</Text>
            <TextInput
              style={styles.textInput}
              placeholder="e.g. General checkup, stomach pain, fever"
              placeholderTextColor="#94a3b8"
              value={reason}
              onChangeText={setReason}
              multiline
              numberOfLines={3}
            />
          </View>

          {/* Section 4: Bill / Fee Breakdown Card */}
          <View style={styles.detailsCard}>
            <Text style={styles.cardTitle}>Payment Details</Text>
            <View style={styles.feeRow}>
              <Text style={styles.feeLabel}>Consultation Fee</Text>
              <Text style={styles.feeValue}>₹{doctor.fee}</Text>
            </View>
            <View style={styles.feeRow}>
              <Text style={styles.feeLabel}>Platform Fee</Text>
              <Text style={styles.feeValue}>₹{platformFee}</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Total Amount</Text>
              <Text style={styles.totalValue}>₹{totalFee}</Text>
            </View>
          </View>
        </ScrollView>

        {/* Footer / Button */}
        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.payButton}
            onPress={handleConfirmAndPay}
            activeOpacity={0.8}
          >
            <Text style={styles.payButtonText}>Confirm & Pay</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 100,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0f172a',
    marginBottom: 8,
  },
  detailsCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#0f172a',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0f172a',
    marginBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
    paddingBottom: 8,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  detailLabel: {
    fontSize: 14,
    color: '#64748b',
    fontWeight: '500',
  },
  detailValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0f172a',
  },
  inputLabel: {
    fontSize: 14,
    color: '#64748b',
    fontWeight: '500',
    marginTop: 12,
    marginBottom: 6,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#cbd5e1',
    borderRadius: 10,
    padding: 10,
    fontSize: 14,
    color: '#0f172a',
    minHeight: 60,
    textAlignVertical: 'top',
    backgroundColor: '#f8fafc',
  },
  feeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  feeLabel: {
    fontSize: 14,
    color: '#64748b',
  },
  feeValue: {
    fontSize: 14,
    fontWeight: '500',
    color: '#0f172a',
  },
  divider: {
    height: 1,
    backgroundColor: '#e2e8f0',
    marginVertical: 10,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalLabel: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0f172a',
  },
  totalValue: {
    fontSize: 18,
    fontWeight: '800',
    color: '#1e3a8a',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#ffffff',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
    elevation: 8,
    shadowColor: '#0f172a',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
  },
  payButton: {
    backgroundColor: '#2c6fad',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  payButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
  },
});

export default BookingSummaryScreen;
