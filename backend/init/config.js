const mongoose = require("mongoose");

// MongoDB connection URL

// Import your Movie model
const Movie = require('../models/movie.models.js'); // Adjust path to your Movie model

// Import your data
const data = require('./data.js'); // This should export an array of movie objects

async function resetAndSeedDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(url);
    console.log('✅ Connected to MongoDB');

    // Delete all existing movies
    console.log('\n🗑️  Deleting existing movies...');
    const deleteResult = await Movie.deleteMany({});
    console.log(`Deleted ${deleteResult.deletedCount} movies`);

    // Insert new movies
    console.log('\n📥 Inserting new movies...');
    const insertResult = await Movie.insertMany(data);
    console.log(`Inserted ${insertResult.length} movies`);

    console.log('\n✅ Database reset and seeded successfully!');
    
    // Display inserted movies
    console.log('\n📋 Inserted Movies:');
    insertResult.forEach((movie, index) => {
      console.log(`${index + 1}. ${movie.title} (${movie.year})`);
    });

  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    // Close the connection
    await mongoose.connection.close();
    console.log('\n🔌 Connection closed');
  }
}

// Run the function
resetAndSeedDatabase();