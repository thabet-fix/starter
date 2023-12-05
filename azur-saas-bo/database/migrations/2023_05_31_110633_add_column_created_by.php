<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('standard_contract', function (Blueprint $table) {
            //
            $table->unsignedBigInteger('createdBy')->nullable();
            $table->foreign('createdBy')->references('id')->on('users');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('standard_contract', function (Blueprint $table) {
            //
            $table->dropColumn(['createdBy']);
        });
    }
};
